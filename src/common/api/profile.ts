import { HttpClient } from '../helpers'

function ProfileService() {
  return {
    profile: () => {
      return HttpClient.get('/user-profile/overview')
    },
  }
}

export default ProfileService()
