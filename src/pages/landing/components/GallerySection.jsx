import g1 from '@/assets/g1.jpg'
import g2 from '@/assets/g2.jpg'
import g3 from '@/assets/g3.jpg'
import g4 from '@/assets/g4.jpg'
import g5 from '@/assets/g5.jpg'
import g6 from '@/assets/g6.jpg'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function GallerySection() {
  return (
    <div className='pt-8'>
      <div className='container pb-8 lg:py-8 2xl:py-16'>
        <div className='space-y-12 px-4'>
            <div className='space-y-4'>
                <h1 className='text-center md:text-left font-serif'>
                    Moments That Shape <span className='text-(--blueDark)'>Young</span> Minds
                </h1>
                <p className='text-center md:text-justify md:w-lg'>A glimpse into daily learning, celebrations, and experiences that help students grow with confidence and happiness.</p>
            </div>            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative group bg-white/80 text-center text-2xl h-60 md:h-100 lg:h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g1} alt="image" className='h-full w-full object-top object-cover group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="relative group bg-white/80 text-center text-2xl lg:col-span-2 row-span-2
                h-60 md:h-100 lg:h-90 2xl:h-110 overflow-hidden rounded-lg">
                    <img src={g2} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10"/>
                </div>

                <div className="bg-white/80 group text-center text-2xl relative lg:col-span-1 md:col-span-2 h-60 md:h-80 lg:h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g3} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>

                <div className="bg-white/80 group text-center text-2xl relative lg:row-span-2 h-60 md:h-100 lg:h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g4} alt="image" className='h-full w-full object-center object-cover 
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="bg-white/80 group text-center text-2xl relative lg:row-span-2 h-60 md:h-100 lg:h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g6} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                
                <div className="bg-white/80 group text-center text-2xl relative lg:col-span-2 md:col-span-2 h-60 md:h-80 lg:h-70 2xl:h-90 overflow-hidden rounded-lg">
                    <img src={g5} alt="image" className='h-full w-full object-top object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
            </div>
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
