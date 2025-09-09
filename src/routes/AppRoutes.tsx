import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import { Home, Services } from '../pages'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
