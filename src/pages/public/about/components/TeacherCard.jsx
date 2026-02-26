import React from 'react'
import { Quote } from 'lucide-react'
import { SlBadge } from 'react-icons/sl'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { capitalize } from '../../../../utils/captalize'

export default function TeacherCard({teacher}) {
  return (
    <div className='group relative p-4 border rounded-lg px-8 grid place-items-center overflow-hidden
    hover:shadow-xl transition-all hover:-translate-y-2'>
        <div className=' grid place-items-center'>
            <div className='h-fit w-fit overflow-hidden rounded-full'>
                <img src={teacher.image_url} alt="image" 
                className='size-24 object-center object-cover' />
            </div>
            <div>
                <h2 className='text-center font-bold'>{capitalize(teacher.name)}</h2>
                <p className='text-center'>{capitalize(teacher.designation)}</p>
                <p className='text-center flex items-center gap-1 justify-center'>
                    <SlBadge className='text-yellow-800'/>
                    <span>
                        <span>{teacher.experience}</span>
                        <span className='text-xs align-top'>+</span> years
                    </span>
                </p>
            </div>
        </div>

        {/* hover card */}
        <div className='bg-blue-dark space-y-2 h-full w-full absolute z-10 p-8 text-justify
        opacity-0 backdrop-blur-xl group-hover:opacity-100 transition-all grid place-items-center'>
            <div className='relative flex'>
                <Quote className='text-white size-4 absolute rotate-180'/>
                <p className='text-white indent-6 italic'>
                    {teacher.quotes.charAt(0).toUpperCase() + teacher.quotes.slice(1)}
                </p>
            </div>
            <div className='w-full'>
                <p className='text-right font-bold text-white w-full'>-{capitalize(teacher.name)}</p>
                <div className='flex justify-end w-full'>
                    <Avatar>
                        <AvatarImage src={teacher.image_url} alt="image" className="grayscale object-center object-cover"/>
                        <AvatarFallback>{teacher.name.slice(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    </div>
  )
}
