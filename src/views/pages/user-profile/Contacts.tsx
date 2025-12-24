import TitleHelmet from '@/components/Common/TitleHelmet'
import ProfileCover from '@/components/Pages/UserProfile/ProfileCover'
import { ContactsComponent } from '@/components/Pages/UserProfile/Contacts'

const Contacts = () => {
  return (
    <>
      <TitleHelmet title="Contacts" />
      <ProfileCover />
      <ContactsComponent />
    </>
  )
}

export default Contacts
