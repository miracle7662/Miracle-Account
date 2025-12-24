import TitleHelmet from '@/components/Common/TitleHelmet'
import AccountSettingsNav from '@/components/Pages/AccountSettings/AccountSettingsNav'
import { NotificationsComponent } from '@/components/Pages/AccountSettings/Notifications'

const Notifications = () => {
  return (
    <>
      <TitleHelmet title="Notifications" />
      <AccountSettingsNav />
      <NotificationsComponent />
    </>
  )
}

export default Notifications
