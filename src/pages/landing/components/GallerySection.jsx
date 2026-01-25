import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import { gallery } from '../../../data/gallery'
import Tag from './Tag'
import { useState } from 'react';
import ImageViewer from '../../../components/ImageViewer';
import ImageCard from '../../../components/ImageCard';
import { Link } from 'react-router-dom';

export default function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(null)
    const latestPhotos = [...gallery].sort((a,b)=>new Date(b.date) - new Date(a.date)).slice(0,6)
    const selectedImage = currentIndex !== null ? latestPhotos[currentIndex].image : null

  return (
    <div className='pt-8'>
      <div className='container pb-8 lg:py-8 2xl:py-16'>
        <div className='space-y-12 px-4'>
            <div className='space-y-4 grid place-items-center lg:place-items-start'>
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
                    <ImageCard key={index} item={item} handleOpenViewer={()=>setCurrentIndex(index)}/>
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
                    <Link to="/gallery#q=all" className='flex items-center gap-2'>
                        View All Images
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}