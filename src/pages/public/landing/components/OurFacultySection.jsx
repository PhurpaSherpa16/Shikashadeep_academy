import { teachers } from '@/data/site'
import {MoveRight, Quote } from 'lucide-react'
import { SlBadge } from 'react-icons/sl'
import { Button } from '@/components/ui/button'
import Tag from './Tag'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Link } from 'react-router-dom'

export default function OurFacultySection() {
  return (
    <div className='py-16'>
      <div className='container px-4'>
        <div className='grid place-items-center space-y-16 relative'>
            <div className='w-fit relative grid place-items-center space-y-4'>
                <Tag label={'Our Faculty'}/>
                <div className='grid place-items-center'>
                    <h1 className='text-center font-serif w-full md:w-xl'>Dedicated team that help to develop your children</h1>
                    <p className='text-center'>Dedicated and experienced educators committed to nurturing every student's potential</p>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative'>
                {teachers.map((item, index)=>(
                    <div key={index} className='group relative p-4 border rounded-lg px-8 grid place-items-center overflow-hidden
                    hover:shadow-xl transition-all hover:-translate-y-2'>
                        <div className=' grid place-items-center'>
                            <div className='h-fit w-fit overflow-hidden rounded-full'>
                                <img src={item.image} alt="image" 
                                className='size-24 object-center object-cover' />
                            </div>
                            <div>
                                <h2 className='text-center font-bold'>{item.name}</h2>
                                <p className='text-center'>{item.designation}</p>
                                <p className='text-center'>{item.qualification}</p>
                                <p className='text-center flex items-center gap-1 justify-center'>
                                    <SlBadge className='text-yellow-800'/>
                                    <span>
                                        <span>{item.experience}</span>
                                        <span className='text-xs align-top'>+</span> years
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* hover card */}
                        <div className='bg-(--blueDark) space-y-2 h-full w-full absolute z-10 p-8 text-justify
                        opacity-0 group-hover:opacity-100 transition-all grid place-items-center'>
                            <div className='relative flex'>
                                <Quote className='text-white/60 size-4 absolute rotate-180'/>
                                <p className='text-white/60 indent-6'>
                                    {item.quote}{item.quote}
                                </p>
                            </div>
                            <div className='w-full'>
                                <p className='text-right text-white w-full'>-{item.name}</p>
                                <div className='flex justify-end w-full'>
                                    <Avatar>
                                        <AvatarImage src={item.image} alt="image" className="grayscale object-center object-cover"/>
                                        <AvatarFallback>{item.name.split(' ')[1].slice(0,1)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <Button className="group bg-(--blueDark)
                    px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                    transition-all flex items-center gap-2 py-3 rounded-full">
                    <Link to="/about_us#faculty" className="flex items-center gap-2">
                        Join our Team
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
