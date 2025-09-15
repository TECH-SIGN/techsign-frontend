import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Home, Services } from '../pages';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const originRect = (location.state as any)?.originRect ?? null;

  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />                 {/* "/" path */}
        <Route path="services" element={<Services />} /> {/* "/services" path */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

