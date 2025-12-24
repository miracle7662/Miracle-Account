// src/utils/masterFetchers.ts
// import axios from 'axios';
// import config from '@/config';
import { toast } from 'react-toastify'
import outletService, { OutletData } from './../common/api/outlet' // adjust path if needed
// import { OutletData } from '@/common/api/outlet'; // make sure this type is exported properly

export interface CountryItem {
  countryid: number
  country_name: string
  country_code: string
  country_capital: string // <- This is required
  status: number
}

export interface StateItem {
  stateid: number
  state_name: string
  status: number | string
}
export interface CityItem {
  cityid: number
  city_name: string
  isCoastal: boolean | number // we convert to boolean later
  stateid: number
  countryid: number
  status: number

}
export interface MarketItem {
  marketid: number
  market_name: string
}

export interface HotelTypeItem {
  id: number
  hotel_type: string
  hoteltypeid: number
  hotelid: string
  marketid: string
}

export interface KitchenCategoryItem {
  kitchencategoryid: number
  Kitchen_Category: string
  status: number | string
}

export interface KitchenMainGroupItem {
  kitchenmaingroupid: number
  Kitchen_main_Group: string
  status: number | string
}
export interface KitchenSubCategoryItem {
  kitchensubcategoryid: number
  Kitchen_sub_category: string
  status: number | string
}

export interface ItemGroupItem {
  item_groupid: number
  itemgroupname: string // Adjust based on your API response structure
  status: number
  code?: string
  kitchencategoryid?: number | null
}

export interface ItemMainGroupItem {
  item_maingroupid: number
  item_group_name: string // Adjust based on your API response structure
  status: number
}

export interface User {
  role_level?: string
  hotelid?: number
}

 export interface Brand {
  hotelid: number
  hotel_name: string
}

 export interface DesignationItem {
  Designation: string
  designationid: number
  status: number
}

export interface UserTypeItem {
  User_type: string
  usertypeid: number
  status: string
}

 export interface TableItem {
  tablemanagementid: number
  table_name: string
  outlet_name: string
  status: number
}

export interface MenuItem {
 menuid: number
 item_no: number
 item_name: string
 print_name : string
 short_name : string
 item_group_id: number | null;
 groupname: string | null;
 price: number
 status: number
}

export interface HotelMasterItem {
  hotelid: number
  hotel_name: string
  marketid?: number
  short_name?: string
  phone?: string
  email?: string
  fssai_no?: string
  trn_gstno?: string
  panno?: string
  website?: string
  address?: string
  stateid?: number
  hoteltypeid?: number
  Masteruserid?: number
  status?: number
  created_by_id?: number
  created_date?: string
  updated_by_id?: number
  updated_date?: string
  market_name?: string
}

export interface TaxGroup {
  taxgroupid: number
  taxgroup_name: string
  status: number
}

export interface ShiftTypeItem {
  id: number
  shift_type: string
}

export interface unitmasterItem {
  unitid: number
  unit_name: string
  status: number
}

export interface WarehouseItem {
  warehouseid: number
  warehouse_name: string
}

