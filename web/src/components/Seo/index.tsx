import { Head } from '@redwoodjs/web'
import { getCssString } from '@/styled'

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <style
        id="stitches"
        dangerouslySetInnerHTML={{ __html: getCssString() }}
      />
    </Head>
  )
}

export default Seo

Seo.defaultProps = {
  title: 'My App',
}
