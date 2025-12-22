import { APICore } from './apiCore'

const api = new APICore()

// Interface for outlet user data
export interface OutletUserData {
  userid?: number
  username: string
  email: string
  password?: string
  full_name: string
  phone?: string
  role_level: string
  outletid?: number; // Changed to outletid
  Designation?: string
  designationid?: number
  user_type?: string
  usertypeid?: number
  shift_time?: string
  mac_address?: string
  assign_warehouse?: string
  language_preference?: string
  address?: string
  city?: string
  sub_locality?: string
  web_access?: boolean
  self_order?: boolean
  captain_app?: boolean
  kds_app?: boolean
  captain_old_kot_access?: string
  verify_mac_ip?: boolean
  brand_id?: number
  hotelid?: number
  parent_user_id?: number
  status?: number
  created_by_id?: number
  created_date?: string
  updated_by_id?: number
  updated_date?: string
  brand_name?: string
  hotel_name?: string
  outlet_name?: string
}

// Interface for hotel admin data
export interface HotelAdminData {
  userid?: number
  username?: string
  email?: string
  full_name: string
  phone?: string
  role_level?: string
  brand_id?: number
  hotel_id?: number
  brand_name?: string
  hotel_name?: string
  status?: number
  created_date?: string
  last_login?: string
}

// Interface for dropdown options
export interface DropdownOption {
  id: number
  name: string
}

class OutletUserService {
  // Get outlet users (filtered by role)
  getOutletUsers = (params?: { 
    currentUserId?: number; 
    roleLevel?: string; 
    brandId?: number; 
    hotelId?: number; 
    outletid?: number;
    created_by_id?: number;
    
  }) => {
    return api.get('/api/outlet-users', params || {})
  }

  // Get hotel admins specifically
  getHotelAdmins = (params?: { 
    currentUserId?: number; 
    roleLevel?: string; 
    brandId?: number; 
    hotelid?: number 
    
  }) => {
    return api.get('/api/outlet-users/hotel-admins', params || {})
  }

  // Get outlets for dropdown (filtered by role)
  getOutletsForDropdown = (params?: { 
    roleLevel?: string; 
    brandId?: number; 
    hotelid?: number 
  }) => {
    return api.get('/api/outlet-users/outlets', params || {})
  }

  // Get designations for dropdown
  getDesignations = () => {
    return api.get('/api/outlet-users/designations', {})
  }

  // Get user types for dropdown
  getUserTypes = () => {
    return api.get('/api/outlet-users/user-types', {})
  }

  // Get outlet user by ID
  getOutletUserById = (id: number) => {
    return api.get(`/api/outlet-users/${id}`, {})
  }

  // Get hotel admin by ID
  getHotelAdminById = (id: number) => {
    return api.get(`/api/outlet-users/hotel-admin/${id}`, {})
  }

  // Create new outlet user
  createOutletUser = (data: OutletUserData) => {
    return api.create('/api/outlet-users', data)
  }

  // Update outlet user
  updateOutletUser = (id: number, data: OutletUserData) => {
    return api.update(`/api/outlet-users/${id}`, data)
  }

  // Update hotel admin
  updateHotelAdmin = (id: number, data: HotelAdminData) => {
    return api.update(`/api/outlet-users/hotel-admin/${id}`, data)
  }

  // Delete outlet user (soft delete)
  deleteOutletUser = (id: number, data: { updated_by_id: number }) => {
    return api.update(`/api/outlet-users/${id}`, { is_active: 0, ...data })
  }
}

export default new OutletUserService() 