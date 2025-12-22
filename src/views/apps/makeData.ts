

// makeData.ts
export interface Person {
  userId: string;
  itemId: string;
  ItemName: string;
  printName: string;
  aliasName: string;
  kitchenCategory: string;
  kitchenSubCategory: string;
  kitchenMainGroup: string;
  itemMainGroup: string;
  itemGroup: string;
  stockUnit: string;
  tax: number;
  runtimeRates: boolean;
  isCommonToAllDepartments: boolean;
  departmentRates: { departmentName: string; rate: number }[];
  lastName: string;
  price: number;
  visits: number;
  status: string;
  progress: number;
  outlet: string; // Added
  hotelName: string; // Added
  subRows?: Person[];
}

// Ensure makeData function includes these fields
export function makeData(...args: number[]): Person[] {
  // Your existing makeData implementation
  // Make sure to include outlet and hotelName in the generated data
  return Array.from({ length: args[0] }, () => ({
    userId: `user-${Math.random()}`,
    itemId: `item-${Math.random()}`,
    ItemName: `Item ${Math.random()}`,
    printName: '',
    aliasName: '',
    kitchenCategory: '',
    kitchenSubCategory: '',
    kitchenMainGroup: '',
    itemMainGroup: '',
    itemGroup: '',
    stockUnit: '',
    tax: 0,
    runtimeRates: false,
    isCommonToAllDepartments: false,
    departmentRates: [],
    lastName: `Last ${Math.random()}`,
    price: Math.floor(Math.random() * 100),
    visits: Math.floor(Math.random() * 100),
    status: '✅ Available',
    progress: Math.floor(Math.random() * 100),
    outlet: '', // Add default value
    hotelName: '', // Add default value
    subRows: args[1] ? makeData(args[1], ...args.slice(2)) : [],
  }));
}