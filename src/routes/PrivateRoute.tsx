import { Route, Navigate, RouteProps } from 'react-router-dom'

import { useAuthContext } from '@/common'

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */

const PrivateRoute = ({ component: Component, roles, ...rest }: any) => {
  const { isAuthenticated } = useAuthContext()
  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (!isAuthenticated) {
          return (
            <Navigate
              to={{
                pathname: '/auth/minimal/login',
              }}
            />
          )
        }
        if (isAuthenticated) {
          return <Navigate to={{ pathname: '/' }} />
        }
        return <Component {...props} />
      }}
    />
  )
}

export default PrivateRoute
