import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// All layouts containers
import DefaultLayout from '../Layouts/Default'
import VerticalLayout from '../Layouts/Vertical'
import HorizontalLayout from '../Layouts/Horizontal'

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from './index'
import { ThemeSettings, useAuthContext, useThemeContext } from '../common/context'
interface IRoutesProps {}

const ThemeRoutes = (props: IRoutesProps) => {
  const { settings } = useThemeContext()

  const Layout =
    settings.layout.type === ThemeSettings.layout.type.vertical ? VerticalLayout : HorizontalLayout
  const { isAuthenticated } = useAuthContext()
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<DefaultLayout {...props}>{route.element}</DefaultLayout>}
              key={idx}
            />
          ))}
        </Route>

        <Route>
          {authProtectedFlattenRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                isAuthenticated === false ? (
                  <Navigate
                    to={{
                      pathname: '/auth/minimal/login',
                      search: 'next=' + route.path,
                    }}
                  />
                ) : (
                  <Layout {...props}>{route.element}</Layout>
                )
              }
              key={idx}
            />
          ))}
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </React.Fragment>
  )
}

export default ThemeRoutes
