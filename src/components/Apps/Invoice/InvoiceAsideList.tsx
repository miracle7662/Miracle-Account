import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ListGroup, Stack } from 'react-bootstrap'
import { InvoiceItem } from '@/components/Apps/Invoice/data/types'
import Loading from '@/components/Misc/Loading'

interface InvoiceAsideListProps {
  invoiceItems: InvoiceItem[]
  selectedInvoice: InvoiceItem | null | string
  setSelectedInvoice: React.Dispatch<React.SetStateAction<InvoiceItem | null>>
  setShowInvoiceCreate: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  searchQuery: string
  onDeleteInvoice: (invoiceId: string) => void
  setContainerToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const InvoiceAsideList: React.FC<InvoiceAsideListProps> = ({
  invoiceItems,
  selectedInvoice,
  setSelectedInvoice,
  setShowInvoiceCreate,
  setLoading,
  searchQuery,
  setContainerToggle,
}) => {
  const handleInvoiceItemClick = (index: number) => {
    setSelectedInvoice(invoiceItems[index])
    setContainerToggle(true)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowInvoiceCreate(false)
    }, 1000)
  }

  const filteredInvoiceItems = invoiceItems.filter(
    ({ invnumber, date }) =>
      invnumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      date.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <PerfectScrollbar className="h-100 d-flex flex-column">
      <ListGroup variant="flush" className="flex-grow-1">
        {filteredInvoiceItems.length === 0 ? (
          <ListGroup.Item className="py-4 text-center flex-grow-1">No items found</ListGroup.Item>
        ) : (
          filteredInvoiceItems.map(({ id, invnumber, date, amount, status }, idx) => (
            <ListGroup.Item
              className={`py-4 ${
                selectedInvoice === invoiceItems[idx] ? 'bg-secondary-subtle' : ''
              }`}
              key={id}
              onClick={() => handleInvoiceItemClick(idx)}
              style={{ cursor: 'pointer' }}
            >
              <Stack gap={3} direction="horizontal">
                <Stack gap={3} direction="horizontal">
                  <div
                    className={`btn btn-lg btn-icon btn-neutral rounded-pill gap-3 ${
                      selectedInvoice === id ? 'bg-dark-subtle' : ''
                    }`}
                  >
                    <i className="fi fi-rr-file-invoice-dollar"></i>
                  </div>
                  <div>
                    <div className="fs-13 fw-semibold mb-1">{invnumber}</div>
                    <span className="fs-12 fw-normal text-muted">{date}</span>
                  </div>
                </Stack>
                <div className="ms-auto text-end">
                  <div className="fw-semibold mb-1">{amount}</div>
                  <span dangerouslySetInnerHTML={{ __html: status }} />
                </div>
              </Stack>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <div className="m-4">
        <Loading className="w-100" />
      </div>
    </PerfectScrollbar>
  )
}

export default InvoiceAsideList
