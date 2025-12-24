import { APICore } from './apiCore'

const api = new APICore()

class MandiService {
  private getCompanyId = () => {
    const user = api.getLoggedInUser()
    return user?.companyid || null
  }

  // Get all farmers
  getFarmers = () => {
    const companyid = this.getCompanyId()
    return api.get('/api/mandi-ledger/farmers', { companyid })
  }

  // Get all customers
  getCustomers = () => {
    const companyid = this.getCompanyId()
    return api.get('/api/mandi-ledger/customers', { companyid })
  }

  // Get all customer bills
  getCustomerBills = () => {
    const companyid = this.getCompanyId()
    return api.get('/api/customerbill/list', { companyid })
  }

  // Get all farmer bills
  getFarmerBills = () => {
    const companyid = this.getCompanyId()
    return api.get('/api/farmerbill', { companyid })
  }

  // Generic get method
  get = (url: string, params?: any) => {
    return api.get(url, params)
  }
}

export default new MandiService()