export const fetchCountries = async (
  setCountryItems: (data: CountryItem[]) => void,
  setCountryId: (id: number) => void,
  currentCountryId?: number,
) => {
  try {
    // Get token from localStorage
    const storedUser = localStorage.getItem('WINDOW_AUTH_SESSION')
    const token = storedUser ? JSON.parse(storedUser).token : null

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch('http://localhost:3001/api/countries', {
      headers
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: CountryItem[] = await res.json()
    if (Array.isArray(data)) {
      setCountryItems(data)
      if (data.length > 0 && !currentCountryId) {
        setCountryId(data[0].countryid)
      }
    } else {
      setCountryItems([])
      toast.error('Invalid data format received for countries')
    }
  } catch (err) {
    setCountryItems([])
    toast.error('Failed to fetch countries')
    console.error('Fetch countries error:', err)
  }
}

export const fetchStates = async (
  setStates: (data: StateItem[]) => void,
  setstateid: (id: number) => void,
  currentStateId?: number,
) => {
  try {
    // Get token from localStorage
    const storedUser = localStorage.getItem('WINDOW_AUTH_SESSION')
    const token = storedUser ? JSON.parse(storedUser).token : null

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch('http://localhost:3001/api/states', {
      headers
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: StateItem[] = await res.json()
    if (Array.isArray(data)) {
      setStates(data)
      if (data.length > 0 && !currentStateId) {
        setstateid(data[0].stateid)
      }
    } else {
      setStates([])
      toast.error('Invalid data format received for states')
    }
  } catch (err) {
    setStates([])
    toast.error('Failed to fetch states')
    console.error('Fetch states error:', err)
  }
}

export const fetchCities = async (
  stateId: number,
  setCityItems: (data: CityItem[]) => void,
  setCityId: (id: number) => void,
  currentCityId?: number,
) => {
  try {
    const res = await fetch(`http://localhost:3001/api/cities/${stateId}`);
    const data: CityItem[] = await res.json();
    setCityItems(data);

    if (data.length > 0 && !currentCityId) {
      setCityId(data[0].cityid);
    }
  } catch (err) {
    toast.error('Failed to fetch cities');
    console.error('Fetch cities error:', err);
  }
};


export const fetchMarkets = async (
  setMarkets: (data: MarketItem[]) => void,
  setMarketId: (id: number) => void,
  currentMarketId?: number,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/markets')
    const data: MarketItem[] = await res.json()
    setMarkets(data)
    if (data.length > 0 && !currentMarketId) {
      setMarketId(data[0].marketid)
    }
  } catch (err) {
    toast.error('Failed to fetch markets')
    console.error('Fetch markets error:', err)
  }
}

export const fetchHotelType = async (
  setHoteltype: (data: HotelTypeItem[]) => void,
  setHoteltypeid: (id: number) => void,
  currentHoteltypeid?: number,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/hoteltype')
    const data: HotelTypeItem[] = await res.json()
    console.log('Fetched hotel types:', data)
    setHoteltype(data)

    // Set default selection if none already selected
    if (data.length > 0 && !currentHoteltypeid) {
      setHoteltypeid(data[0].id)
    }
  } catch (err) {
    toast.error('Failed to fetch hotel types')
    console.error('Fetch hotel type error:', err)
  }
}

export const fetchKitchenCategory = async (
  setKitchen_Category: (data: KitchenCategoryItem[]) => void,
  setkitchencategoryid: (id: number) => void,
  currentkitchencategoryid?: number,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/KitchenCategory')
    const data: KitchenCategoryItem[] = await res.json()
    setKitchen_Category(data)
    if (data.length > 0 && !currentkitchencategoryid) {
      setkitchencategoryid(data[0].kitchencategoryid)
    }
  } catch (err) {
    toast.error('Failed to fetch kitchen categories')
    console.error('Fetch kitchen categories error:', err)
  }
}

export const fetchKitchenMainGroup = async (
  setKitchen_main_Group: (data: KitchenMainGroupItem[]) => void,
  setkitchenmaingroupid: (id: number) => void,
  currentkitchenmaingroupid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/KitchenMainGroup')
    const data: KitchenMainGroupItem[] = await res.json()
    setKitchen_main_Group(data)
    if (data.length > 0 && !currentkitchenmaingroupid) {
      setkitchenmaingroupid(data[0].kitchenmaingroupid)
    }
  } catch (err) {
    toast.error('Failed to fetch kitchen main groups')
    console.error('Fetch kitchen main groups error:', err)
  }
}

