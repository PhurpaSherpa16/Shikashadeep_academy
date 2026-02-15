import Tag from './Tag'
import { testimonials } from '../../../../data/site'
import {Download, MoveRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBreakPoints } from '../../../../utils/Responsive'
import { IoIosStar } from "react-icons/io";


export default function TestonomialSection() {

    const {isLg} = useBreakPoints()

  return (
    <div className='bg-(--offWhiteBackground)'>
        <div className='container py-16 lg:pb-24 px-4'>
            <div className='space-y-8'>
                <div className='space-y-4 grid place-items-center'>
                    <Tag label={'Testimonials'}/>
                    <div>
                        <h1 className='text-center'>What Our Alumni Say?</h1>
                        <p className='w-full md:w-2xl text-center'>We are proud of our students and their achievements. Here are some of their experiences and thoughts about learning at Shikshadeep Academy, where education meets encouragement and growth.</p>
                    </div>
                </div>
                <div className='grid place-items-center md:grid-cols-2 lg:flex gap-8 pt-8'>
                    {testimonials.map((item, index)=>(
                        <div key={index} className={`group h-80 md:h-90 w-full lg:w-lg relative overflow-hidden
                            border shadow hover:shadow-xl hover:shadow-black/30 transition-all hover:scale-103
                        rounded-lg ${isLg && (index+1)%2 === 0 ? '-translate-y-4 rotate-4' : 'translate-y-0'}`}>
                            <img src={item.image} alt="image" className='h-full w-full object-top object-cover'/>
                            <div className='flex flex-col justify-between bg-(--blueDark)/10 
                                group-hover:bg-(--blueDark) transition-all duration-300
                                backdrop-blur-2xl
                                h-35 md:h-40  lg:h-44 absolute bottom-0 p-4'>
                                <div className='relative'>
                                    <Quote className='size-4 rotate-180 text-white/60 group-hover:text-white absolute'/>
                                    <p className='text-white/60 indent-6 text-justify group-hover:text-white'>
                                    {item.message}
                                    </p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-white'>{item.name} <br /> {item.class}</p>
                                    <div className='flex gap-2'>
                                        {Array.from({length : 5}, (_, i) =>(
                                            <IoIosStar kernelMatrix={i} key={i}
                                            className={`size-4 ${i < item.rating ? "text-yellow-300" : "text-white/60"}`}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                    
            <div className='grid place-items-center pt-16 lg:pt-24'>
                <div className='grid place-items-center space-y-8 border w-fit p-8 
                shadow
                rounded-lg bg-(--lightBlue)'>
                    <div className='space-y-2'>
                        <h1 className='text-center'>Ready to Get Started?</h1>
                        <p className='text-center'>Schedule a campus visit or download our prospectus to learn more about admission requirements</p>
                    </div>
                    <div className='grid md:flex gap-4 lg:gap-8'>
                        <Button className="group bg-(--blueDark)
                            px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                            Schedule School Visit
                            <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                        </Button>
                        <Button variant='outline' className="group
                            px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                            Download Prospectus
                            <Download className="transition-transform duration-300 group-hover:scale-90 origin-center" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
