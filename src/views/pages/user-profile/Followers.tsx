import TitleHelmet from '@/components/Common/TitleHelmet'
import ProfileCover from '@/components/Pages/UserProfile/ProfileCover'
import { FollowersComponent } from '@/components/Pages/UserProfile/Followers'

const Followers = () => {
  return (
    <>
      <TitleHelmet title="Followers" />
      <ProfileCover />
      <FollowersComponent />
    </>
  )
}

export default Followers
