import React, { useState } from 'react'
import MenuList from './navbar/MenuList'
import logo from '@/assets/header_logo.png'
import { Cross, Phone, XCircle } from 'lucide-react'
import {quickContacts, Location} from '@/data/site'
import { RiMenu5Fill } from "react-icons/ri";

export default function PublicNavbar() {
  const [display, setDisplay] = useState(true)

  return (
    <div>
      {display && 
        <div className='bg-(--lightBlue)'>
          <div className='container flex justify-between py-1 text-sm text-(--secondaryText)'>
            <div className='px-2 flex gap-8'>
              {quickContacts.map((item, index)=>(
                  <a key={index} href={item.href}
                  className="inline-flex items-center gap-2 hover:underline
                  hover:text-(--blueDark) cursor-pointer transition-all">
                    <item.icon className="size-4" />
                    {item.value}
                  </a>
              ))}
            </div>
            <div className='hidden lg:inline-flex gap-8 items-center'>
              <span className='inline-flex gap-2 items-center hover:underline hover:text-(--blueDark)
              cursor-pointer transition-all'>
                <Location.icon className='size-4'/>
                {Location.city}-{Location.ward}, {Location.district}, {Location.country}
              </span>
              <button onClick={()=>setDisplay(false)}>
                <XCircle className='size-5 text-gray-300 hover:text-red-500 cursor-pointer transition-all'/>
              </button>
            </div>
          </div>
        </div>
      }
      <div className='container flex justify-between items-center pr-4'>
          <div className='flex items-center'>
            <img src={logo} alt="logo" className='size-20'/>
            <div>
              <h1 className='text-lg tracking-wider leading-6 font-serif'>SHIKSHADEEP <br/>
              <span className='text-sm text-black/60 font-medium'>Academy</span>
              </h1>
            </div>
          </div>
          <MenuList/>
          <div className='lg:hidden'>
            <RiMenu5Fill className='size-6'/>
          </div>
      </div>
    </div>
  )
}
