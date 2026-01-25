import React from 'react'
import { footerData } from '../data/site'
import { Link } from 'react-router-dom'
import { Separator } from "@/components/ui/separator"


export default function Footer() {
  return (
    <div className='bg-(--blueDark) py-4'>
        <div className='container px-4'>
            <div>
                <div className='grid grid-cols-12 justify-between space-y-8'>
                    {/* Left Part */}
                    <div className='space-y-4 col-span-12 lg:col-span-4 grid place-items-center'>
                        <div>
                            <Link to={footerData?.school?.href} title='Go To Home' className='text-white grid place-items-center md:flex items-center'>
                                {/* Logo */}
                                <img src={footerData?.school?.icon} alt="school logo" 
                                className='size-40'/>

                                {/* School Name */}
                                <div>
                                    <h1 className='text-2xl font-serif text-center md:text-start'>{footerData?.school?.title}</h1>
                                    <h2 className='text-(--secondaryTextWhite) font-serif text-center md:text-start'>{footerData?.school?.subtitle}</h2>
                                </div>
                            </Link>
                            <div>
                                {/* School Short Description */}
                                <p className='text-(--secondaryTextWhite) text-center lg:text-justify'>{footerData?.school?.desctiption}</p>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className='flex items-center justify-center w-full lg:justify-start gap-4 '>
                            {footerData?.socialIcons?.map((item,index)=>(
                                <div key={index} className='bg-white/20 w-fit
                                border border-gray-200/30 p-2 rounded-full group
                                hover:bg-white'>
                                    <a href={item.href} target='_blank'>
                                        <item.icon className='text-white size-4
                                        group-hover:text-(--blueDark)'/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Quick Links and all */}
                    <div className='col-span-12 lg:col-span-8 md:flex justify-center lg:justify-end lg:pt-14'>
                        <div className='h-fit'>
                            <div className='grid grid-cols-2 md:flex gap-4 md:gap-8 lg:gap-16'>
                                {/* Quick Links */}
                                <div className='text-(--secondaryTextWhite)'>
                                    <span className='font-medium text-white font-serif'>Quick Links</span>
                                    <div className='grid'>
                                        {footerData?.quickLinks?.map((item,index)=>(
                                        <Link to={item.href} target='_blank' key={index}
                                        className='hover:text-white hover:underline transition-all'>
                                            {item.label}
                                        </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Programs */}
                                <div className='text-(--secondaryTextWhite)'>
                                    <span className='font-medium text-white font-serif'>Programs</span>
                                    <div className='grid'>
                                        {footerData?.programs?.map((item,index)=>(
                                        <Link to={item.href} target='_blank' key={index}
                                        className='hover:text-white hover:underline transition-all'>
                                            {item.label}
                                        </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Contacts */}
                                <div>
                                    <span className='font-medium text-white font-serif'>Contacts</span>
                                    <div className='grid'>
                                        {footerData?.contact?.map((item,index)=>(
                                        <a href={item.href} key={index} className='text-(--secondaryTextWhite) hover:text-white transition-all
                                        flex items-center gap-1'>
                                            <item.icon className='size-4'/>
                                            {item.value}
                                        </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Office Hours */}
                            <div className='pt-8 md:flex items-center gap-4'>
                                <span className='text-white font-medium font-serif'>Office Hours</span>
                                <div className='md:flex gap-4'>
                                    {footerData?.officehours?.map((item,index)=>(
                                        <p key={index} className='text-(--secondaryTextWhite) hover:text-white transition-all'>
                                            • {item}
                                        </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className='my-4 bg-gray-100/20'/>
                {/* Privacy and terms */}
                <div className='md:flex justify-between items-center'>
                    {footerData?.terms?.map((item,index)=>(
                        <p key={index} className='text-(--secondaryTextWhite) hover:text-white transition-all'>
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}
