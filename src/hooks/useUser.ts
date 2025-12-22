import { APICore } from '../common/api/apiCore'

export default function useUser() {
  const api = new APICore()

  // Get user from localStorage instead of sessionStorage
  const loggedInUser = localStorage.getItem('WINDOW_AUTH_SESSION')
    ? JSON.parse(localStorage.getItem('WINDOW_AUTH_SESSION') || '{}')
    : api.getLoggedInUser()

  return [loggedInUser]
}