export const fetchKitchenSubCategory = async (
  setKitchen_sub_Category: (data: KitchenSubCategoryItem[]) => void,
  setkitchensubcategoryid: (id: number) => void,
  currentkitchensubcategoryid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/KitchenSubCategory')
    const data: KitchenSubCategoryItem[] = await res.json()
    setKitchen_sub_Category(data)
    if (data.length > 0 && !currentkitchensubcategoryid) {
      setkitchensubcategoryid(data[0].kitchensubcategoryid)
    }
  } catch (err) {
    toast.error('Failed to fetch kitchen sub categories')
    console.error('Fetch kitchen sub categories error:', err)
  }
}

export const fetchItemGroup = async (
  setItemGroup: (data: ItemGroupItem[]) => void,
  setitemgroupid: (id: number) => void,
  currentitemgroupid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/ItemGroup')
    const data: ItemGroupItem[] = await res.json()
    setItemGroup(data)
    if (data.length > 0 && !currentitemgroupid) {
      setitemgroupid(data[0].item_groupid)
    }
  } catch (err) {
    toast.error('Failed to fetch item groups')
    console.error('Fetch item groups error:', err)
    setItemGroup([])
  }
}

export const fetchItemMainGroup = async (
  setItemMainGroup: (data: ItemMainGroupItem[]) => void,
  setitemmaingroupid: (id: number) => void,
  currentitemmaingroupid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/ItemMainGroup')
    const data: ItemMainGroupItem[] = await res.json()
    setItemMainGroup(data)
    if (data.length > 0 && !currentitemmaingroupid) {
      setitemmaingroupid(data[0].item_maingroupid)
    }
  } catch (err) {
    toast.error('Failed to fetch item main groups')
    console.error('Fetch item main groups error:', err)
    setItemMainGroup([])
  }
}

export const fetchItemGroupsWithMenuItems = async (
  setItemGroup: (data: ItemGroupItem[]) => void,
  setitemgroupid: (id: number) => void,
  currentitemgroupid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/itemgroup/withmenuitems')
    const data: ItemGroupItem[] = await res.json()
    setItemGroup(data)
    if (data.length > 0 && !currentitemgroupid) {
      setitemgroupid(data[0].item_groupid)
    }
  } catch (err) {
    toast.error('Failed to fetch item groups with menu items')
    console.error('Fetch item groups with menu items error:', err)
    setItemGroup([])
  }
}

export const fetchDesignation = async (
  setDesignation: (data: DesignationItem[]) => void,
  setdesignationid: (id: number) => void,
  currentdesignationid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/Designation')
    const data: DesignationItem[] = await res.json()
    setDesignation(data)
    if (data.length > 0 && !currentdesignationid) {
      setdesignationid(data[0].designationid)
    }
  } catch (err) {
    toast.error('Failed to fetch designations')
    console.error('Fetch designations error:', err)
    setDesignation([])
  }
}

export const fetchUserType = async (
  setUserType: (data: UserTypeItem[]) => void,
  setusertypeid: (id: number) => void,
  currentusertypeid?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/UserType')
    const data: UserTypeItem[] = await res.json()
    setUserType(data)
    if (data.length > 0 && !currentusertypeid) {
      setusertypeid(data[0].usertypeid)
    }
  } catch (err) {
    toast.error('Failed to fetch user types')
    console.error('Fetch user types error:', err)
    setUserType([])
  }
}


export const fetchMenu = async (
  setMenuCategory: (data: MenuItem[]) => void,
  setmenuid: (id: number) => void,
  currentmenucategoryid?: string
) => {
  try {
    const res = await fetch('http://localhost:3001/api/menu');
    const rawData = await res.json();
    const data: MenuItem[] = rawData.map((item: any) => ({
      menuid: item.restitemid || item.menuid, // Handle both cases
      item_no: String(item.item_no),
      item_name: item.item_name,
      print_name: item.print_name || item.item_name,
      short_name: item.short_name || '',
      item_group_id: item.item_group_id ?? null,
      price: item.price || 0,
      status: item.status,
    }));
    setMenuCategory(data);
    if (data.length > 0 && !currentmenucategoryid) {
      setmenuid(data[0].menuid);
    }
  } catch (err) {
    toast.error('Failed to fetch menu categories');
    console.error('Fetch menu categories error:', err);
    setMenuCategory([]);
  }
};

