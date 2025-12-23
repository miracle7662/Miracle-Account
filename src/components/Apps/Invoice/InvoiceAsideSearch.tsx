import { useState } from 'react'
import { Form, Stack } from 'react-bootstrap'

interface InvoiceAsideSearchProps {
  onSearch: (query: string) => void
}

const InvoiceAsideSearch: React.FC<InvoiceAsideSearchProps> = ({ onSearch }) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQueryLocal(query)
    onSearch(query)
  }

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
            value={searchQueryLocal}
            onChange={handleSearch}
          />
        </Form>
      </Stack>
    </>
  )
}

export default InvoiceAsideSearch
