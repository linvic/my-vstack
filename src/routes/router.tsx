import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routeConfig from './config';
import ErrorBoundary from '@/components/error';
import Loading from '@/components/loading';
import { Path } from '@/constants/url';

const AppRouter: React.FC = () => {

  const renderRoutes = () => {
    const routeList = routeConfig.map((item, index) => {
      return <Route key={item.path} path={item.path} element={<item.element />} />
    });
    return routeList;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<Navigate replace to={Path.buy} />} />
          {renderRoutes()}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppRouter;