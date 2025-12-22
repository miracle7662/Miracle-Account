import React from 'react'
import { Button, Stack } from 'react-bootstrap'

interface InvoiceAsideCreateProps {
  handleCreateInvoice: () => void
}

const InvoiceAsideCreate: React.FC<InvoiceAsideCreateProps> = ({ handleCreateInvoice }) => {
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="px-4 border-bottom"
        style={{ minHeight: '4.5rem' }}
      >
        <Button className="w-100" onClick={handleCreateInvoice}>
          <i className="fi fi-br-plus fs-10"></i>
          <span className="ms-2">Create Invoice</span>
        </Button>
      </Stack>
    </>
  )
}

export default InvoiceAsideCreate
