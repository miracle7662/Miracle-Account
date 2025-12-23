// context/KotContext.tsx
import { createContext, useContext, useState } from 'react';

interface KotSettings {
  customer_on_kot_dine_in: boolean;
  customer_on_kot_pickup: boolean;
  customer_on_kot_delivery: boolean;
  customer_on_kot_quick_bill: boolean;
  customer_kot_display_option: string;
  group_kot_items_by_category: boolean;
  hide_table_name_quick_bill: boolean;
  show_new_order_tag: boolean;
  new_order_tag_label: string;
  show_running_order_tag: boolean;
  running_order_tag_label: string;
  dine_in_kot_no: string;
  pickup_kot_no: string;
  delivery_kot_no: string;
  quick_bill_kot_no: string;
  modifier_default_option: boolean;
  print_kot_both_languages: boolean;
  show_alternative_item: boolean;
  show_captain_username: boolean;
  show_covers_as_guest: boolean;
  show_item_price: boolean;
  show_kot_no_quick_bill: boolean;
  show_kot_note: boolean;
  show_online_order_otp: boolean;
  show_order_id_quick_bill: boolean;
  show_order_id_online_order: boolean;
  show_order_no_quick_bill_section: boolean;
  show_order_type_symbol: boolean;
  show_store_name: boolean;
  show_terminal_username: boolean;
  show_username: boolean;
  show_waiter: boolean;
  outlet_name: string;
  email: string;
  website: string;
}

interface KotContextType {
  kotSettings: KotSettings;
  setKotSettings: (settings: KotSettings) => void;
}

const KotContext = createContext<KotContextType | undefined>(undefined);

export const KotProvider = ({ children }: { children: React.ReactNode }) => {
  const [kotSettings, setKotSettings] = useState<KotSettings>({
    customer_on_kot_dine_in: false,
    customer_on_kot_pickup: false,
    customer_on_kot_delivery: false,
    customer_on_kot_quick_bill: false,
    customer_kot_display_option: 'NAME_ONLY',
    group_kot_items_by_category: false,
    hide_table_name_quick_bill: false,
    show_new_order_tag: true,
    new_order_tag_label: 'New',
    show_running_order_tag: true,
    running_order_tag_label: 'Running',
    dine_in_kot_no: 'DIN-',
    pickup_kot_no: 'PUP-',
    delivery_kot_no: 'DEL-',
    quick_bill_kot_no: 'QBL-',
    modifier_default_option: false,
    print_kot_both_languages: false,
    show_alternative_item: false,
    show_captain_username: false,
    show_covers_as_guest: false,
    show_item_price: true,
    show_kot_no_quick_bill: false,
    show_kot_note: true,
    show_online_order_otp: false,
    show_order_id_quick_bill: false,
    show_order_id_online_order: false,
    show_order_no_quick_bill_section: false,
    show_order_type_symbol: true,
    show_store_name: true,
    show_terminal_username: false,
    show_username: false,
    show_waiter: true,
    outlet_name: '',
    email: '',
    website: '',
  });

  return (
    <KotContext.Provider value={{ kotSettings, setKotSettings }}>
      {children}
    </KotContext.Provider>
  );
};

export const useKotContext = () => {
  const context = useContext(KotContext);
  if (!context) {
    throw new Error('useKotContext must be used within a KotProvider');
  }
  return context;
};