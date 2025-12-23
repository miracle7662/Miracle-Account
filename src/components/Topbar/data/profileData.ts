export interface ProfileOption {
  label: string
  icon: string
  redirectTo: string
}

export const profileDataGroup1: ProfileOption[] = [
  {
    label: 'Profile',
    icon: 'fi fi-rs-user',
    redirectTo: '/user-profile/overview',
  },

  {
    label: 'Settings',
    icon: 'fi fi-rr-settings',
    redirectTo: '/account-settings/account',
  },

  
  // {
  //   label: 'Mailbox',
  //   icon: 'fi fi-rr-envelope-dot',
  //   redirectTo: '/apps/email',
  // },
]
export const profileDataGroup2: ProfileOption[] = [
  // {
  //   label: 'Pricing',
  //   icon: 'fi fi-rr-usd-circle',
  //   redirectTo: '/other-pages/pricing',
  // },
  // {
  //   label: 'Projects',
  //   icon: 'fi fi-rr-file-invoice-dollar',
  //   redirectTo: '/user-profile/projects',
  // },

   {
    label: 'Logout',
    icon: 'fi fi-rr-sign-out-alt',
    redirectTo: '/auth/minimal/login',
  },
  
]
export const profileDataGroup3: ProfileOption[] = [
 
]
