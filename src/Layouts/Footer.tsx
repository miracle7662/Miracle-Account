import Copyright from '@/components/Misc/Copyright'
import { Stack } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="footer-content">
      <Stack direction="horizontal" gap={4} className="footer-inner">
        <Copyright />
        <Stack
          direction="horizontal"
          gap={3}
          className="ms-auto d-none d-sm-flex"
          style={{ lineHeight: 'normal' }}>
          {/* <Link to="../docs/index.html">Documentation</Link>
          <Link to="../docs/changelog.html">Changelog</Link>
          <Link to="../docs/support.html">Support</Link> */}
        </Stack>
      </Stack>
    </footer>
  )
}

export default Footer
