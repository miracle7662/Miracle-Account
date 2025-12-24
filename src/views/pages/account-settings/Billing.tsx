import TitleHelmet from '@/components/Common/TitleHelmet'
import AccountSettingsNav from '@/components/Pages/AccountSettings/AccountSettingsNav'
import { BillingComponent } from '@/components/Pages/AccountSettings/Billing'

const Billing = () => {
  return (
    <>
      <TitleHelmet title="Billing" />
      <AccountSettingsNav />
      <BillingComponent />
    </>
  )
}

export default Billing
