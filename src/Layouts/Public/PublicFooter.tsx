import Copyright from '@/components/Misc/Copyright'
import { Container, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PublicFooter = () => {
  return (
    <footer
      className="footer-public bg-body-tertiary hstack border-top"
      style={{ minHeight: '4rem' }}>
      <Container className="d-flex align-items-center">
        <Copyright />
        <Stack
          direction="horizontal"
          gap={3}
          className="ms-auto d-none d-sm-flex"
          style={{ lineHeight: 'normal' }}>
          <Link to="../docs/index.html">Docs</Link>
          <Link to="../docs/changelog.html">Changelog</Link>
          <Link to="../docs/support.html">Support</Link>
        </Stack>
      </Container>
    </footer>
  )
}

export default PublicFooter
