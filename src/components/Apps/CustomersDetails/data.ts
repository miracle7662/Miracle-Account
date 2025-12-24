// data.ts
export interface Customer {
  srNo: number;
  name: string;
  countryCode: string;
  mobile: string;
  mail: string; // Consider renaming to `email` for clarity
  city: string;
  address1: string;
  address2: string;
  state?: string;
  pincode?: string;
  gstNo?: string;
  fssai?: string;
  panNo?: string;
  aadharNo?: string;
  birthday?: string;
  anniversary?: string;
  createWallet?: boolean;
}

// Initial customer data for testing
export const initialCustomers: Customer[] = [
  {
    srNo: 1,
    name: 'John Doe',
    countryCode: '+91',
    mobile: '9876543210',
    mail: 'john.doe@example.com',
    city: 'Mumbai',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    state: 'Maharashtra',
    pincode: '400001',
    gstNo: '27AAAAA0000A1Z5',
    fssai: '12345678901234',
    panNo: 'ABCDE1234F',
    aadharNo: '123456789012',
    birthday: '1990-01-15',
    anniversary: '2015-06-20',
    createWallet: true,
  },
  {
    srNo: 2,
    name: 'Jane Smith',
    countryCode: '+1',
    mobile: '5551234567',
    mail: 'jane.smith@example.com',
    city: 'New York',
    address1: '456 Park Avenue',
    address2: '',
    state: 'New York',
    pincode: '10001',
    gstNo: '',
    fssai: '',
    panNo: 'XYZAB5678C',
    aadharNo: '',
    birthday: '1985-03-22',
    anniversary: '',
    createWallet: false,
  },
];

// Initial form state for new customer
export const initialNewCustomer: Customer = {
  srNo: 0,
  name: '',
  countryCode: '+91',
  mobile: '',
  mail: '',
  city: '',
  address1: '',
  address2: '',
  state: '',
  pincode: '',
  gstNo: '',
  fssai: '',
  panNo: '',
  aadharNo: '',
  birthday: '',
  anniversary: '',
  createWallet: false,
};

// Country code options for the form
export const countryCodes = [
  { value: '+91', label: 'India +91' },
  { value: '+1', label: 'USA +1' },
  { value: '+44', label: 'UK +44' },
];