export const fetchTableManagement = async (
  setTableManagement: (data: TableItem[]) => void,    
  settablemanagementid: (id: number) => void,    
  currenttablemanagementid?: string,                
  ) => {

    try {
      const res = await fetch('http://localhost:3001/api/tablemanagement');
      const data: TableItem[] = await res.json();
      setTableManagement(data);
      if(data.length > 0 && !currenttablemanagementid){
        settablemanagementid(data[0].tablemanagementid);
      }
    } catch (err) {
      toast.error('Failed to fetch table management');
      console.error('Fetch table management error:', err);
      setTableManagement([]);
    }
  }

export const fetchData = async (
  setTaxGroup: (data: any[]) => void,    
  settaxgroupid: (id: number) => void,
  currenttaxgroupid?: string
) => {
  try {
    const res = await fetch('http://localhost:3001/api/taxgroup');
    const result = await res.json();

    // ✅ Extract the nested taxGroups array safely
    const taxGroups = result?.data?.taxGroups || [];

    setTaxGroup(taxGroups);

    if (taxGroups.length > 0 && !currenttaxgroupid) {
      settaxgroupid(taxGroups[0].taxgroupid);
    }
  } catch (err) {
    toast.error('Failed to fetch tax groups');
    console.error('Fetch tax groups error:', err);
    setTaxGroup([]);
  }
};
export const fetchunitmaster = async (
  setStockUnits: (data: unitmasterItem[]) => void,
  setStockUnit: (id: number) => void,
  currentStockUnit?: string,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/unitmaster');
    const data = await res.json();
    setStockUnits(data);

    // Set first item if nothing is selected
    if (data.length > 0 && !currentStockUnit) {
      setStockUnit(data[0].unit_name);
    }
  } catch (err) {
    toast.error('Failed to fetch stock units');
    console.error('Fetch stock units error:', err);
    setStockUnits([]);
  }
};

// Fetch brands (adapted from fetchHotelData)
export const fetchBrands = async (
  user: User,
  setBrands: (brands: Brand[]) => void,
): Promise<void> => {
  try {
    console.log('Fetching brands for user:', user)
    const params: { role_level?: string; hotelid?: number } = {}

    if (user?.role_level) {
      params.role_level = user.role_level
    }
    if (user?.role_level === 'hotel_admin' && user?.hotelid) {
      params.hotelid = user.hotelid
    }

    const response = await outletService.getBrands(params)
    console.log('Brands response:', response)

    if (response?.data && Array.isArray(response.data)) {
      setBrands(response.data)
    } else if (Array.isArray(response)) {
      setBrands(response)
    } else {
      console.error('Invalid brands response format:', response)
      toast.error('Invalid response from server')
    }
  } catch (error) {
    console.error('Error fetching brands:', error)
    toast.error('Failed to fetch brands. Please check if the backend server is running.')
  }
}

