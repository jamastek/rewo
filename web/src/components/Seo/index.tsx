import { Head } from '@redwoodjs/web'
import { getCssText } from '@/styled'

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    </Head>
  )
}

export default Seo

Seo.defaultProps = {
  title: 'My App',
}
