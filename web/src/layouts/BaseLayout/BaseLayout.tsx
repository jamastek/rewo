import Seo from '@/components/Seo'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <Seo />
      {children}
    </div>
  )
}

export default BaseLayout
