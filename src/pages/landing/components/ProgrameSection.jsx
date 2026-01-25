import { Button } from '@/components/ui/button'
import { programme } from '@/data/site'
import Tag from './Tag'
import { MoveRight } from 'lucide-react'
import Wave from "@/assets/wave2.svg"

export default function ProgrameSection() {
    return (
        <div className='relative'>
            <div className='container py-12 lg:py-24 2xl:py-32 relative'>
                <div className='space-y-12 lg:space-y-8 px-4 relative'>
                    <div className='space-y-12'>
                        {
                            programme.map((item, index) => (
                                <div key={index} className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className='col-span-12 md:col-span-6 space-y-4 lg:space-y-8 grid place-items-center lg:place-items-start'>
                                        <Tag label={`Programme 0${index + 1}`} />
                                        <div className='grid gap-2 lg:gap-4'>
                                            <span className='font-medium text-center lg:text-left'>{item.label}</span>
                                            <p className='text-center lg:text-justify'>{item.description}</p>
                                        </div>
                                    </div>
                                    <div className='relative col-span-12 md:col-span-6 h-80 2xl:h-100 w-full group overflow-hidden rounded-lg'>
                                        <img src={item.image} alt={item.label} className='h-full w-full object-top 
                            object-cover group-hover:scale-103 transition-all relative duration-300'/>
                                        <div className='h-full w-full bg-(--blueDark)/10 absolute inset-0 group-hover:hidden transition-all duration-300' />
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className='flex items-center justify-center py-4 lg:py-8'>
                        <Button className="group bg-(--blueDark)
                        px-12! cursor-pointer shadow-md hover:shadow-lg 
                        transition-all flex items-center gap-2 py-3 rounded-full">
                            View All Program
                            <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                        </Button>
                    </div>
                </div>
            </div>
            <img src={Wave} alt="background" className="absolute w-full -bottom-1 lg:-bottom-5 z-10 rotate-180" />
        </div>
    )
}
