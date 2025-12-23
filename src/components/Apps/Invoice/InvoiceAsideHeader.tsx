import { Stack } from 'react-bootstrap'

const InvoiceAsideHeader = () => {
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="px-4 border-bottom"
        style={{ minHeight: '4.5rem' }}
      >
        <h4 className="fw-bold mb-0">Invoice</h4>
      </Stack>
    </>
  )
}

export default InvoiceAsideHeader
