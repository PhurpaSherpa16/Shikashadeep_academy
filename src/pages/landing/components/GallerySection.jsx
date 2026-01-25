import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { gallery } from '../../../data/gallery'
import Tag from './Tag'
import { useState } from 'react';
import ImageViewer from '../../../components/ImageViewer';

export default function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(null)
    const latestPhotos = [...gallery].sort((a,b)=>new Date(b.date) - new Date(a.date)).slice(0,6)
    const selectedImage = currentIndex !== null ? latestPhotos[currentIndex].image : null

  return (
    <div className='pt-8'>
      <div className='container pb-8 lg:py-8 2xl:py-16'>
        <div className='space-y-12 px-4'>
            <div className='space-y-4'>
                <Tag label={'Gallery'}/>
                <div>
                    <h1 className='text-center md:text-left font-serif'>
                    Moments That Shape <span className='text-(--blueDark)'>Young</span> Minds
                    </h1>
                    <p className='text-center md:text-justify md:w-lg lg:w-xl'>A glimpse into daily learning, celebrations, and experiences that help students grow with confidence and happiness.</p>
                </div>
            </div>            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestPhotos.map((item, index)=>(
                    <div key={index} className='text-left'
                    onClick={()=>setCurrentIndex(index)}
                    >
                        <div className="relative group bg-white/80 aspect-4/3 overflow-hidden rounded-lg">
                            <img src={item.image} alt="image" className='h-full w-full object-top object-cover 
                            group-hover:scale-103 transition-all duration-300'/>
                            <div className="absolute inset-0 bg-[#1800ad]/10 group-hover:bg-transparent" />
                            <div className='absolute w-full bottom-0 bg-linear-to-t  from-black/80
                                via-black/40 transition-all duration-300
                             to-transparent p-4'>
                                <h2 className='text-white font-medium'>{item.label}</h2>
                                <p className='text-white/60 font-medium text-sm'>{item.caption}</p>
                                <div className='flex gap-1'>
                                    {item.tag.map((t, i)=>(
                                    <button key={i} className='text-blue-100/60 text-sm
                                    hover:text-white'>#{t}</button>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

            <ImageViewer src={selectedImage} onClose={()=>setCurrentIndex(null)}
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
                gallery={latestPhotos}/>

            <div className='flex items-center justify-center py-4 lg:py-8'>
                <Button className="group bg-(--blueDark)
                        px-12! cursor-pointer shadow-md hover:shadow-lg 
                        transition-all flex items-center gap-2 py-3 rounded-full">
                    View All Images
                    <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}