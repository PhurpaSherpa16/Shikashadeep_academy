import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Tag from './Tag'
import { useState } from 'react';
import ImageCard from '@/components/ImageCard';
import { Link } from 'react-router-dom';
import { useGetAllItemsWithCache } from '../../../../api/getAllItemsWithCache';
import ImageViewer from '../../../../components/gallery/ImageViewer';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import NoItemsForPublic from '../../../../components/NoItemsForPublic';

export default function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(null)
    const {data, isLoading, error} = useGetAllItemsWithCache('gallery/images',1)
    const latestPhotos = data?.data?.images

  return (
    <div className='pt-8'>
      <div className='container pb-8 lg:py-8 2xl:py-16'>
        <div className='space-y-12 px-4 min-h-120'>
            <div className='space-y-4 grid place-items-center lg:place-items-start'>
                <Tag label={'Gallery'}/>
                <div>
                    <h1 className='text-center md:text-left font-serif'>
                    Moments That Shape <span className='text-(--blueDark)'>Young</span> Minds
                    </h1>
                    <p className='text-center md:text-justify md:w-lg lg:w-xl'>A glimpse into daily learning, celebrations, and experiences that help students grow with confidence and happiness.</p>
                </div>
            </div>
            {isLoading && (
                <div className='flex flex-col gap-8 container px-4 py-32'>
                    <Loading text={'Loading Images'}/>
                </div>
            )}
            {error && (
                <div className='container px-4 w-fit py-32'>
                    <Error text={'Error Loading Images, Please Wait'}/>
                </div>
            )}
            {!isLoading && !error && latestPhotos?.length === 0 && (
                    <div className='container px-4 grid place-items-center py-32'>
                        <NoItemsForPublic message="No Images Available" link={'/'} linkText="Refresh"/>
                    </div>
                )
            }
            {!isLoading && !error && latestPhotos?.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestPhotos?.map((item, index)=>(
                        <ImageCard key={index} item={item} handleOpenViewer={()=>setCurrentIndex(index)}/>
                    ))}
                </div>
            )}

            {currentIndex !== null && (
                <ImageViewer images={{ images: latestPhotos }} onClose={() => setCurrentIndex(null)} index={currentIndex}/>
            )}

            {!isLoading && !error && latestPhotos?.length > 0 && latestPhotos && (
            <div className='flex items-center justify-center py-4 lg:py-8'>
                <Button className="group bg-(--blueDark)
                        px-12! cursor-pointer shadow-md hover:shadow-lg 
                        transition-all flex items-center gap-2 py-3 rounded-full">
                    <Link to="/gallery" className='flex items-center gap-2'>
                        View All Images
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </Link>
                </Button>
            </div>
            )}
        </div>
      </div>
    </div>
  )
}