import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const ManageStore: React.FC = () => {
  // State for toggles
  const [dashboardVisible, setDashboardVisible] = useState<boolean>(true);
  const [liveOrderTrackingVisible, setLiveOrderTrackingVisible] = useState<boolean>(true);
  const [tableReservationVisible, setTableReservationVisible] = useState<boolean>(true);
  const [menuManagementVisible, setMenuManagementVisible] = useState<boolean>(true);
  const [outletMenusVisible, setOutletMenusVisible] = useState<boolean>(true);
  const [isPOSDefaultMenu, setIsPOSDefaultMenu] = useState<boolean>(false);
  const [optionGroupVisible, setOptionGroupVisible] = useState<boolean>(true);
  const [modifierGroupsVisible, setModifierGroupsVisible] = useState<boolean>(true);
  const [categoriesVisible, setCategoriesVisible] = useState<boolean>(true);
  const [nutritionConfigVisible, setNutritionConfigVisible] = useState<boolean>(true);
  const [masterCatalogueVisible, setMasterCatalogueVisible] = useState<boolean>(true);
  const [multiplePriceSettingsVisible, setMultiplePriceSettingsVisible] = useState<boolean>(true);
  const [uploadBulkMenuVisible, setUploadBulkMenuVisible] = useState<boolean>(true);
  const [atlanticPOSVisible, setAtlanticPOSVisible] = useState<boolean>(true);
  const [outletConfigVisible, setOutletConfigVisible] = useState<boolean>(true);
  const [brandVisible, setBrandVisible] = useState<boolean>(true);
  const [outletVisible, setOutletVisible] = useState<boolean>(true);
  const [outletDesignationVisible, setOutletDesignationVisible] = useState<boolean>(true);
  const [outletUsersVisible, setOutletUsersVisible] = useState<boolean>(true);
  const [paymentModesVisible, setPaymentModesVisible] = useState<boolean>(true);
  const [masterManagementVisible, setMasterManagementVisible] = useState<boolean>(true);
  const [productGroupVisible, setProductGroupVisible] = useState<boolean>(true);
  const [kitchenDeptVisible, setKitchenDeptVisible] = useState<boolean>(true);
  const [taxVisible, setTaxVisible] = useState<boolean>(true);
  const [outletDeptsVisible, setOutletDeptsVisible] = useState<boolean>(true);
  const [tableManagementVisible, setTableManagementVisible] = useState<boolean>(true);
  const [discountsVisible, setDiscountsVisible] = useState<boolean>(true);
  const [customizedDiscountVisible, setCustomizedDiscountVisible] = useState<boolean>(true);
  const [additionalChargesVisible, setAdditionalChargesVisible] = useState<boolean>(true);
  const [platformVisible, setPlatformVisible] = useState<boolean>(true);
  const [reportsVisible, setReportsVisible] = useState<boolean>(true);
  const [salesOrderVisible, setSalesOrderVisible] = useState<boolean>(true);
  const [dsrReportVisible, setDsrReportVisible] = useState<boolean>(true);
  const [todaysReportVisible, setTodaysReportVisible] = useState<boolean>(true);
  const [itemReportVisible, setItemReportVisible] = useState<boolean>(true);
  const [paymentReportVisible, setPaymentReportVisible] = useState<boolean>(true);
  const [expenseTrackingVisible, setExpenseTrackingVisible] = useState<boolean>(true);
  const [orderReportVisible, setOrderReportVisible] = useState<boolean>(true);
  const [categoryReportVisible, setCategoryReportVisible] = useState<boolean>(true);
  const [kitchenDeptReportVisible, setKitchenDeptReportVisible] = useState<boolean>(true);
  const [couponCodeHistoryReportVisible, setCouponCodeHistoryReportVisible] = useState<boolean>(true);
  const [duePaymentReportVisible, setDuePaymentReportVisible] = useState<boolean>(true);
  const [startCloseDayReportVisible, setStartCloseDayReportVisible] = useState<boolean>(true);
  const [shiftWiseReportVisible, setShiftWiseReportVisible] = useState<boolean>(true);
  const [discountReportVisible, setDiscountReportVisible] = useState<boolean>(true);
  const [billerWiseSummaryVisible, setBillerWiseSummaryVisible] = useState<boolean>(true);
  const [deliveryReportVisible, setDeliveryReportVisible] = useState<boolean>(true);
  const [dayWiseSummaryReportVisible, setDayWiseSummaryReportVisible] = useState<boolean>(true);
  const [billPrintReportVisible, setBillPrintReportVisible] = useState<boolean>(true);
  const [appliedChargesReportVisible, setAppliedChargesReportVisible] = useState<boolean>(true);
  const [customerQueriesVisible, setCustomerQueriesVisible] = useState<boolean>(true);
  const [orderSyncHistoryVisible, setOrderSyncHistoryVisible] = useState<boolean>(true);
  const [waiterReportVisible, setWaiterReportVisible] = useState<boolean>(true);
  const [hourlyReportVisible, setHourlyReportVisible] = useState<boolean>(true);
  const [zatkaReportVisible, setZatkaReportVisible] = useState<boolean>(true);
  const [passcodeUserReportVisible, setPasscodeUserReportVisible] = useState<boolean>(true);
  const [logisticReportVisible, setLogisticReportVisible] = useState<boolean>(true);
  const [orderStateTransitionReportVisible, setOrderStateTransitionReportVisible] = useState<boolean>(true);
  const [upiTransactionReportVisible, setUpiTransactionReportVisible] = useState<boolean>(true);
  const [bharatPeTransactionReportVisible, setBharatPeTransactionReportVisible] = useState<boolean>(true);
  const [digitalOrderVisible, setDigitalOrderVisible] = useState<boolean>(true);
  const [ordersVisible, setOrdersVisible] = useState<boolean>(true);
  const [digitalOrderSettingsVisible, setDigitalOrderSettingsVisible] = useState<boolean>(true);
  const [irdReportVisible, setIrdReportVisible] = useState<boolean>(true);
  const [saleMaterializedReportVisible, setSaleMaterializedReportVisible] = useState<boolean>(true);
  const [crmVisible, setCrmVisible] = useState<boolean>(true);
  const [customersVisible, setCustomersVisible] = useState<boolean>(true);
  const [customerHistoryVisible, setCustomerHistoryVisible] = useState<boolean>(true);
  const [couponCodeManagementVisible, setCouponCodeManagementVisible] = useState<boolean>(true);
  const [couponCodeGenerateVisible, setCouponCodeGenerateVisible] = useState<boolean>(true);
  const [couponCodeUsedHistoryVisible, setCouponCodeUsedHistoryVisible] = useState<boolean>(true);
  const [walletManagementVisible, setWalletManagementVisible] = useState<boolean>(true);
  const [customerWalletVisible, setCustomerWalletVisible] = useState<boolean>(true);
  const [sendSmsVisible, setSendSmsVisible] = useState<boolean>(true);
  const [runCampaignVisible, setRunCampaignVisible] = useState<boolean>(true);
  const [callCenterVisible, setCallCenterVisible] = useState<boolean>(true);
  const [tmBillApplicationVisible, setTmBillApplicationVisible] = useState<boolean>(true);
  const [inventoryManagementVisible, setInventoryManagementVisible] = useState<boolean>(true);
  const [warehouseVisible, setWarehouseVisible] = useState<boolean>(true);
  const [rawMaterialManagementVisible, setRawMaterialManagementVisible] = useState<boolean>(true);
  const [rawMaterialCategoryVisible, setRawMaterialCategoryVisible] = useState<boolean>(true);
  const [rawMaterialUnitVisible, setRawMaterialUnitVisible] = useState<boolean>(true);
  const [rawMaterialGroupVisible, setRawMaterialGroupVisible] = useState<boolean>(true);
  const [rawMaterialTaxVisible, setRawMaterialTaxVisible] = useState<boolean>(true);
  const [rawMaterialVisible, setRawMaterialVisible] = useState<boolean>(true);
  const [manualStockEntryVisible, setManualStockEntryVisible] = useState<boolean>(true);
  const [manualStockOutVisible, setManualStockOutVisible] = useState<boolean>(true);
  const [vendorManagementVisible, setVendorManagementVisible] = useState<boolean>(true);
  const [vendorDetailsVisible, setVendorDetailsVisible] = useState<boolean>(true);
  const [vendorPaymentsVisible, setVendorPaymentsVisible] = useState<boolean>(true);
  const [purchaseManagementVisible, setPurchaseManagementVisible] = useState<boolean>(true);
  const [billTypeVisible, setBillTypeVisible] = useState<boolean>(true);
  const [purchaseOrderVisible, setPurchaseOrderVisible] = useState<boolean>(true);
  const [allowAccessPOCanBeDelete, setAllowAccessPOCanBeDelete] = useState<boolean>(false);
  const [allowAccessPOCanBeEdit, setAllowAccessPOCanBeEdit] = useState<boolean>(false);
  const [poTransactionVisible, setPoTransactionVisible] = useState<boolean>(true);
  const [recipeManagementVisible, setRecipeManagementVisible] = useState<boolean>(true);
  const [furnishedItemConfigVisible, setFurnishedItemConfigVisible] = useState<boolean>(true);
  const [inventoryReportsVisible, setInventoryReportsVisible] = useState<boolean>(true);
  const [inventoryOnHandVisible, setInventoryOnHandVisible] = useState<boolean>(true);
  const [consumptionStockVisible, setConsumptionStockVisible] = useState<boolean>(true);
  const [recipeWastageReportVisible, setRecipeWastageReportVisible] = useState<boolean>(true);
  const [costManagementVisible, setCostManagementVisible] = useState<boolean>(true);
  const [plReportVisible, setPlReportVisible] = useState<boolean>(true);
  const [categoryWiseReportVisible, setCategoryWiseReportVisible] = useState<boolean>(true);
  const [openingClosingStockVisible, setOpeningClosingStockVisible] = useState<boolean>(true);
  const [stockTransferItemReportVisible, setStockTransferItemReportVisible] = useState<boolean>(true);
  const [stockTransferManagementVisible, setStockTransferManagementVisible] = useState<boolean>(true);
  const [requisitionStockVisible, setRequisitionStockVisible] = useState<boolean>(true);
  const [stockTransferVisible, setStockTransferVisible] = useState<boolean>(true);
  const [receivedStockVisible, setReceivedStockVisible] = useState<boolean>(true);
  const [returnStockVisible, setReturnStockVisible] = useState<boolean>(true);
  const [feedbackManagementVisible, setFeedbackManagementVisible] = useState<boolean>(true);
  const [ondcVisible, setOndcVisible] = useState<boolean>(true);
  const [thirdPartyIntegrationVisible, setThirdPartyIntegrationVisible] = useState<boolean>(true);
  const [aboutTMBillVisible, setAboutTMBillVisible] = useState<boolean>(true);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(true);
  const [paymentGatewayConfigVisible, setPaymentGatewayConfigVisible] = useState<boolean>(true);
  const [webhookConfigVisible, setWebhookConfigVisible] = useState<boolean>(true);
  const [logsVisible, setLogsVisible] = useState<boolean>(true);

  // Handle form submission
  const handleSubmit = () => {
    console.log('Settings saved:', {
      dashboardVisible,
      liveOrderTrackingVisible,
      tableReservationVisible,
      menuManagementVisible,
      outletMenusVisible,
      isPOSDefaultMenu,
      optionGroupVisible,
      modifierGroupsVisible,
      categoriesVisible,
      nutritionConfigVisible,
      masterCatalogueVisible,
      multiplePriceSettingsVisible,
      uploadBulkMenuVisible,
      atlanticPOSVisible,
      outletConfigVisible,
      brandVisible,
      outletVisible,
      outletDesignationVisible,
      outletUsersVisible,
      paymentModesVisible,
      masterManagementVisible,
      productGroupVisible,
      kitchenDeptVisible,
      taxVisible,
      outletDeptsVisible,
      tableManagementVisible,
      discountsVisible,
      customizedDiscountVisible,
      additionalChargesVisible,
      platformVisible,
      reportsVisible,
      salesOrderVisible,
      dsrReportVisible,
      todaysReportVisible,
      itemReportVisible,
      paymentReportVisible,
      expenseTrackingVisible,
      orderReportVisible,
      categoryReportVisible,
      kitchenDeptReportVisible,
      couponCodeHistoryReportVisible,
      duePaymentReportVisible,
      startCloseDayReportVisible,
      shiftWiseReportVisible,
      discountReportVisible,
      billerWiseSummaryVisible,
      deliveryReportVisible,
      dayWiseSummaryReportVisible,
      billPrintReportVisible,
      appliedChargesReportVisible,
      customerQueriesVisible,
      orderSyncHistoryVisible,
      waiterReportVisible,
      hourlyReportVisible,
      zatkaReportVisible,
      passcodeUserReportVisible,
      logisticReportVisible,
      orderStateTransitionReportVisible,
      upiTransactionReportVisible,
      bharatPeTransactionReportVisible,
      digitalOrderVisible,
      ordersVisible,
      digitalOrderSettingsVisible,
      irdReportVisible,
      saleMaterializedReportVisible,
      crmVisible,
      customersVisible,
      customerHistoryVisible,
      couponCodeManagementVisible,
      couponCodeGenerateVisible,
      couponCodeUsedHistoryVisible,
      walletManagementVisible,
      customerWalletVisible,
      sendSmsVisible,
      runCampaignVisible,
      callCenterVisible,
      tmBillApplicationVisible,
      inventoryManagementVisible,
      warehouseVisible,
      rawMaterialManagementVisible,
      rawMaterialCategoryVisible,
      rawMaterialUnitVisible,
      rawMaterialGroupVisible,
      rawMaterialTaxVisible,
      rawMaterialVisible,
      manualStockEntryVisible,
      manualStockOutVisible,
      vendorManagementVisible,
      vendorDetailsVisible,
      vendorPaymentsVisible,
      purchaseManagementVisible,
      billTypeVisible,
      purchaseOrderVisible,
      allowAccessPOCanBeDelete,
      allowAccessPOCanBeEdit,
      poTransactionVisible,
      recipeManagementVisible,
      furnishedItemConfigVisible,
      inventoryReportsVisible,
      inventoryOnHandVisible,
      consumptionStockVisible,
      recipeWastageReportVisible,
      costManagementVisible,
      plReportVisible,
      categoryWiseReportVisible,
      openingClosingStockVisible,
      stockTransferItemReportVisible,
      stockTransferManagementVisible,
      requisitionStockVisible,
      stockTransferVisible,
      receivedStockVisible,
      returnStockVisible,
      feedbackManagementVisible,
      ondcVisible,
      thirdPartyIntegrationVisible,
      aboutTMBillVisible,
      settingsVisible,
      paymentGatewayConfigVisible,
      webhookConfigVisible,
      logsVisible,
    });
    alert('Settings saved successfully!');
  };

  // Handle back button (placeholder, can be replaced with navigation logic)
  const handleBack = () => {
    console.log('Back button clicked');
    alert('Back button clicked');
  };

  // Placeholder functions for buttons
  const handleExport = () => alert('Export clicked');
  const handleEditMenu = () => alert('Edit Menu clicked');
  const handleDownloadMenu = () => alert('Download Menu clicked');
  const handleEditSettings = () => alert('Edit Settings clicked');
  const handleDeleteMenu = () => alert('Delete Menu clicked');
  const handleAddMenu = () => alert('Add Menu clicked');
  const handleAddRecipe = () => alert('Add Recipe clicked');
  const handleCopyRecipe = () => alert('Copy Recipe clicked');
  const handleEditRecipe = () => alert('Edit Recipe clicked');
  const handleEditQuantity = () => alert('Edit Quantity clicked');
  const handleDeleteRecipe = () => alert('Delete Recipe clicked');
  const handleAddFurnishedItem = () => alert('Add New Furnished Item clicked');
  const handleUpdateFurnishedItem = () => alert('Update Furnished Item clicked');
  const handleDeleteFurnishedItem = () => alert('Delete Furnished Item clicked');
  const handleEdit = () => alert('Edit clicked');
  const handleApprove = () => alert('Approve clicked');
  const handleReject = () => alert('Reject clicked');

  return (
    <div className="p-4">
      <h4 className="mb-2">Update Store Login Access Level</h4>
      <p className="mb-1">Name: Hotelshubharambh</p>
      <p className="mb-4">Outlet Name: !!Hotel Shubharambh!!</p>
      <Card className="p-4">
        {/* Dashboard */}
        <div className="mb-4">
          <h5 className="mb-3">Dashboard</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="dashboardVisible"
                label="Is Visible"
                checked={dashboardVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDashboardVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Live Order Tracking */}
        <div className="mb-4">
          <h5 className="mb-3">Live Order Tracking</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="liveOrderTrackingVisible"
                label="Is Visible"
                checked={liveOrderTrackingVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiveOrderTrackingVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Table Reservation */}
        <div className="mb-4">
          <h5 className="mb-3">Table Reservation</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="tableReservationVisible"
                label="Is Visible"
                checked={tableReservationVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTableReservationVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Menu Management */}
        <div className="mb-4">
          <h5 className="mb-3">Menu Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="menuManagementVisible"
                label="Is Visible"
                checked={menuManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMenuManagementVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet Menus */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet Menus</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletMenusVisible"
                label="Is Visible"
                checked={outletMenusVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletMenusVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleEditMenu}>
                Edit Menu
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleDownloadMenu}>
                Download Menu
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleEditSettings}>
                Edit Settings
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleDeleteMenu}>
                Delete Menu
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleAddMenu}>
                Add Menu
              </Button>
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="isPOSDefaultMenu"
                label="Is POS Default Menu"
                checked={isPOSDefaultMenu}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsPOSDefaultMenu(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Option Group */}
        <div className="mb-4">
          <h5 className="mb-3">Option Group</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="optionGroupVisible"
                label="Is Visible"
                checked={optionGroupVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOptionGroupVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Modifier Groups */}
        <div className="mb-4">
          <h5 className="mb-3">Modifier Groups</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="modifierGroupsVisible"
                label="Is Visible"
                checked={modifierGroupsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModifierGroupsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h5 className="mb-3">Categories</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="categoriesVisible"
                label="Is Visible"
                checked={categoriesVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoriesVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Nutrition Configuration */}
        <div className="mb-4">
          <h5 className="mb-3">Nutrition Configuration</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="nutritionConfigVisible"
                label="Is Visible"
                checked={nutritionConfigVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNutritionConfigVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Master Catalogue */}
        <div className="mb-4">
          <h5 className="mb-3">Master Catalogue</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="masterCatalogueVisible"
                label="Is Visible"
                checked={masterCatalogueVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMasterCatalogueVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Multiple Price Settings */}
        <div className="mb-4">
          <h5 className="mb-3">Multiple Price Settings</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="multiplePriceSettingsVisible"
                label="Is Visible"
                checked={multiplePriceSettingsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMultiplePriceSettingsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Upload Bulk Menu */}
        <div className="mb-4">
          <h5 className="mb-3">Upload Bulk Menu</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="uploadBulkMenuVisible"
                label="Is Visible"
                checked={uploadBulkMenuVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUploadBulkMenuVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Atlantic POS */}
        <div className="mb-4">
          <h5 className="mb-3">Atlantic POS</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="atlanticPOSVisible"
                label="Is Visible"
                checked={atlanticPOSVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAtlanticPOSVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet Configuration */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet Configuration</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletConfigVisible"
                label="Is Visible"
                checked={outletConfigVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletConfigVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <h5 className="mb-3">Brand</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="brandVisible"
                label="Is Visible"
                checked={brandVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrandVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletVisible"
                label="Is Visible"
                checked={outletVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet Designation */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet Designation</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletDesignationVisible"
                label="Is Visible"
                checked={outletDesignationVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletDesignationVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet Users */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet Users</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletUsersVisible"
                label="Is Visible"
                checked={outletUsersVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletUsersVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Payment Modes */}
        <div className="mb-4">
          <h5 className="mb-3">Payment Modes</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="paymentModesVisible"
                label="Is Visible"
                checked={paymentModesVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentModesVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Master Management */}
        <div className="mb-4">
          <h5 className="mb-3">Master Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="masterManagementVisible"
                label="Is Visible"
                checked={masterManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMasterManagementVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Product Group */}
        <div className="mb-4">
          <h5 className="mb-3">Product Group</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="productGroupVisible"
                label="Is Visible"
                checked={productGroupVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductGroupVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Kitchen Department */}
        <div className="mb-4">
          <h5 className="mb-3">Kitchen Department</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="kitchenDeptVisible"
                label="Is Visible"
                checked={kitchenDeptVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKitchenDeptVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Tax */}
        <div className="mb-4">
          <h5 className="mb-3">Tax</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="taxVisible"
                label="Is Visible"
                checked={taxVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaxVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Outlet Departments */}
        <div className="mb-4">
          <h5 className="mb-3">Outlet Departments</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="outletDeptsVisible"
                label="Is Visible"
                checked={outletDeptsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletDeptsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Table Management */}
        <div className="mb-4">
          <h5 className="mb-3">Table Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="tableManagementVisible"
                label="Is Visible"
                checked={tableManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTableManagementVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Discounts */}
        <div className="mb-4">
          <h5 className="mb-3">Discounts</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="discountsVisible"
                label="Is Visible"
                checked={discountsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscountsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Customized Discount */}
        <div className="mb-4">
          <h5 className="mb-3">Customized Discount</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="customizedDiscountVisible"
                label="Is Visible"
                checked={customizedDiscountVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomizedDiscountVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Additional Charges */}
        <div className="mb-4">
          <h5 className="mb-3">Additional Charges</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="additionalChargesVisible"
                label="Is Visible"
                checked={additionalChargesVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdditionalChargesVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Platform */}
        <div className="mb-4">
          <h5 className="mb-3">Platform</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="platformVisible"
                label="Is Visible"
                checked={platformVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlatformVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Reports */}
        <div className="mb-4">
          <h5 className="mb-3">Reports</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="reportsVisible"
                label="Is Visible"
                checked={reportsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReportsVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="salesOrderVisible"
                label="Sales Order Is Visible"
                checked={salesOrderVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSalesOrderVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="dsrReportVisible"
                label="DSR Report Is Visible"
                checked={dsrReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDsrReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <p className="mb-0">DSR Month Wise Report</p>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <p className="mb-0">Bill Wise Liquor Sales Report</p>
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="todaysReportVisible"
                label="Todays Report Is Visible"
                checked={todaysReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodaysReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="itemReportVisible"
                label="Item Report Is Visible"
                checked={itemReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setItemReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="paymentReportVisible"
                label="Payment Report Is Visible"
                checked={paymentReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="expenseTrackingVisible"
                label="Expense Tracking Is Visible"
                checked={expenseTrackingVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpenseTrackingVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="orderReportVisible"
                label="Order Report Is Visible"
                checked={orderReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="categoryReportVisible"
                label="Category Report Is Visible"
                checked={categoryReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="kitchenDeptReportVisible"
                label="Kitchen Dept Report Is Visible"
                checked={kitchenDeptReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKitchenDeptReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="couponCodeHistoryReportVisible"
                label="Coupon Code History Report Is Visible"
                checked={couponCodeHistoryReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponCodeHistoryReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="duePaymentReportVisible"
                label="Due Payment Report Is Visible"
                checked={duePaymentReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDuePaymentReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="startCloseDayReportVisible"
                label="Start Close Day Report Is Visible"
                checked={startCloseDayReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartCloseDayReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="shiftWiseReportVisible"
                label="Shift Wise Report Is Visible"
                checked={shiftWiseReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShiftWiseReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="discountReportVisible"
                label="Discount Report Is Visible"
                checked={discountReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscountReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="billerWiseSummaryVisible"
                label="Biller Wise Summary Is Visible"
                checked={billerWiseSummaryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillerWiseSummaryVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="deliveryReportVisible"
                label="Delivery Report Is Visible"
                checked={deliveryReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="dayWiseSummaryReportVisible"
                label="Day Wise Summary Report Is Visible"
                checked={dayWiseSummaryReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDayWiseSummaryReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="billPrintReportVisible"
                label="Bill Print Report Is Visible"
                checked={billPrintReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillPrintReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="appliedChargesReportVisible"
                label="Applied Charges Report Is Visible"
                checked={appliedChargesReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAppliedChargesReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="customerQueriesVisible"
                label="Customer Queries Is Visible"
                checked={customerQueriesVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerQueriesVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="orderSyncHistoryVisible"
                label="Order Sync History Is Visible"
                checked={orderSyncHistoryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderSyncHistoryVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="waiterReportVisible"
                label="Waiter Report Is Visible"
                checked={waiterReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWaiterReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="hourlyReportVisible"
                label="Hourly Report Is Visible"
                checked={hourlyReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHourlyReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="zatkaReportVisible"
                label="Zatka Report Is Visible"
                checked={zatkaReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZatkaReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="passcodeUserReportVisible"
                label="Passcode User Report Is Visible"
                checked={passcodeUserReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasscodeUserReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="logisticReportVisible"
                label="Logistic Report Is Visible"
                checked={logisticReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogisticReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="orderStateTransitionReportVisible"
                label="Order State Transition Report Is Visible"
                checked={orderStateTransitionReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderStateTransitionReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="upiTransactionReportVisible"
                label="UPI Transaction Report Is Visible"
                checked={upiTransactionReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpiTransactionReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="bharatPeTransactionReportVisible"
                label="BharatPe Transaction Report Is Visible"
                checked={bharatPeTransactionReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBharatPeTransactionReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Digital Order */}
        <div className="mb-4">
          <h5 className="mb-3">Digital Order</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="digitalOrderVisible"
                label="Is Visible"
                checked={digitalOrderVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDigitalOrderVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="ordersVisible"
                label="Orders Is Visible"
                checked={ordersVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrdersVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="digitalOrderSettingsVisible"
                label="Digital Order Settings Is Visible"
                checked={digitalOrderSettingsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDigitalOrderSettingsVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="irdReportVisible"
                label="IRD Report Is Visible"
                checked={irdReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIrdReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="saleMaterializedReportVisible"
                label="Sale Materialized Report Is Visible"
                checked={saleMaterializedReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaleMaterializedReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* CRM */}
        <div className="mb-4">
          <h5 className="mb-3">CRM</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="crmVisible"
                label="Is Visible"
                checked={crmVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrmVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="customersVisible"
                label="Customers Is Visible"
                checked={customersVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomersVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleExport}>
                Export
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="customerHistoryVisible"
                label="Customer History Is Visible"
                checked={customerHistoryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerHistoryVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleExport}>
                Export
              </Button>
            </Col>
          </Row>
        </div>

        {/* Coupon Code Management */}
        <div className="mb-4">
          <h5 className="mb-3">Coupon Code Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="couponCodeManagementVisible"
                label="Is Visible"
                checked={couponCodeManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponCodeManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="couponCodeGenerateVisible"
                label="Coupon Code Generate Is Visible"
                checked={couponCodeGenerateVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponCodeGenerateVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="couponCodeUsedHistoryVisible"
                label="Coupon Code Used History Is Visible"
                checked={couponCodeUsedHistoryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponCodeUsedHistoryVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Wallet Management */}
        <div className="mb-4">
          <h5 className="mb-3">Wallet Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="walletManagementVisible"
                label="Is Visible"
                checked={walletManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="customerWalletVisible"
                label="Customer Wallet Is Visible"
                checked={customerWalletVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerWalletVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Send SMS */}
        <div className="mb-4">
          <h5 className="mb-3">Send SMS</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="sendSmsVisible"
                label="Is Visible"
                checked={sendSmsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendSmsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Run Campaign */}
        <div className="mb-4">
          <h5 className="mb-3">Run Campaign</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="runCampaignVisible"
                label="Is Visible"
                checked={runCampaignVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRunCampaignVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Call Center */}
        <div className="mb-4">
          <h5 className="mb-3">Call Center</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="callCenterVisible"
                label="Is Visible"
                checked={callCenterVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCallCenterVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* TMBill Application */}
        <div className="mb-4">
          <h5 className="mb-3">TMBill Application</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="tmBillApplicationVisible"
                label="Is Visible"
                checked={tmBillApplicationVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTmBillApplicationVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Inventory Management */}
        <div className="mb-4">
          <h5 className="mb-3">Inventory Management</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="inventoryManagementVisible"
                label="Is Visible"
                checked={inventoryManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInventoryManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="warehouseVisible"
                label="Warehouse Is Visible"
                checked={warehouseVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWarehouseVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialManagementVisible"
                label="Raw Material Management Is Visible"
                checked={rawMaterialManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialCategoryVisible"
                label="Raw Material Category Is Visible"
                checked={rawMaterialCategoryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialCategoryVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialUnitVisible"
                label="Raw Material Unit Is Visible"
                checked={rawMaterialUnitVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialUnitVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialGroupVisible"
                label="Raw Material Group Is Visible"
                checked={rawMaterialGroupVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialGroupVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialTaxVisible"
                label="Raw Material Tax Is Visible"
                checked={rawMaterialTaxVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialTaxVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="rawMaterialVisible"
                label="Raw Material Is Visible"
                checked={rawMaterialVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRawMaterialVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="manualStockEntryVisible"
                label="Manual Stock Entry Is Visible"
                checked={manualStockEntryVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManualStockEntryVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="manualStockOutVisible"
                label="Manual Stock Out Is Visible"
                checked={manualStockOutVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManualStockOutVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Vendor Management */}
        <div className="mb-4">
          <h5 className="mb-3">Vendor Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="vendorManagementVisible"
                label="Is Visible"
                checked={vendorManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVendorManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="vendorDetailsVisible"
                label="Vendor Details Is Visible"
                checked={vendorDetailsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVendorDetailsVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="vendorPaymentsVisible"
                label="Vendor Payments Is Visible"
                checked={vendorPaymentsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVendorPaymentsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Purchase Management */}
        <div className="mb-4">
          <h5 className="mb-3">Purchase Management</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="purchaseManagementVisible"
                label="Is Visible"
                checked={purchaseManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="billTypeVisible"
                label="Bill Type Is Visible"
                checked={billTypeVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillTypeVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="purchaseOrderVisible"
                label="Purchase Order Is Visible"
                checked={purchaseOrderVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseOrderVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="allowAccessPOCanBeDelete"
                label="Allow Access PO can be Delete?"
                checked={allowAccessPOCanBeDelete}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllowAccessPOCanBeDelete(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="allowAccessPOCanBeEdit"
                label="Allow Access PO can be Edit?"
                checked={allowAccessPOCanBeEdit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllowAccessPOCanBeEdit(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="poTransactionVisible"
                label="PO Transaction Is Visible"
                checked={poTransactionVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoTransactionVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Recipe Management */}
        <div className="mb-4">
          <h5 className="mb-3">Recipe Management</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="recipeManagementVisible"
                label="Is Visible"
                checked={recipeManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleAddRecipe}>
                Add Recipe
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleCopyRecipe}>
                Copy Recipe
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleEditRecipe}>
                Edit Recipe
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleEditQuantity}>
                Edit Quantity
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleDeleteRecipe}>
                Delete Recipe
              </Button>
            </Col>
            <Col md={3}>
              <p className="mb-0">Nested Recipe</p>
            </Col>
          </Row>
        </div>

        {/* Furnished Item Configuration */}
        <div className="mb-4">
          <h5 className="mb-3">Furnished Item Configuration</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="furnishedItemConfigVisible"
                label="Is Visible"
                checked={furnishedItemConfigVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFurnishedItemConfigVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleAddFurnishedItem}>
                Add New Furnished Item
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleUpdateFurnishedItem}>
                Update Furnished Item
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleDeleteFurnishedItem}>
                Delete Furnished Item
              </Button>
            </Col>
          </Row>
        </div>

        {/* Inventory Reports */}
        <div className="mb-4">
          <h5 className="mb-3">Reports</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="inventoryReportsVisible"
                label="Is Visible"
                checked={inventoryReportsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInventoryReportsVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="inventoryOnHandVisible"
                label="Inventory On Hand Is Visible"
                checked={inventoryOnHandVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInventoryOnHandVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="consumptionStockVisible"
                label="Consumption Stock Is Visible"
                checked={consumptionStockVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsumptionStockVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="recipeWastageReportVisible"
                label="Recipe Wastage Report Is Visible"
                checked={recipeWastageReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipeWastageReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Cost Management */}
        <div className="mb-4">
          <h5 className="mb-3">Cost Management</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="costManagementVisible"
                label="Is Visible"
                checked={costManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCostManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="plReportVisible"
                label="P & L Report Is Visible"
                checked={plReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="categoryWiseReportVisible"
                label="Category Wise Report Is Visible"
                checked={categoryWiseReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryWiseReportVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="openingClosingStockVisible"
                label="Opening Closing Stock Is Visible"
                checked={openingClosingStockVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOpeningClosingStockVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="stockTransferItemReportVisible"
                label="Stock Transfer Item Report Is Visible"
                checked={stockTransferItemReportVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockTransferItemReportVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Stock Transfer Management */}
        <div className="mb-4">
          <h5 className="mb-3">Stock Transfer Management</h5>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Check
                type="switch"
                id="stockTransferManagementVisible"
                label="Is Visible"
                checked={stockTransferManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockTransferManagementVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="requisitionStockVisible"
                label="Requisition Stock Is Visible"
                checked={requisitionStockVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRequisitionStockVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleEdit}>
                Edit
              </Button>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleApprove}>
                Approve
              </Button>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Button variant="outline-primary" onClick={handleReject}>
                Reject
              </Button>
            </Col>
            <Col md={3}>
              <p className="mb-0">Payment Type Summary</p>
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="stockTransferVisible"
                label="Stock Transfer Is Visible"
                checked={stockTransferVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockTransferVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="receivedStockVisible"
                label="Received Stock Is Visible"
                checked={receivedStockVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReceivedStockVisible(e.target.checked)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="returnStockVisible"
                label="Return Stock Is Visible"
                checked={returnStockVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReturnStockVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Feedback Management */}
        <div className="mb-4">
          <h5 className="mb-3">Feedback Management</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="feedbackManagementVisible"
                label="Is Visible"
                checked={feedbackManagementVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeedbackManagementVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* ONDC */}
        <div className="mb-4">
          <h5 className="mb-3">ONDC</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="ondcVisible"
                label="Is Visible"
                checked={ondcVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOndcVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Third Party Integration */}
        <div className="mb-4">
          <h5 className="mb-3">Third Party Integration</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="thirdPartyIntegrationVisible"
                label="Is Visible"
                checked={thirdPartyIntegrationVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThirdPartyIntegrationVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* About TMBill */}
        <div className="mb-4">
          <h5 className="mb-3">About TMBill</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="aboutTMBillVisible"
                label="Is Visible"
                checked={aboutTMBillVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAboutTMBillVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Settings */}
        <div className="mb-4">
          <h5 className="mb-3">Settings</h5>
          <Row>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="settingsVisible"
                label="Is Visible"
                checked={settingsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettingsVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="paymentGatewayConfigVisible"
                label="Payment Gateway Configuration Is Visible"
                checked={paymentGatewayConfigVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaymentGatewayConfigVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="webhookConfigVisible"
                label="Webhook Configuration Is Visible"
                checked={webhookConfigVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebhookConfigVisible(e.target.checked)}
              />
            </Col>
            <Col md={3}>
              <Form.Check
                type="switch"
                id="logsVisible"
                label="Logs Is Visible"
                checked={logsVisible}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogsVisible(e.target.checked)}
              />
            </Col>
          </Row>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-start">
          <Button variant="success" onClick={handleSubmit} className="me-2">
            Update
          </Button>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManageStore;