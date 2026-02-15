import React, { useEffect } from 'react'
import { about_us } from '../../../data/about'
import { Link, useLocation } from 'react-router-dom'
import Introduction from './components/Introduction'
import Mission from './components/Mission'
import Faculty from './components/Faculty'
import Facilties from './components/Facilties'
import Values from './components/Values'
import BoardMembers from './components/BoardMembers'
import Lottie from "lottie-react";
import panda from '../../../../public/pagenotfound.json'
import { MoveRight, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Card from './components/Card'

export default function AboutUs() {
    const totalItem = about_us.length
    const location = useLocation()
    const url = location.hash.replace('#', '') || 'introduction'

    const currentIndex = about_us.findIndex(item => item.href.split('#')[1] === url)
    const prev = currentIndex === 0 ? totalItem - 1 : currentIndex - 1
    const next = currentIndex === totalItem - 1 ? 0 : currentIndex + 1

    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className='min-h-screen'>
            {/* Hero / Header Section could go here if needed, keeping simple for now based on request */}

            <div className='container mx-auto px-4 py-8 lg:py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 h-full'>

                    {/* Left Sticky Sidebar */}
                    <div className='lg:col-span-3 hidden lg:block'>
                        <div className='sticky top-24 space-y-8'>
                            <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
                                <h3 className='font-serif text-xl font-bold text-gray-900 mb-4 px-2'>
                                    Contents
                                </h3>
                                <nav className='flex flex-col space-y-1'>
                                    {about_us.map((link, index) => {
                                        const isActive = url === link.href.split('#')[1];
                                        return (
                                            <Link
                                                to={link.href}
                                                key={index}
                                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                className={`group flex items-center justify-between px-4 py-3 rounded transition-all duration-300 font-medium ${isActive
                                                    ? 'bg-(--blueDark) text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-(--blueDark)'
                                                    }`}
                                            >
                                                <span>{link.label}</span>
                                                {isActive && <ChevronRight className="h-4 w-4" />}
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Optional: Add a call to action or contact info in sidebar */}
                            <div className='bg-(--blueDark) rounded-lg p-6 text-white text-center space-y-4 hidden lg:block'>
                                <h4 className='font-bold text-lg'>Have Questions?</h4>
                                <p className='text-blue-100 text-sm'>
                                    Contact us to learn more about our programs and admissions.
                                </p>
                                <Button asChild variant="secondary" className='group w-full rounded-full! hover:bg-white hover:text-(--blueDark) hover:border-(--blueDark)'>
                                    <Link to='/contact'>
                                        Contact Us
                                        <MoveRight className="h-4 w-4 group-hover:-rotate-45 transition-all duration-300" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className='lg:col-span-9 space-y-12 h-full'>
                        <div className='bg-white overflow-hidden'>
                            {url === 'introduction' ? <Introduction /> :
                                url === 'mission' ? <Mission /> :
                                    url === 'faculty' ? <Faculty /> :
                                        url === 'advisory_members' ? <BoardMembers /> :
                                            url === 'values' ? <Values /> :
                                                url === 'facilities' ? <Facilties /> :
                                                    <div className='flex flex-col items-center justify-center py-20 px-4 text-center space-y-6'>
                                                        <div className='w-64 md:w-80'>
                                                            <Lottie animationData={panda} loop={true} />
                                                        </div>
                                                        <div className='space-y-4'>
                                                            <h3 className='text-2xl font-bold text-gray-900'>Section Not Found</h3>
                                                            <p className='text-gray-500'>The content you are looking for doesn't exist or has been moved.</p>
                                                            <Button asChild className='rounded-full px-8'>
                                                                <Link to='/about_us#introduction' className='flex items-center gap-2'>
                                                                    Go to Overview
                                                                    <MoveRight className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights Section */}
            <div className='bg-(--offWhiteBackground) px-4'>
                <div className='container py-16 space-y-8'>
                    <div>
                        <h1>More About Our Academy</h1>
                        <p>Explore the people, values, and environment that shape our learning community.</p>
                    </div>
                    {/* Card */}
                    <div className='grid md:flex gap-8 justify-between items-center h-full'>
                        <Card schoolData={about_us[prev]} />
                        <Card schoolData={about_us[next]} />
                    </div>
                </div>
            </div>
        </div>
    )
}
