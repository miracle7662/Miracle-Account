import React from 'react'

// Auth Pages
const Logout = React.lazy(() => import('../views/auth/Logout'))
const CompanyYearSelection = React.lazy(() => import('../views/auth/CompanyYearSelection'))
const Login = React.lazy(() => import('../views/auth/minimal/Login'))
const Register = React.lazy(() => import('../views/auth/minimal/Register'))
const ForgotPassword = React.lazy(() => import('../views/auth/minimal/ForgotPassword'))
const ResetPassword = React.lazy(() => import('../views/auth/minimal/ResetPassword'))
const TwoFactorOTP = React.lazy(() => import('../views/auth/minimal/TwoFactorOTP'))
const LockScreen = React.lazy(() => import('../views/auth/minimal/LockScreen'))
const RegisterSuccess = React.lazy(() => import('../views/auth/minimal/RegisterSuccess'))

// Dashboards
const Analytics = React.lazy(() => import('../views/dashboards/Analytics'))
const CRM = React.lazy(() => import('../views/dashboards/CRM'))

// Apps
const Billing = React.lazy(() => import('../views/apps/Billing'))
const Calendar = React.lazy(() => import('../views/apps/Calendar'))
const Chat = React.lazy(() => import('../views/apps/Chat'))
const Contact = React.lazy(() => import('../views/apps/Contact'))
const CustomersDetails = React.lazy(() => import('../views/apps/CustomersDetails'))
const Email = React.lazy(() => import('../views/apps/Email'))
const Invoice = React.lazy(() => import('../views/apps/Invoice'))
const Kanban = React.lazy(() => import('../views/apps/Kanban'))

// Masters
const AccountNature = React.lazy(() => import('../views/apps/Masters/CommanMasters/AccountNature'))
const AccountType = React.lazy(() => import('../views/apps/Masters/CommanMasters/AccountType'))
const BalanceSheet = React.lazy(() => import('../views/apps/Masters/CommanMasters/BalanceSheet'))
const Brand = React.lazy(() => import('../views/apps/Masters/CommanMasters/Brand'))
const CashBook = React.lazy(() => import('../views/apps/Masters/CommanMasters/CashBook'))
const City = React.lazy(() => import('../views/apps/Masters/CommanMasters/City'))
const CompanyMaster = React.lazy(() => import('../views/apps/Masters/CommanMasters/CompanyMaster'))
const Country = React.lazy(() => import('../views/apps/Masters/CommanMasters/Country'))
const CustomerBill = React.lazy(() => import('../views/apps/Masters/CommanMasters/CustomerBill'))
const FarmerBill = React.lazy(() => import('../views/apps/Masters/CommanMasters/FarmerBill'))
const LedgerAccount = React.lazy(() => import('../views/apps/Masters/CommanMasters/LedgerAccount'))
const MandiLedger = React.lazy(() => import('../views/apps/Masters/CommanMasters/MandiLedger'))
const OutletUser = React.lazy(() => import('../views/apps/Masters/CommanMasters/OutletUser'))
const OutstandingLedger = React.lazy(() => import('../views/apps/Masters/CommanMasters/OutstandingLedger'))
const PanItemMasters = React.lazy(() => import('../views/apps/Masters/CommanMasters/PanItemMasters'))
const PLReport = React.lazy(() => import('../views/apps/Masters/CommanMasters/PLReport'))
const SoudaMaster = React.lazy(() => import('../views/apps/Masters/CommanMasters/SoudaMaster'))
const States = React.lazy(() => import('../views/apps/Masters/CommanMasters/States'))
const UnitMaster = React.lazy(() => import('../views/apps/Masters/CommanMasters/UnitMaster'))
const Utility = React.lazy(() => import('../views/apps/Masters/CommanMasters/Utility'))

// Pages
const AccountSettings = React.lazy(() => import('../views/pages/account-settings/Account'))
const AboutUs = React.lazy(() => import('../views/pages/other-pages/AboutUs'))
const ContactUs = React.lazy(() => import('../views/pages/other-pages/ContactUs'))
const FAQs = React.lazy(() => import('../views/pages/other-pages/FAQs'))
const Pricing = React.lazy(() => import('../views/pages/other-pages/Pricing'))
const PrivacyPolicy = React.lazy(() => import('../views/pages/other-pages/PrivacyPolicy'))
const StarterPage = React.lazy(() => import('../views/pages/other-pages/StarterPage'))
const TermsServices = React.lazy(() => import('../views/pages/other-pages/TermsServices'))
const UserProfile = React.lazy(() => import('../views/pages/user-profile/Overview'))

// UI Elements
const Accordions = React.lazy(() => import('../views/uielements/base/Accordions'))
const Avatars = React.lazy(() => import('../views/uielements/base/Avatars'))
const Buttons = React.lazy(() => import('../views/uielements/base/Buttons'))
const Cards = React.lazy(() => import('../views/uielements/base/Cards'))
const Carousels = React.lazy(() => import('../views/uielements/base/Carousels'))
const Dropdowns = React.lazy(() => import('../views/uielements/base/Dropdowns'))
const Miscellaneous = React.lazy(() => import('../views/uielements/base/Miscellaneous'))
const Modals = React.lazy(() => import('../views/uielements/base/Modals'))
const NavTabs = React.lazy(() => import('../views/uielements/base/NavTabs'))
const Toasts = React.lazy(() => import('../views/uielements/base/Toasts'))

