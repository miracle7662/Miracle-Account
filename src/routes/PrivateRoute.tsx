import { Route, Navigate, RouteProps } from 'react-router-dom'

import { useAuthContext } from '@/common'

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const { user, isAuthenticated } = useAuthContext()

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (!isAuthenticated) {
          return (
            <Navigate
              to={{
                pathname: '/auth/classic/login',
              }}
            />
          )
        }

        // Check if company is selected
        if (!user?.companyid) {
          return (
            <Navigate
              to={{
                pathname: '/auth/company-selection',
              }}
            />
          )
        }

        // Check if year is selected
        if (!user?.yearid) {
          return (
            <Navigate
              to={{
                pathname: '/auth/year-selection',
              }}
            />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute
