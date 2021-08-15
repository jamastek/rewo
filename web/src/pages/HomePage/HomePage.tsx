import { styled } from '@/styled'

const Header = styled('h1', {
  fontSize: 42,
})

const GetStarted = styled('a', {
  background: '$tomato10',
  padding: '10px 20px',
  color: 'white',
  transition: '.3s ease all',
  '&:hover': {
    background: '$tomato11',
  },
})

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Header className="font-black">Hello world!</Header>
        <GetStarted
          href="https://github.com/jamastek/rewo"
          className="mt-2 inline-block"
        >
          Get Started
        </GetStarted>
      </div>
    </div>
  )
}

export default HomePage
