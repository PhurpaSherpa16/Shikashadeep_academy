import React, { useEffect, useRef, useState } from 'react'
import MenuList from './navbar/MenuList'
import logo from '@/assets/header_logo.png'
import { MoveRight, XCircle } from 'lucide-react'
import {quickContacts, Location} from '@/data/site'
import { RiMenu5Fill } from "react-icons/ri";
import { useBreakPoints } from '../utils/Responsive'
import { Link } from 'react-router-dom'
import {navItems} from '../data/navItems'
import { MdClose } from 'react-icons/md'



export default function PublicNavbar() {
  const [display, setDisplay] = useState(true)
  const [isFixed, setFixed] = useState(false)
  const navbarRef = useRef(null)
  const {isMd, isLg} = useBreakPoints()
  const [menuDisplay, setMenuDisplay] = useState(false)

  useEffect(()=>{
    const handeScroll = () =>{window.scrollY > 0 ? setFixed(true) : setFixed(false)}

    window.addEventListener('scroll', handeScroll)

    return ()=> window.removeEventListener('scroll', handeScroll)
  },[])

  return (
    <div className={`${isFixed ? 'fixed top-0 z-50' : 'relative'} w-screen z-30
      bg-white transition-all duration-300`}>
      <div className={`${isFixed ? 'fixed top-0 z-50 shadow-lg' : 'relative'} w-screen 
      overflow-y-visible z-30
      bg-white transition-all duration-300`}>
        {isMd && display && 
          <div className='bg-(--lightBlue) px-8'>
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
              <div className='hidden md:inline-flex gap-8 items-center'>
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
        <div ref={navbarRef} className={`container flex justify-between items-center px-4`}>
            <Link to={'/'} className='flex items-center'>
              <img src={logo} alt="logo" className='size-20'/>
              <div>
                <h1 className='text-lg tracking-wider leading-6 font-serif'>SHIKSHADEEP <br/>
                <span className='text-sm text-black/60 font-medium'>Academy</span>
                </h1>
              </div>
            </Link>
            {isLg ?
            <div>
              <MenuList/>
            </div>
            :
            <div>
              {!menuDisplay?
              <RiMenu5Fill className='size-6'
              onClick={()=>setMenuDisplay((p)=>!p)}/>
              :
              <MdClose className='size-6 text-red-800 hover:text-red-600'
              onClick={()=>setMenuDisplay((p)=>!p)}/>}
              </div>
            }
        </div>
      </div>
      {!isLg &&
      <div className={`absolute z-20 h-auto w-screen
      transition-all duration-300 shadow-xl 
      ${!menuDisplay ? 'opacity-0 -top-1000' : 'opacity-100  top-20'}`}>
        <div className={`bg-(--blueDark)/60 backdrop-blur-xl h-screen w-full absolute z-0
          ${!menuDisplay ? 'opacity-0' : 'opacity-100'} `}/>
        <div className='py-8 relative px-4 md:px-12 z-20 bg-white space-y-4 w-full'>
          {navItems.map((item, index)=>(
            <Link to={item.to} key={index} 
            onClick={()=>setMenuDisplay(false)}
            className="group font-medium flex gap-2 items-center 
            text-sm! md:text-lg!
            hover:bg-(--offWhiteBackground) py-2 hover:px-4 rounded-lg transition-all duration-300">
              <span>{item.label}</span>
              <MoveRight className='scale-0 -translate-x-1 group-hover:scale-100 
              group-hover:translate-x-0
              origin-left transition-all 
              duration-300'/>
            </Link>
          ))}
        </div>
        </div>
        }
    </div>
  )
}
