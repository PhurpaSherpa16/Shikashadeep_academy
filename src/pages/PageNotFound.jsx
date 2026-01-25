import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import Lottie from "lottie-react";
import panda from '../../public/pagenotfound.json'
import '../theme.css'
import { MoveRight } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="relative h-screen w-full  overflow-hidden bg-blue-100/20 grid place-items-center">
      <div className="relative md:bottom-10 z-10 h-fit flex-center">
        <div className="grid place-items-center space-y-8 xl:space-x-8">
          <div className="relative flex items-center justify-center h-40 md:h-60 lg:h-90 w-full">
            <Lottie className='absolute size-90 md:size-120' animationData={panda} loop={true} />
          </div>
          <div className="grid place-items-center gap-4">
            <h1 className="text-2xl lg:text-4xl font-bold">Page Not Found</h1>
            <Button asChild className='rounded-full px-8! group hover:shadow-xl'>
              <Link to="/" className='bg-(--blueDark)!'>
                Return to Home
                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
