type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <div className="container max-w-7xl m-auto px-4">{children}</div>
}

export default BaseLayout
