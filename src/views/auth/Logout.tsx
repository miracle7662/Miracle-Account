import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/common/context'

const Logout = () => {
  const { removeSession } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    // Perform logout
    removeSession()
    // Redirect to login page
    navigate('/auth/minimal/login')
  }, [removeSession, navigate])

  return null // This component doesn't render anything
}

export default Logout