export const fetchOutlets = async (
  user: any,
  setOutlets: (data: OutletData[]) => void,
  setLoading: (value: boolean) => void,
) => {
  try {
    setLoading(true)
    console.log('Fetching outlets...')

    const params: any = {
      role_level: user?.role_level,
      hotelid: user?.hotelid,
      brand_id: user?.brand_id,
    }

    // For outlet_user, send all outlet IDs as comma-separated string
    if (user?.role_level === 'outlet_user' && Array.isArray(user?.outletids)) {
      params.outletid = user.outletids.join(',')
    } else if (user?.outletid) {
      params.outletid = user.outletid
    }

    if (user?.role_level === 'hotel_admin' && user?.userid != null) {
      params.created_by_id = user.userid
    }

    console.log('Fetching outlets with params:', params)
    console.log('Current user details:', {
      userid: user?.userid,
      role_level: user?.role_level,
      brand_id: user?.brand_id,
      hotelid: user?.hotelid,
      outletid: params.outletid, // Log outletid

    })

    const response = await outletService.getOutlets(params)
    console.log('Outlet response:', response)

    if (response && response.data) {
      const sortedOutlets = response.data.sort((a: OutletData, b: OutletData) => {
        return new Date(a.registered_at || '').getTime() - new Date(b.registered_at || '').getTime()
      })
      setOutlets(sortedOutlets)
    } else {
      console.error('Invalid response format:', response)
      toast.error('Invalid response from server')
    }
  } catch (error) {
    console.error('Error fetching outlets:', error)
    toast.error('Failed to fetch outlets. Please check if the backend server is running.')
  } finally {
    setLoading(false)
  }
}

// export const fetchAllOutletsForHotelUser = async (
//   user: any,
//   setOutlets: (data: OutletData[]) => void,
//   setLoading: (value: boolean) => void,
// ) => {
//   try {
//     setLoading(true)
//     console.log('Fetching all outlets for hotel user...')

//     const params: any = {
//       role_level: user?.role_level === 'outlet_user' ? 'outlet_user' : 'hotel_admin', // Use role accordingly
//       hotelid: user?.hotelid,
//     }

//     console.log('Fetching outlets with params:', params)
//     console.log('Current user details:', {
//       userid: user?.userid,
//       role_level: user?.role_level,
//       hotelid: user?.hotelid,
//     })

//     const response = await outletService.getOutlets(params)
//     console.log('Outlet response:', response)

//     if (response && response.data) {
//       const sortedOutlets = response.data.sort((a: OutletData, b: OutletData) => {
//         return new Date(a.registered_at || '').getTime() - new Date(b.registered_at || '').getTime()
//       })
//       setOutlets(sortedOutlets)
//     } else {
//       console.error('Invalid response format:', response)
//       toast.error('Invalid response from server')
//     }
//   } catch (error) {
//     console.error('Error fetching all outlets for hotel user:', error)
//     toast.error('Failed to fetch outlets. Please check if the backend server is running.')
//   } finally {
//     setLoading(false)
//   }
// }

export const fetchOutletsForDropdown = async (
  user: any,
  setOutlets: (data: OutletData[]) => void,
  setLoading: (value: boolean) => void,
) => {
  try {
    setLoading(true);
    console.log('Fetching outlets for dropdown...');

    const params = {
      role_level: user?.role_level || 'outlet_user', // Match working URL
      hotelid: user?.hotelid, // e.g., 19 for Shubharambh Hotel
      userid: user?.id, // e.g., 70 for miracle456
      brandId: user?.brand_id || null,
    };

    console.log('Fetching dropdown outlets with params:', params);
    console.log('Current user details:', {
      userid: user?.id,
      role_level: user?.role_level,
      brand_id: user?.brand_id,
      hotelid: user?.hotelid,
    });

    const response = await outletService.getOutletsForDropdown(params);
    console.log('Dropdown outlet response:', response);

    if (response && response.data) {
      const sortedOutlets = response.data.sort((a: OutletData, b: OutletData) => {
        return a.outlet_name.localeCompare(b.outlet_name);
      });
      setOutlets(sortedOutlets);
      console.log('Sorted outlets set:', sortedOutlets);
    } else {
      console.error('Invalid response format:', response);
      toast.error('No outlets found or invalid response from server');
      setOutlets([]);
    }
  } catch (error: any) {
    console.error('Error fetching dropdown outlets:', error);
    if (error.response?.status === 404) {
      toast.error('Outlets endpoint not found. Please check backend route configuration.');
    } else if (error.response?.status === 400) {
      toast.error('User ID is required or invalid. Please check user authentication.');
    } else {
      toast.error('Failed to fetch outlets for dropdown. Error: ' + (error.message || 'Unknown error'));
    }
    setOutlets([]);
  } finally {
    setLoading(false);
  }
};

