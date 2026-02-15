import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from '@/layout/PublicLayout'
import PageNotFound from '@/pages/PageNotFound'
import Index from '@/pages/Index'
import Admission from '@/pages/public/admission/Admission'
import AboutUs from '@/pages/public/about/AboutUs'
import Contact from '@/pages/public/contact/Contact'
import Gallery from '@/pages/public/gallery/Gallery'
import BlogNews from '@/pages/public/blognews/BlogNews'
import Programs from '@/pages/public/programs/Programs'

import AdminLayout from '../layout/AdminLayout'
import Home from '../pages/private/Home'
import { ProtectedRoute } from '@/utils/ProtectedRoute'

import Login from '@/pages/auth/Login'
import Blogs from '@/pages/private/blog/Blogs'
import Notifications from '@/pages/private/Notifications'
import { CreateBlog } from '@/pages/private/blog/CreateBlog'
import { UpdateBlog } from '@/pages/private/blog/UpdateBlog'
import ManageGallery from '@/pages/private/gallery/gallery'
import ImageUpload from '@/pages/private/gallery/imageUpload'
import Albums from '@/pages/private/gallery/albums'
import EditAlbum from '@/pages/private/gallery/editAlbum'
import ProgramDashboard from '../pages/private/program/ProgramDashboard'
import ProgramLayout from '../pages/private/program/ProgramLayout'
import NewProgramAdd from '../pages/private/program/NewProgramAdd'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Index />} />
        <Route path='/admission' element={<Admission />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/blog_news' element={<BlogNews />} />
        <Route path='/programs' element={<Programs />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/admin' element={
        <ProtectedRoute role="ADMIN">
          <AdminLayout />
        </ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path='/admin/blogs' element={<Blogs />} />
        <Route path='/admin/notifications' element={<Notifications />} />
        <Route path='/admin/blogs/new' element={<CreateBlog />} />
        <Route path='/admin/blogs/update/:blogId' element={<UpdateBlog />} />

        <Route path='/admin/gallery' element={<ManageGallery/>}/>
        <Route path='/admin/gallery/new' element={<ImageUpload/>}/>
        <Route path='/admin/gallery/albums' element={<Albums/>}/>
        <Route path='/admin/gallery/edit/:id' element={<EditAlbum/>}/>

        <Route path='/admin/programs' element={<ProgramLayout/>}>
          <Route index element={<ProgramDashboard/>}/>
          <Route path='new' element={<NewProgramAdd/>}/>
        </Route>

      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

