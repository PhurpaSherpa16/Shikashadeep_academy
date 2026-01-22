import React from 'react'
import { LatestBLogNews } from '../../../data/site'
import { CalendarDays, MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BlogNewsSection() {
  return (
    <div className='bg-(--offWhiteBackground)'>
        <div className='container grid px-4 lg:px-0 py-16'>
            <div className='grid place-items-center space-y-12'>
                <div className='grid place-items-center'>
                    <h1 className='text-center font-serif'>Blogs & News</h1>
                    <p className='text-center'>Stay updated with school activities, achievements, and important announcements.</p>
                </div>
                <div className='grid place-items-center lg:flex gap-8 2xl:gap-12'>
                    { LatestBLogNews.map((item, index)=>(
                        <div key={index} className='group relative md:w-md lg:w-sm  2xl:w-md border gap-8 h-full rounded-lg overflow-hidden
                        hover:shadow-2xl hover:scale-97 hover:-translate-y-3 transition-all duration-300'>
                            <div className='w-full h-60 lg:h-80 2xl:h-100 relative overflow-hidden'>
                                <img src={item.image} alt='image'
                                className='h-full w-full object-cover object-top relative
                                group-hover:scale-110 transition-all duration-300'/>
                                <div className="absolute inset-0 bg-[#1800ad]/10" />
                                <div className={`absolute inset-0 left-4 top-4 text-sm  backdrop-blur-2xl h-fit w-fit px-4 rounded-full
                                group-hover:scale-120 transition-all duration-300`}
                                style={{backgroundColor:item.color, color: 'white'}}>
                                    <span>{item.tag}</span>
                                </div>
                            </div>
                            <div className='h-56 p-4 flex flex-col justify-between'>
                                <div className='space-y-2'>
                                    <div className='text-(--secondaryText) flex gap-2 text-sm items-center'>
                                        <span className='flex items-center gap-1'>
                                            <CalendarDays className='size-4'/>
                                            {item.date} 
                                        </span>
                                        <span> • </span>
                                        <span>{item.readingTime} min</span>
                                    </div>
                                    <div>
                                        <h2 className='font-medium'>{item.label}</h2>
                                        <p className='text-justify'>{item.description}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className='flex items-center gap-2 group-hover:text-(--secondaryText) 
                                    group-hover:underline transition-all'>
                                        Read more
                                        <MoveRight className='group-hover:-rotate-45 transition-all'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex items-center justify-center py-4 lg:py-8'>
                    <Button className="group bg-(--blueDark)
                            px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                        View All Blogs & News
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}
