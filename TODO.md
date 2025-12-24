# Tally-like Login & Context Flow Implementation

## Backend Changes
- [ ] Update authController.js - Modify login to not require company/year
- [ ] Add company/year filtering middleware
- [ ] Update controllers to use company/year context (DashboardController, MandiLedgerController, etc.)

## Frontend Changes
- [ ] Update AuthContext to include companyid/yearid
- [ ] Create CompanyYearSelection component
- [ ] Update useLogin hook to redirect to company/year selection
- [ ] Update PrivateRoute to check company/year selection
- [ ] Add company/year selection route to routes/index.tsx

## Testing
- [ ] Test login → company/year selection → dashboard flow
- [ ] Verify all queries are filtered by company/year
- [ ] Ensure no breaking changes to existing data
