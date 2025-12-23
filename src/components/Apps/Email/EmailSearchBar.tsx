import React from 'react'
import { Stack, Form } from 'react-bootstrap'

const EmailSearchBar: React.FC<{
  searchTerm: string
  handleSearch: (value: string) => void
}> = ({ searchTerm, handleSearch }) => {
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="px-4 border-bottom"
        style={{ minHeight: '4.5rem' }}
      >
        <Form className="w-100">
          <Form.Control
            type="text"
            className="rounded-pill"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
          />
        </Form>
      </Stack>
    </>
  )
}

export default EmailSearchBar
