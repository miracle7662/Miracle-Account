// src/components/KOTPrintSettings.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface KOTPrintSettingsProps {
  formData: any;
  setFormData: (data: any) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
  onUpdate: () => void;
}

const KOTPrintSettings: React.FC<KOTPrintSettingsProps> = ({
  formData,
  setFormData,
  handleInputChange,
  onCancel,
  onUpdate,
}) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h2 className="card-title h5 fw-bold mb-4">KOT Print Settings</h2>

        {/* Header: Search Bar and Status */}
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              <span className="me-2">#</span>
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search"
                style={{ borderColor: '#ccc' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <h6 className="fw-bold mb-3">Status</h6>
            </div>
          </div>
        </div>

        {/* Row 1: Customer on KOT - Dine In */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">1. Customer on KOT - Dine In</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customer_on_kot_dine_in"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.customer_on_kot_dine_in}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 2: Customer on KOT - Pickup */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">2. Customer on KOT - Pickup</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customer_on_kot_pickup"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.customer_on_kot_pickup}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 3: Customer on KOT - Delivery */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">3. Customer on KOT - Delivery</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customer_on_kot_delivery"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.customer_on_kot_delivery}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 4: Customer on KOT - Quick Bill */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">4. Customer on KOT - Quick Bill</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customer_on_kot_quick_bill"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.customer_on_kot_quick_bill}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 5: Customer KOT Display Option */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">5. Customer KOT Display Option</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <select
                className="form-select"
                id="customer_kot_display_option"
                style={{ borderColor: '#ccc' }}
                value={formData.customer_kot_display_option}
                onChange={handleInputChange}
              >
                <option value="NAME_ONLY">Name Only</option>
                <option value="NAME_AND_MOBILE">Name and Mobile</option>
                <option value="DISABLED">Disabled</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 6: Group KOT Items by Category */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">6. Group KOT Items by Category</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="group_kot_items_by_category"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.group_kot_items_by_category}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 7: Hide Table Name - Quick Bill */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">7. Hide Table Name - Quick Bill</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="hide_table_name_quick_bill"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.hide_table_name_quick_bill}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 8: Show New Order Tag */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">8. Show New Order Tag</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_new_order_tag"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_new_order_tag}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 9: New Order Tag Label */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">9. New Order Tag Label</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="new_order_tag_label"
                style={{ borderColor: '#ccc' }}
                value={formData.new_order_tag_label}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 10: Show Running Order Tag */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">10. Show Running Order Tag</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_running_order_tag"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_running_order_tag}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 11: Running Order Tag Label */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">11. Running Order Tag Label</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="running_order_tag_label"
                style={{ borderColor: '#ccc' }}
                value={formData.running_order_tag_label}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 12: Dine In KOT No */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">12. Dine In KOT No</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="dine_in_kot_no"
                style={{ borderColor: '#ccc' }}
                value={formData.dine_in_kot_no}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 13: Pickup KOT No */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">13. Pickup KOT No</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="pickup_kot_no"
                style={{ borderColor: '#ccc' }}
                value={formData.pickup_kot_no}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 14: Delivery KOT No */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">14. Delivery KOT No</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="delivery_kot_no"
                style={{ borderColor: '#ccc' }}
                value={formData.delivery_kot_no}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 15: Quick Bill KOT No */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">15. Quick Bill KOT No</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <input
                type="text"
                className="form-control"
                id="quick_bill_kot_no"
                style={{ borderColor: '#ccc' }}
                value={formData.quick_bill_kot_no}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 16: Modifier Default Option */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">16. Modifier Default Option</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="modifier_default_option"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.modifier_default_option}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 17: Print KOT Both Languages */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">17. Print KOT Both Languages</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="print_kot_both_languages"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.print_kot_both_languages}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 18: Show Alternative Item */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">18. Show Alternative Item</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_alternative_item"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_alternative_item}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 19: Show Captain Username */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">19. Show Captain Username</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_captain_username"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_captain_username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 20: Show Covers as Guest */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">20. Show Covers as Guest</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_covers_as_guest"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_covers_as_guest}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 21: Show Item Price */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">21. Show Item Price</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_item_price"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_item_price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 22: Show KOT No - Quick Bill */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">22. Show KOT No - Quick Bill</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_kot_no_quick_bill"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_kot_no_quick_bill}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 23: Show KOT Note */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">23. Show KOT Note</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_kot_note"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_kot_note}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 24: Show Online Order OTP */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">24. Show Online Order OTP</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_online_order_otp"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_online_order_otp}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 25: Show Order ID - Quick Bill */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">25. Show Order ID - Quick Bill</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_order_id_quick_bill"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_order_id_quick_bill}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 26: Show Order ID - Online Order */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">26. Show Order ID - Online Order</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_order_id_online_order"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_order_id_online_order}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 27: Show Order No - Quick Bill Section */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">27. Show Order No - Quick Bill Section</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_order_no_quick_bill_section"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_order_no_quick_bill_section}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 28: Show Order Type Symbol */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">28. Show Order Type Symbol</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_order_type_symbol"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_order_type_symbol}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 29: Show Store Name */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">29. Show Store Name</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_store_name"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_store_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 30: Show Terminal Username */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">30. Show Terminal Username</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_terminal_username"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_terminal_username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 31: Show Username */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">31. Show Username</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_username"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_username}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        {/* Row 32: Show Waiter */}
        <div className="row mb-2">
          <div className="col-md-6">
            <h6 className="fw-bold mb-3">32. Show Waiter</h6>
          </div>
          <div className="col-md-6">
            <div className="ms-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="show_waiter"
                  style={{ borderColor: '#ccc' }}
                  checked={formData.show_waiter}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" style={{ borderColor: '#ccc' }} />

        <div className="d-flex justify-content-end gap-3 mt-4" style={{ padding: '10px' }}>
          <Button variant="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={onUpdate}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KOTPrintSettings;