import Wave from "@/assets/hero_wave.svg"
import HeroBackground from '@/assets/hero_background.jpg'
import { Button } from '@/components/ui/button'
import { MoveRight, Play } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <div className='relative flex items-center justify-center'>
      <div className='h-120 lg:h-155 2xl:h-195 overflow-hidden relative w-full'>
          <div className='bg-(--blueDark)/80 h-full absolute inset-0 w-full z-10'/>
          <img src={HeroBackground} alt="background" className='relative h-full object-center object-cover w-full'/>
          <img src={Wave} alt="background" className="absolute w-full -bottom-1 lg:-bottom-10 z-10"/>
      </div>

      <div className='container absolute lg:pb-20 z-10 flex items-center justify-center'>
        <div className='space-y-8'>
          <div className='flex flex-col items-center space-y-2'>
            <h1 className='text-white font-serif text-2xl lg:text-4xl tracking-wide'>SHIKSADEEP ACADEMY</h1>
            <div className='text-sm backdrop-blur w-fit px-8 border border-gray-100/30 rounded-full flex items-center justify-center
            text-(--secondaryTextWhite)'>
              <span>• Excellence in Education Since 2063 B.S</span>
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-center lg:text-4xl text-white font-serif italic tracking-wide'>
              “Education is the most powerful weapon to change the world.”
            </p>
            <p className='text-sm text-(--secondaryTextWhite) text-center lg:text-right'>- Nelson Mandela</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className='text-sm lg:text-lg text-center tracking-wide text-white'>Nurturing young minds with knowledge, values, and confidence.</p>
            <div className="grid lg:flex gap-4">
              <Button className="group bg-white text-(--blueDark)
                  hover:text-white hover:bg-(--blueDark) border border-white px-12! cursor-pointer
                  shadow-md hover:shadow-lg transition-all flex items-center gap-2 py-3 rounded-full"
                  asChild>
                  <Link to='/admission'>
                    Admission Open
                    <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                  </Link>
              </Button>
              <Button variant='outline'
              className="backdrop-blur bg-transparent text-white cursor-pointer transition-all rounded-full px-12! hover:text-(--blueDark)">
                <Play/>
                Explore Our School
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
