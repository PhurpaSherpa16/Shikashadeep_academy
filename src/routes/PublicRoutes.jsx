import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../layout/PublicLayout'
import PageNotFound from '../pages/PageNotFound'
import Index from '../pages/Index'
import Admission from '../pages/admission/Admission'
import AboutUs from '../pages/about/AboutUs'
import Contact from '../pages/contact/Contact'
import Gallery from '../pages/gallery/Gallery'
import BlogNews from '../pages/blognews/BlogNews'

export default function PublicRoutes() {
  return (
    <Routes>
        <Route path='/' element={<PublicLayout/>}>
            <Route index element={<Index/>}/>
            <Route path='/admission' element={<Admission/>}/>
            <Route path='/about_us' element={<AboutUs/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
            <Route path='/blog_news' element={<BlogNews/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}
