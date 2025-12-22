import { v4 as uuidv4 } from 'uuid'
import { InvoiceItem } from './types'

const InvoiceItems: InvoiceItem[] = [
  {
    id: uuidv4(),
    date: '24 FEB 2024',
    invnumber: '#INV-987456',
    amount: '$249.99',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '25 FEB 2024',
    invnumber: '#INV-789654',
    amount: '$299.49',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '26 FEB 2024',
    invnumber: '#INV-258963',
    amount: '$165.00',
    status: `<span class="badge bg-warning-subtle text-warning">Unpaid</span>`,
  },
  {
    id: uuidv4(),
    date: '27 FEB 2024',
    invnumber: '#INV-654789',
    amount: '$225.49',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '28 FEB 2024',
    invnumber: '#INV-3578951',
    amount: '$320.49',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '29 FEB 2024',
    invnumber: '#INV-9547856',
    amount: '$255.99',
    status: `<span class="badge bg-danger-subtle text-danger">Cancel</span>`,
  },
  {
    id: uuidv4(),
    date: '01 MAR 2024',
    invnumber: '#INV-654785',
    amount: '$249.99',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '02 MAR 2024',
    invnumber: '#INV-357965',
    amount: '$299.49',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
  {
    id: uuidv4(),
    date: '03 MAR 2024',
    invnumber: '#INV-448569',
    amount: '$165.00',
    status: `<span class="badge bg-warning-subtle text-warning">Unpaid</span>`,
  },
  {
    id: uuidv4(),
    date: '04 MAR 2024',
    invnumber: '#INV-624587',
    amount: '$225.49',
    status: `<span class="badge bg-success-subtle text-success">Paid</span>`,
  },
]
export default InvoiceItems
