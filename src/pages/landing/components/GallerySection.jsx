import {images} from '@/data/site'

import g1 from '@/assets/g1.jpg'
import g2 from '@/assets/g2.jpg'
import g3 from '@/assets/g3.jpg'
import g4 from '@/assets/g4.jpg'
import g5 from '@/assets/g5.jpg'
import g6 from '@/assets/g6.jpg'

export default function GallerySection() {
  return (
    <div className='bg-(--offWhiteBackground)'>
      <div className='container py-8 2xl:py-16'>
        <div className='space-y-8'>
            <div className='space-y-4'>
                <h1>
                    Moments That Shape <span className='text-(--blueDark)'>Young</span> Minds
                </h1>
                <p className='w-lg'>A glimpse into daily learning, celebrations, and experiences that help students grow with confidence and happiness.</p>
            </div>            
            <div className="grid grid-cols-4 gap-3">
                <div className="relative group bg-white/80 text-center text-2xl h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g1} alt="image" className='h-full w-full object-top object-cover group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="relative group bg-white/80 text-center text-2xl col-span-2 row-span-2
                h-90 2xl:h-110 overflow-hidden rounded-lg">
                    <img src={g2} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10"/>
                </div>
                <div className="bg-white/80 group text-center text-2xl relative h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g3} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="bg-white/80 group text-center text-2xl relative row-span-2 h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g4} alt="image" className='h-full w-full object-center object-cover 
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="bg-white/80 group text-center text-2xl relative row-span-2 h-80 2xl:h-100 overflow-hidden rounded-lg">
                    <img src={g6} alt="image" className='h-full w-full object-center object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
                <div className="bg-white/80 group text-center text-2xl relative col-span-2 h-70 2xl:h-90 overflow-hidden rounded-lg">
                    <img src={g5} alt="image" className='h-full w-full object-top object-cover
                    group-hover:scale-103 transition-all duration-300'/>
                    <div className="absolute inset-0 bg-[#1800ad]/10" />
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}
