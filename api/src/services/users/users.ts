import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const signin = async ({email, password}) => {
  const user = await db.user.findUnique({
    where: { email }
  })

  const match = await
}
