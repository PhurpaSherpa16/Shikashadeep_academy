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
import EditAlbum from '@/pages/private/gallery/EditAlbum'
import ProgramDashboard from '../pages/private/program/ProgramDashboard'
import ProgramLayout from '../pages/private/program/ProgramLayout'
import NewProgramAdd from '../pages/private/program/NewProgramAdd'
import UpdateProgram from '../pages/private/program/UpdateProgram'

import FacultyDashboard from '../pages/private/faculty/FacultyDashboard'
import FacultyLayout from '../pages/private/faculty/FacultyLayout'
import AddNewTeacher from '../pages/private/faculty/AddNewTeacher'
import UpdateTeacher from '../pages/private/faculty/UpdateTeacher'
import AddNewAdvisory from '../pages/private/faculty/AddNewAdvisory'
import UpdateAdvisory from '../pages/private/faculty/UpdateAdvisory'
import AdmissionLayout from '../pages/private/admission/AdmissionLayout'
import AdmissionDashBoard from '../pages/private/admission/AdmissionDashBoard'
import QueriesLayout from '../pages/private/queries/QueriesLayout'
import QueriesDashboard from '../pages/private/queries/QuriesDashboard'
import CareerDashboard from '../pages/private/career/CareerDashboard'
import CareerLayout from '../pages/private/career/CareerLayout'
import PostingJob from '../pages/private/career/PostingJob'
import UpdateJob from '../pages/private/career/updateJob'
import ViewApplication from '../pages/private/career/ViewApplication'
import Career from '../pages/public/career/Career'
import ViewVacancy from '../pages/public/career/ViewVacancy'
import SubscriberLayout from '../pages/private/subscribe/SubscriberLayout'
import SubscriberDashboard from '../pages/private/subscribe/SubscriberDashboard'
import SettingLayout from '../pages/private/setting/SettingLayout'
import SettingDashboard from '../pages/private/setting/SettingDashboard'
import AddUser from '../pages/private/setting/AddUser'
import ManageProfile from '../pages/private/setting/ManageProfile'
import ViewBlog from '../pages/public/blognews/ViewBlog'
import FlashNoticeLayout from '../pages/private/flash_notice/FlashNoticeLayout'
import FlashNoticeDashboard from '../pages/private/flash_notice/FlashNoticeDashboard'
import AddNewFalshNotice from '../pages/private/flash_notice/AddNewFalshNotice'

export default function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Index />} />
        <Route path='/admission' element={<Admission/>} />
        <Route path='/about_us' element={<AboutUs/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/blog_news' element={<BlogNews/>} />
        <Route path='/programs' element={<Programs/>} />
        <Route path='/career' element={<Career/>} />
        <Route path='/career/view/:id' element={<ViewVacancy/>}/>
        <Route path='/blog/:id' element={<ViewBlog/>}/>
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

        <Route path='/admin/gallery' element={<ManageGallery />} />
        <Route path='/admin/gallery/new' element={<ImageUpload />} />
        <Route path='/admin/gallery/albums' element={<Albums />} />
        <Route path='/admin/gallery/edit/:id' element={<EditAlbum />} />

        <Route path='/admin/programs' element={<ProgramLayout />}>
          <Route index element={<ProgramDashboard />} />
          <Route path='new' element={<NewProgramAdd />} />
          <Route path='update/:id' element={<UpdateProgram />} />
        </Route>

        <Route path='/admin/faculty' element={<FacultyLayout />}>
          <Route index element={<FacultyDashboard />} />
          <Route path='new' element={<AddNewTeacher />} />
          <Route path='update/:id' element={<UpdateTeacher />} />
          <Route path='advisory/new' element={<AddNewAdvisory />} />
          <Route path='advisory/update/:id' element={<UpdateAdvisory />} />
        </Route>

        <Route path='/admin/admissions' element={<AdmissionLayout />}>
          <Route index element={<AdmissionDashBoard />}/>
        </Route>

        <Route path='/admin/queries' element={<QueriesLayout />}>
          <Route index element={<QueriesDashboard/>}/>
        </Route>

        <Route path='/admin/career' element={<CareerLayout/>}>
          <Route index element={<CareerDashboard/>}/>
          <Route index element={<CareerDashboard/>}/>
          <Route path='new' element={<PostingJob/>}/>
          <Route path='update/:id' element={<UpdateJob/>}/>
          <Route path='view/:id' element={<ViewApplication/>}/>
        </Route>

        <Route path='/admin/subscribers' element={<SubscriberLayout/>}>
          <Route index element={<SubscriberDashboard/>}/>
        </Route>

        <Route path='/admin/settings' element={<SettingLayout />}>
          <Route index element={<SettingDashboard/>}/>
          <Route path='new_user/:id' element={<AddUser/>}/>
          <Route path='manage_profile/:id' element={<ManageProfile/>}/>
          <Route path="manage_security/:id" element={<AddUser/>}/>
          <Route path="manage_notifications/:id" element={<AddUser/>}/>
        </Route>

        <Route path='/admin/notice' element={<FlashNoticeLayout />}>
          <Route index element={<FlashNoticeDashboard />} />
          <Route path='new' element={<AddNewFalshNotice/>} />
        </Route>

      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

