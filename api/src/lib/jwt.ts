import { AuthenticationError } from '@redwoodjs/graphql-server'
import jwt from 'jsonwebtoken'
import { db } from 'src/lib/db'

const parseCookiesHeader = (cookies) =>
  cookies
    .get('cookie')
    .split('; ')
    .reduce((acc, i) => {
      const [k, v] = i.split('=')
      acc[k] = v
      return acc
    }, {})

export const verifyToken = (token) => {
  try {
    // Returns if the token is both valid and not expired
    const data = jwt.verify(token, process.env.TOKEN_SIGN_KEY)
    return { valid: true, expired: false, data }
  } catch (err) {
    // Returns if the token is valid but expired
    if (err && err.name === 'TokenExpiredError')
      return {
        valid: true,
        expired: true,
        data: jwt.decode(token, process.env.TOKEN_SIGN_KEY),
      }

    // Returns if the token is not valid
    return { valid: false, expired: false, data: {} }
  }
}

export const generateJWTTokens = ({ id, email, username }) => {
  // Generate Refresh Token
  const refreshToken = jwt.sign(
    { id, email, username },
    process.env.TOKEN_SIGN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    }
  )

  // Generate Access Token
  const accessToken = jwt.sign(
    { id, email, username },
    process.env.TOKEN_SIGN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    }
  )

  context.responseHeaders.set('set-cookie', [
    `refreshToken=${refreshToken}; Path=/; HttpOnly;`, //Refresh token is set as HttpOnly so it cant be hijacked with scripting
    `accessToken=${accessToken}; Path=/;`,
  ])

  return refreshToken
}

export const verifyJWTAuth = async () => {
  const { valid: accessTokenIsValid, expired: accessTokenIsExpired } =
    verifyToken(context.currentUser.token)

  // Throws if accessToken isnt valid
  if (!accessTokenIsValid)
    throw new AuthenticationError('Invalid Token Provided.')

  // Tries to refresh accessToekn if its expired
  if (accessTokenIsExpired) {
    const { refreshToken } = parseCookiesHeader(context.requestHeaders)

    // Throws if no refreshToken is present
    if (!refreshToken) throw new AuthenticationError('Invalid Token Provided.')

    const { valid: refreshTokenIsValid, expired: refreshTokenIsExpired } =
      verifyToken(refreshToken)

    // Throws if refreshToken is either invalid or expired
    if (!refreshTokenIsValid || refreshTokenIsExpired)
      throw new AuthenticationError('Invalid Token Provided.')

    // Gets user to fetch stored refreshToken
    const user = await db.user.findOne({
      where: { id: context.currentUser.id },
    })

    // Throws if refreshToken from db and the one from the headers dont match
    if (user.refreshToken !== refreshToken)
      throw new AuthenticationError('Invalid Token Provided.')

    // Generates new pair of accessToken and refreshToken and saves the new refreshToken on the db
    const newRefreshToken = generateJWTTokens(user)
    await db.user.update({
      data: { refreshToken: newRefreshToken },
      where: { id: user.id },
    })
  }
}
