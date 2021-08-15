import { Link, routes } from '@redwoodjs/router'
import { styled } from '@/styled'

const Button = styled('button', {
  background: 'red',
})

const HomePage = () => {
  return (
    <>
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      <Button>test</Button>
    </>
  )
}

export default HomePage
