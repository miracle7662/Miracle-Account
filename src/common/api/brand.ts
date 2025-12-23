import { APICore } from './apiCore'

const api = new APICore()

// interface for brand data
export interface BrandData {
  hotelid: string
  hotel_name: string
  marketid: string
  short_name: string
  phone: string
  email: string
  fssai_no: string
  trn_gstno: string
  panno: string
  website: string
  address: string
  stateid: string
  hoteltypeid: string
  Masteruserid: string
  status: string
  created_by_id: string
  created_date: string
  updated_by_id: string
  updated_date: string
  market_name: string
}

class BrandService {
  // Get all brands
  getBrands(params?: { role_level?: string; hotelid?: string }) {
    const queryParams: any = {}
    if (params?.role_level) {
      queryParams.role_level = params.role_level
    }
    if (params?.hotelid) {
      queryParams.hotelid = params.hotelid
    }
    
    return api.get('/api/HotelMasters', queryParams)
  }

  // Get brand by ID
  getBrandById(id: string) {
    return api.get(`/api/HotelMasters/${id}`, {})
  }

  // Add new brand
  addBrand(brandData: Partial<BrandData>) {
    return api.create('/api/HotelMasters', brandData)
  }

  // Update brand
  updateBrand(id: string, brandData: Partial<BrandData>) {
    return api.update(`/api/HotelMasters/${id}`, brandData)
  }

  // Delete brand
  deleteBrand(id: string) {
    return api.delete(`/api/HotelMasters/${id}`)
  }
}

export default new BrandService() 