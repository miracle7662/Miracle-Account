import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Card, Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';

interface ManageCaptainAccessLevelProps {
  id: string;
  onBack: () => void;
}

const ManageCaptainAccessLevel: React.FC<ManageCaptainAccessLevelProps> = ({ id, onBack }) => {
  const [saveBill, setSaveBill] = useState<boolean>(false);
  const [saveKOT, setSaveKOT] = useState<boolean>(false);
  const [saveAndPrintBill, setSaveAndPrintBill] = useState<boolean>(false);
  const [allowDraftBillPrinting, setAllowDraftBillPrinting] = useState<boolean>(false);
  const [enablePrinting, setEnablePrinting] = useState<boolean>(false);
  const [printKOTAndBillTogether, setPrintKOTAndBillTogether] = useState<boolean>(true);
  const [enablePOSPrinter, setEnablePOSPrinter] = useState<boolean>(false);
  const [tableDepartments, setTableDepartments] = useState<string>('Rooms');
  const [itemCategories, setItemCategories] = useState<string>('beverages');
  const [enablePaymentSettingAccess, setEnablePaymentSettingAccess] = useState<boolean>(true);
  const [enablePrintAndSettleBills, setEnablePrintAndSettleBills] = useState<boolean>(false);
  const [enableSaveAndSettleBills, setEnableSaveAndSettleBills] = useState<boolean>(true);
  const [quickBill, setQuickBill] = useState<boolean>(false);
  const [pickup, setPickup] = useState<boolean>(false);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [isVisibleQuickBill, setIsVisibleQuickBill] = useState<boolean>(true);
  const [isVisiblePickup, setIsVisiblePickup] = useState<boolean>(true);
  const [isVisibleDelivery, setIsVisibleDelivery] = useState<boolean>(true);
  const [pickupTimeSlot, setPickupTimeSlot] = useState<string>('15 mins');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('15 mins');
  const [pickupAllowDraftBillPrinting, setPickupAllowDraftBillPrinting] = useState<boolean>(false);
  const [pickupSaveKOT, setPickupSaveKOT] = useState<boolean>(false);
  const [pickupSaveBill, setPickupSaveBill] = useState<boolean>(false);
  const [pickupSaveAndPrintKOT, setPickupSaveAndPrintKOT] = useState<boolean>(false);
  const [pickupSaveAndPrintBill, setPickupSaveAndPrintBill] = useState<boolean>(false);
  const [pickupOldKOT, setPickupOldKOT] = useState<boolean>(false);
  const [deliveryAllowDraftBillPrinting, setDeliveryAllowDraftBillPrinting] = useState<boolean>(false);
  const [deliverySaveKOT, setDeliverySaveKOT] = useState<boolean>(false);
  const [deliverySaveBill, setDeliverySaveBill] = useState<boolean>(false);
  const [deliverySaveAndPrintKOT, setDeliverySaveAndPrintKOT] = useState<boolean>(false);
  const [deliverySaveAndPrintBill, setDeliverySaveAndPrintBill] = useState<boolean>(false);
  const [deliveryOldKOT, setDeliveryOldKOT] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(`Saving settings for outlet ID: ${id}`, {
      saveBill,
      saveKOT,
      saveAndPrintBill,
      allowDraftBillPrinting,
      enablePrinting,
      printKOTAndBillTogether,
      enablePOSPrinter,
      tableDepartments,
      itemCategories,
      enablePaymentSettingAccess,
      enablePrintAndSettleBills,
      enableSaveAndSettleBills,
      quickBill,
      pickup,
      delivery,
      isVisibleQuickBill,
      isVisiblePickup,
      isVisibleDelivery,
      pickupTimeSlot,
      deliveryTimeSlot,
      pickupAllowDraftBillPrinting,
      pickupSaveKOT,
      pickupSaveBill,
      pickupSaveAndPrintKOT,
      pickupSaveAndPrintBill,
      pickupOldKOT,
      deliveryAllowDraftBillPrinting,
      deliverySaveKOT,
      deliverySaveBill,
      deliverySaveAndPrintKOT,
      deliverySaveAndPrintBill,
      deliveryOldKOT,
    });
    toast.success('Settings saved successfully!');
    onBack();
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h4 className="mb-4">Manage Captain Access Level - Outlet ID: {id}</h4>
        <h5 className="mb-3">Order Window</h5>
        <Row className="mb-2">
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="saveBill"
              label="Save Bill"
              checked={saveBill}
              onChange={(e) => setSaveBill(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="saveKOT"
              label="Save KOT"
              checked={saveKOT}
              onChange={(e) => setSaveKOT(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="saveAndPrintBill"
              label="Save And Print Bill"
              checked={saveAndPrintBill}
              onChange={(e) => setSaveAndPrintBill(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="allowDraftBillPrinting"
              label="Allow Draft Bill Printing"
              checked={allowDraftBillPrinting}
              onChange={(e) => setAllowDraftBillPrinting(e.target.checked)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePrinting"
              label="Enable Printing on Specific Devices (e.g. iMin, Z91, NB66)"
              checked={enablePrinting}
              onChange={(e) => setEnablePrinting(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="printKOTAndBillTogether"
              label="Print KOT and Bill Together (Self-Order)"
              checked={printKOTAndBillTogether}
              onChange={(e) => setPrintKOTAndBillTogether(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePOSPrinter"
              label="Enable POS Printer"
              checked={enablePOSPrinter}
              onChange={(e) => setEnablePOSPrinter(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="tableDepartments">
              <Form.Label>Table Departments</Form.Label>
              <Form.Select
                value={tableDepartments}
                onChange={(e) => setTableDepartments(e.target.value)}
              >
                <option value="">Select Table Department</option>
                <option value="Rooms">Rooms</option>
                <option value="Restaurant">Restaurant</option>
                <option value="FamilyDine In">FamilyDine In</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Item Categories</h5>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Group controlId="itemCategories">
              <Form.Label>Select Item Categories</Form.Label>
              <Form.Select
                value={itemCategories}
                onChange={(e) => setItemCategories(e.target.value)}
              >
                <option value="beverages">Beverages</option>
                <option value="Cold Beverages">Cold Beverages</option>
                <option value="Non A/c Room">Non A/c Room</option>
                <option value="Room Details">Room Details</option>
                <option value="Cashew Dish">Cashew Dish</option>
                <option value="Cooker Special (Inaugural Dish)">Cooker Special (Inaugural Dish)</option>
                <option value="Crab Dish">Crab Dish</option>
                <option value="Crab Thali">Crab Thali</option>
                <option value="Spicy Egg">Spicy Egg</option>
                <option value="Chinese">Chinese</option>
                <option value="Lentil">Lentil</option>
                <option value="Thali">Thali</option>
                <option value="Non-Veg Kebab">Non-Veg Kebab</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Payment Settings</h5>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePaymentSettingAccess"
              label="Enable Payment Settings Access"
              checked={enablePaymentSettingAccess}
              onChange={(e) => setEnablePaymentSettingAccess(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePrintAndSettleBills"
              label="Enable Print & Settle Bills"
              checked={enablePrintAndSettleBills}
              onChange={(e) => setEnablePrintAndSettleBills(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enableSaveAndSettleBills"
              label="Enable Save & Settle Bills"
              checked={enableSaveAndSettleBills}
              onChange={(e) => setEnableSaveAndSettleBills(e.target.checked)}
            />
          </Col>
        </Row>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Self Order</h5>
        <Tabs defaultActiveKey="quickBill" id="self-order-tabs" className="mb-3">
          <Tab eventKey="quickBill" title="Quick Bill">
            <Row>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="quickBill"
                  label="Quick Bill"
                  checked={quickBill}
                  onChange={(e) => setQuickBill(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="isVisibleQuickBill"
                  label="Is Visible"
                  checked={isVisibleQuickBill}
                  onChange={(e) => setIsVisibleQuickBill(e.target.checked)}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="pickup" title="Pickup">
            <Row className="mb-2">
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickup"
                  label="Pickup"
                  checked={pickup}
                  onChange={(e) => setPickup(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="isVisiblePickup"
                  label="Is Visible"
                  checked={isVisiblePickup}
                  onChange={(e) => setIsVisiblePickup(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupAllowDraftBillPrinting"
                  label="Allow Draft Bill Printing"
                  checked={pickupAllowDraftBillPrinting}
                  onChange={(e) => setPickupAllowDraftBillPrinting(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupSaveKOT"
                  label="Save KOT"
                  checked={pickupSaveKOT}
                  onChange={(e) => setPickupSaveKOT(e.target.checked)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupSaveBill"
                  label="Save Bill"
                  checked={pickupSaveBill}
                  onChange={(e) => setPickupSaveBill(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupSaveAndPrintKOT"
                  label="Save and Print KOT"
                  checked={pickupSaveAndPrintKOT}
                  onChange={(e) => setPickupSaveAndPrintKOT(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupSaveAndPrintBill"
                  label="Save & Print Bill"
                  checked={pickupSaveAndPrintBill}
                  onChange={(e) => setPickupSaveAndPrintBill(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="pickupOldKOT"
                  label="Old KOT"
                  checked={pickupOldKOT}
                  onChange={(e) => setPickupOldKOT(e.target.checked)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Group controlId="pickupTimeSlot">
                  <Form.Label>Pickup Time Slots</Form.Label>
                  <Form.Select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                  >
                    <option value="15 mins">15 mins</option>
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="1 hr">1 hr</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="delivery" title="Delivery">
            <Row className="mb-2">
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="delivery"
                  label="Delivery"
                  checked={delivery}
                  onChange={(e) => setDelivery(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="isVisibleDelivery"
                  label="Is Visible"
                  checked={isVisibleDelivery}
                  onChange={(e) => setIsVisibleDelivery(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliveryAllowDraftBillPrinting"
                  label="Allow Draft Bill Printing"
                  checked={deliveryAllowDraftBillPrinting}
                  onChange={(e) => setDeliveryAllowDraftBillPrinting(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliverySaveKOT"
                  label="Save KOT"
                  checked={deliverySaveKOT}
                  onChange={(e) => setDeliverySaveKOT(e.target.checked)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliverySaveBill"
                  label="Save Bill"
                  checked={deliverySaveBill}
                  onChange={(e) => setDeliverySaveBill(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliverySaveAndPrintKOT"
                  label="Save and Print KOT"
                  checked={deliverySaveAndPrintKOT}
                  onChange={(e) => setDeliverySaveAndPrintKOT(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliverySaveAndPrintBill"
                  label="Save & Print Bill"
                  checked={deliverySaveAndPrintBill}
                  onChange={(e) => setDeliverySaveAndPrintBill(e.target.checked)}
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Check
                  type="switch"
                  id="deliveryOldKOT"
                  label="Old KOT"
                  checked={deliveryOldKOT}
                  onChange={(e) => setDeliveryOldKOT(e.target.checked)}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Group controlId="deliveryTimeSlot">
                  <Form.Label>Delivery Time Slots</Form.Label>
                  <Form.Select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  >
                    <option value="15 mins">15 mins</option>
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="1 hr">1 hr</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Payment Settings</h5>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePaymentSettingAccess2"
              label="Enable Payment Settings Access"
              checked={enablePaymentSettingAccess}
              onChange={(e) => setEnablePaymentSettingAccess(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enablePrintAndSettleBills2"
              label="Enable Print & Settle Bills"
              checked={enablePrintAndSettleBills}
              onChange={(e) => setEnablePrintAndSettleBills(e.target.checked)}
            />
          </Col>
          <Col md={3} className="mb-3">
            <Form.Check
              type="switch"
              id="enableSaveAndSettleBills2"
              label="Enable Save & Settle Bills"
              checked={enableSaveAndSettleBills}
              onChange={(e) => setEnableSaveAndSettleBills(e.target.checked)}
            />
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-start">
        <Button variant="success" onClick={handleSubmit} className="me-2">
          Update
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      </div>
    </Card>
  );
};

export default ManageCaptainAccessLevel;