export const fetchShiftTypes = async (
  setShiftTypes: (data: ShiftTypeItem[]) => void,
  setSelectedShift: (shiftType: string) => void,
  currentShiftId?: number,
) => {
  try {
    const res = await fetch('http://localhost:3001/api/orders/shift-types');
    const data: ShiftTypeItem[] = await res.json();
    setShiftTypes(data);
    // The original function was setting the ID, but the state seems to hold the string value.
    // Let's set the shift_type string instead.
    if (data.length > 0 && !currentShiftId) {
      setSelectedShift(data[0].shift_type);
    }
  } catch (err) {
    toast.error('Failed to fetch shift types');
    console.error('Fetch shift types error:', err);
    setShiftTypes([]);
  }
};

export const fetchWarehouses = async (
  setWarehouses: (data: WarehouseItem[]) => void,
  setLoading: (loading: boolean) => void,
) => {
  try {
    setLoading(true)
    const res = await fetch('http://localhost:3001/api/warehouse')
    const data: WarehouseItem[] = await res.json()
    setWarehouses(data)
  } catch (err) {
    toast.error('Failed to fetch warehouses')
    console.error('Fetch warehouses error:', err)
  } finally {
    setLoading(false)
  }
}

// export const fetchhotelmasters = async (
//   setHotels: (data: HotelMasterItem[]) => void,
//   user?: User,
//   setLoading?: (value: boolean) => void,
// ): Promise<void> => {
//   try {
//     if (setLoading) setLoading(true);
    
//     const params: { role_level?: string; hotelid?: number } = {};
    
//     if (user?.role_level) {
//       params.role_level = user.role_level;
//     }
    
//     if (user?.role_level === 'hotel_admin' && user?.hotelid) {
//       params.hotelid = user.hotelid;
//     }

//     const url = new URL('http://localhost:3001/api/HotelMasters');
//     Object.keys(params).forEach(key => {
//       if (params[key as keyof typeof params] !== undefined) {
//         url.searchParams.append(key, params[key as keyof typeof params]!.toString());
//       }
//     });

//     const res = await fetch(url.toString());
//     const data: HotelMasterItem[] = await res.json();
    
//     // Filter to only include active hotels and extract just the needed fields
//     const activeHotels = data
//       .filter(hotel => hotel.status === 1)
//       .map(hotel => ({
//         hotelid: hotel.hotelid,
//         hotel_name: hotel.hotel_name,
//         marketid: hotel.marketid,
//         short_name: hotel.short_name,
//         status: hotel.status
//       }));
    
//     setHotels(activeHotels);
//   } catch (err) {
//     toast.error('Failed to fetch hotels');
//     console.error('Fetch hotels error:', err);
//     setHotels([]);
//   } finally {
//     if (setLoading) setLoading(false);
//   }
// };

// export const fetchOutletuserById = async (
//   id: number,
//   user: { role_level: string; hotelid: number; brand_id: number; userid: number },
//    setOutlets: (data: OutletData[]) => void,
//   setLoading: (value: boolean) => void,
// ) => {
//   try {
//     console.log('Fetching outlet by id:', id, 'with user:', user);
//     const queryParams = {
//       role_level: user?.role_level || '',
//       hotelid: user?.hotelid?.toString() || '',
//       created_by_id: user?.userid?.toString() || '',
//     };
//     console.log('Query params:', queryParams);
//     const response = await outletService.getOutletById(id, );
//     console.log('Outlet response:', response.data);
//     const outlets = Array.isArray(response.data) ? response.data : [response.data];
//     setOutlets(outlets);
//   } catch (error) {
//     console.error('Error fetching outlets by id:', {
//       id,
//       user,
//     });
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };
