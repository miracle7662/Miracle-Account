import { APICore } from './apiCore'

const api = new APICore()

// Interfaces for master data
export interface Country {
  countryid: number
  country_name: string
  country_code: string
  country_capital: string
  status: number
}

export interface Timezone {
  timezone_id: number
  timezone_name: string
  timezone_offset: string
  description: string
}

export interface TimeOption {
  time_id: number
  time_value: string
  time_label: string
}

export interface Company {
  companyid: number
  company_name: string
  company_title: string
  company_address: string
  status: number
}

export interface Year {
  yearid: number
  Year: string
  Startdate: string
  Enddate: string
  status: number
}

class MasterDataService {
  // Get all countries
  getCountries = () => {
    return api.get('/api/countries', {})
  }

  // Get timezones (optionally filtered by country)
  getTimezones = (country_code?: string) => {
    const params = country_code ? { country_code } : {};
    return api.get('/api/timezones', params)
  }

  // Get start times
  getStartTimes = () => {
    return api.get('/api/times/start-times', {})
  }

  // Get close times
  getCloseTimes = () => {
    return api.get('/api/times/close-times', {})
  }

  // Get all companies
  getCompanies = () => {
    return api.get('/api/companymaster', {})
  }

  // Get all years
  getYears = () => {
    return api.get('/api/yearmaster', {})
  }
}

export default new MasterDataService()
