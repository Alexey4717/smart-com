import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import Dashboard from 'components/Dashboard';
import GuestGuard from './GuestGuard';
import AuthGuard from './AuthGuard';
import paths from './paths';

type RoutesType = {
  strict?: any;
  path?: string;
  guard?: any;
  layout?: any;
  component?: any;
  routes?: RoutesType;
}[];

const {
  home,
  login,
  profile,
  dialogs,
  users,
  settings,
  pageNotFound
} = paths;

export const renderRoutes = (routes: RoutesType = []): React.ReactNode => (
  <Suspense fallback={<LoadingSpinner />}>
    <Switch>
      {routes.map((route) => {
        const Guard = route.guard ?? Fragment;
        const Layout = route.layout ?? Fragment;
        const Component = route.component;

        return (
          <Route
            key={`${route.path}`}
            path={route.path}
            component={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export const routes: RoutesType = [
  {
    path: pageNotFound,
    component: lazy(() => import('views/PageNotFound'))
  },
  {
    path: login,
    guard: GuestGuard,
    component: lazy(() => import('views/Login'))
  },
  {
    path: home,
    component: () => <Redirect to={profile} />,
    guard: AuthGuard,
    layout: Dashboard,
    routes: [
      {
        path: profile,
        component: lazy(() => import('views/Profile'))
      },
      {
        path: dialogs,
        component: lazy(() => import('views/Dialogs'))
      },
      {
        path: users,
        component: lazy(() => import('views/Users'))
      },
      {
        path: settings,
        component: lazy(() => import('views/Settings'))
      }
    ]
  },
  {
    path: '*',
    routes: [
      {
        path: '/',
        component: () => <Redirect to={home} />
      },
      {
        component: () => <Redirect to={pageNotFound} />
      }
    ]
  }
];