// Error Pages
const NotFound = React.lazy(() => import('../views/error/NotFound'))
const ServerError = React.lazy(() => import('../views/error/ServerError'))
const NotAuthorized = React.lazy(() => import('../views/error/NotAuthorized'))
const UnderMaintenance = React.lazy(() => import('../views/error/UnderMaintenance'))
const CommingSoon = React.lazy(() => import('../views/error/CommingSoon'))

// Public Routes
const publicProtectedFlattenRoutes = [
  {
    path: '/auth/minimal/login',
    element: <Login />,
  },
  {
    path: '/auth/minimal/register',
    element: <Register />,
  },
  {
    path: '/auth/minimal/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/minimal/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/auth/minimal/two-factor-otp',
    element: <TwoFactorOTP />,
  },
  {
    path: '/auth/minimal/lock-screen',
    element: <LockScreen />,
  },
  {
    path: '/auth/minimal/register-success',
    element: <RegisterSuccess />,
  },
  {
    path: '/auth/logout',
    element: <Logout />,
  },
  {
    path: '/auth/company-year-selection',
    element: <CompanyYearSelection />,
  },
  {
    path: '/error/not-found',
    element: <NotFound />,
  },
  {
    path: '/error/server-error',
    element: <ServerError />,
  },
  {
    path: '/error/not-authorized',
    element: <NotAuthorized />,
  },
  {
    path: '/error/under-maintenance',
    element: <UnderMaintenance />,
  },
  {
    path: '/error/coming-soon',
    element: <CommingSoon />,
  },
]

// Auth Protected Routes
const authProtectedFlattenRoutes = [
  {
    path: '/dashboard/analytics',
    element: <Analytics />,
  },
  {
    path: '/dashboard/crm',
    element: <CRM />,
  },
  {
    path: '/apps/billing',
    element: <Billing />,
  },
  {
    path: '/apps/calendar',
    element: <Calendar />,
  },
  {
    path: '/apps/chat',
    element: <Chat />,
  },
  {
    path: '/apps/contact',
    element: <Contact />,
  },
  {
    path: '/apps/customers-details',
    element: <CustomersDetails />,
  },
  {
    path: '/apps/email',
    element: <Email />,
  },
  {
    path: '/apps/invoice',
    element: <Invoice />,
  },
  {
    path: '/apps/kanban',
    element: <Kanban />,
  },
  {
    path: '/masters/account-nature',
    element: <AccountNature />,
  },
  {
    path: '/masters/account-type',
    element: <AccountType />,
  },
  {
    path: '/masters/balance-sheet',
    element: <BalanceSheet />,
  },
  {
    path: '/masters/brand',
    element: <Brand />,
  },
  {
    path: '/masters/cash-book',
    element: <CashBook />,
  },
  {
    path: '/masters/city',
    element: <City />,
  },
  {
    path: '/masters/company-master',
    element: <CompanyMaster />,
  },
  {
    path: '/masters/country',
    element: <Country />,
  },
  {
    path: '/masters/customer-bill',
    element: <CustomerBill />,
  },
  {
    path: '/masters/farmer-bill',
    element: <FarmerBill />,
  },
  {
    path: '/masters/ledger-account',
    element: <LedgerAccount />,
  },
  {
    path: '/masters/mandi-ledger',
    element: <MandiLedger />,
  },
  {
    path: '/masters/outlet-user',
    element: <OutletUser />,
  },
  {
    path: '/masters/outstanding-ledger',
    element: <OutstandingLedger />,
  },
  {
    path: '/masters/pan-item-masters',
    element: <PanItemMasters />,
  },
  {
    path: '/masters/pl-report',
    element: <PLReport />,
  },
  {
    path: '/masters/souda-master',
    element: <SoudaMaster />,
  },
  {
    path: '/masters/states',
    element: <States />,
  },
  {
    path: '/masters/unit-master',
    element: <UnitMaster />,
  },
  {
    path: '/masters/utility',
    element: <Utility />,
  },
  {
    path: '/pages/account-settings',
    element: <AccountSettings />,
  },
  {
    path: '/pages/about-us',
    element: <AboutUs />,
  },
  {
    path: '/pages/contact-us',
    element: <ContactUs />,
  },
  {
    path: '/pages/faqs',
    element: <FAQs />,
  },
  {
    path: '/pages/pricing',
    element: <Pricing />,
  },
  {
    path: '/pages/privacy-policy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/pages/starter-page',
    element: <StarterPage />,
  },
  {
    path: '/pages/terms-services',
    element: <TermsServices />,
  },
  {
    path: '/pages/user-profile',
    element: <UserProfile />,
  },
  {
    path: '/ui-elements/accordions',
    element: <Accordions />,
  },
  {
    path: '/ui-elements/avatars',
    element: <Avatars />,
  },
  {
    path: '/ui-elements/buttons',
    element: <Buttons />,
  },
  {
    path: '/ui-elements/cards',
    element: <Cards />,
  },
  {
    path: '/ui-elements/carousels',
    element: <Carousels />,
  },
  {
    path: '/ui-elements/dropdowns',
    element: <Dropdowns />,
  },
  {
    path: '/ui-elements/miscellaneous',
    element: <Miscellaneous />,
  },
  {
    path: '/ui-elements/modals',
    element: <Modals />,
  },
  {
    path: '/ui-elements/nav-tabs',
    element: <NavTabs />,
  },
  {
    path: '/ui-elements/toasts',
    element: <Toasts />,
  },
]

export { authProtectedFlattenRoutes, publicProtectedFlattenRoutes }
