import TitleHelmet from '@/components/Common/TitleHelmet'
import AccountSettingsNav from '@/components/Pages/AccountSettings/AccountSettingsNav'
import { AccountComponent } from '@/components/Pages/AccountSettings/Account'

const Account = () => {
  return (
    <>
      <TitleHelmet title="Account" />
      <AccountSettingsNav />
      <AccountComponent />
    </>
  )
}

export default Account
