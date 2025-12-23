# Login Page Update and Company Selection Implementation

## Tasks
- [ ] Update LoginClassic.tsx to use username instead of email, remove social logins and unnecessary fields
- [ ] Update useLogin.ts to send username and redirect to company selection page
- [ ] Create CompanySelection.tsx page for selecting company and year
- [ ] Add route for company selection in routes/index.tsx
- [ ] Update useAuthContext.tsx to handle company selection
- [ ] Test the login and company selection flow

## Token Refresh Implementation
- [x] Add refreshToken endpoint in backend/controllers/authController.js
- [x] Add refresh route in backend/routes/authRoutes.js
- [x] Add refreshToken API function in src/common/api/auth.ts
- [x] Implement automatic token refresh in src/common/context/useAuthContext.tsx (every 23 hours)
- [x] Handle refresh failures by logging out user
- [x] Test token refresh functionality
