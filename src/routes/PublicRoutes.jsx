import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layout/PublicLayout'
import PageNotFound from '../pages/PageNotFound'
import Index from '../pages/Index'

export default function PublicRoutes() {
  return (
    <Routes>
        <Route path='/' element={<PublicLayout/>}>
            <Route index element={<Index/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}
