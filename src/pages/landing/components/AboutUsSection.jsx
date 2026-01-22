import React, { useRef } from 'react'
import {AboutUsCardData} from '@/data/site'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'
import Tag from './Tag'

export default function AboutUsSection() {

    const slideRef = useRef(null)

    const scrollLeft = () =>{
        slideRef.current.scrollBy({
            left : -300,
            behavior : 'smooth'
        })
    }

    const scrollRight = () =>{
        slideRef.current.scrollBy({
            left : 300,
            behavior : 'smooth'
        })
    }

  return (
    <div className='bg-(--offWhiteBackground) mt-8 relative'>
      <div className='py-8 lg:py-12 2xl:py-16 space-y-12 relative'>
        <div className='container  space-y-4 px-4 lg:px-0
        grid place-items-center lg:place-items-start'>
            {/* tag */}
            <Tag label={'About us'}/>
            <div className='w-full lg:w-5xl 2xl:w-6xl space-y-4 relative'>
                <h1 className='text-center lg:text-left font-serif'>
                    Shikshadeep Academy is dedicated to nurturing young minds 
                    through <span className='text-(--blueDark)'>Quality Education</span>, strong values, and a 
                    supportive learning environment.
                </h1>
                <p className='w-full lg:w-4xl
                text-center lg:text-left'>
                   We believe in building confidence, curiosity, and character in every student, preparing them not only for exams, but for life. Our experienced teachers,
                    modern teaching methods, and focus on overall development help students discover their true potential and grow into responsible, 
                    successful individuals. 
                </p>
            </div>
        </div>
        <div className='relative flex items-center'>
            <div ref={slideRef} className="relative flex gap-8 2xl:gap-16 overflow-y-visible overflow-x-auto w-full
                snap-x snap-mandatory scrollbar-hide items-center 2xl:justify-center py-8"
                style={{ scrollbarWidth: "none" }}>
                {AboutUsCardData.map((item, index)=>(
                    <div key={index} className="shrink-0 group relative
                        border rounded-lg w-xs h-88 sm:w-[20rem] sm:h-96 xl:w-88 
                        xl:h-104 2xl:w-[24rem] 2xl:h-112 
                        text-justify flex items-end overflow-hidden
                        hover:-translate-y-1 hover:shadow-xl transition-all duration-300
                        hover:scale-98">
                        <div className='absolute h-full w-full'>
                            <img src={item.image} alt={item.label} 
                            className='object-center object-cover h-full w-full group-hover:scale-120 
                            transition-all duration-300 rounded-lg'/>
                        </div>
                        <div className='relative bg-linear-to-t
                        from-black/80 via-black/40 to-transparent
                        p-4 pt-32 
                        space-y-4 h-76 flex flex-col justify-between'>
                            <div>
                                <span className='text-white font-bold tracking-wide
                                group-hover:underline'>{item.label}</span>
                                <p className='text-(--secondaryTextWhite)'>{item.description}</p>
                            </div>
                            <Link to={'/'} className='text-white group
                            flex items-center gap-1 cursor-pointer'>
                                Load More 
                                <MoveRight className='transition-transform duration-300 group-hover:-rotate-45 origin-center'/>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='2xl:hidden absolute h-fit z-10 px-8 lg:px-16 flex justify-between w-full'>
                <button className='backdrop-blur border border-gray-200/30 
                rounded-full p-1 flex items-center justify-center
                hover:bg-(--lightBlue) cursor-pointer hover:shadow transition-all'
                onClick={scrollLeft}>
                    <ChevronLeft className='size-10 text-white/60'/>
                </button>
                <button className='backdrop-blur border border-gray-200/30 
                rounded-full p-1 flex items-center justify-center
                hover:bg-(--lightBlue) cursor-pointer hover:shadow transition-all'
                onClick={scrollRight}>
                    <ChevronRight className='size-10 text-white/60'/>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}