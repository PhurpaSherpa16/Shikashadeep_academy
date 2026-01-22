import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Download, Mail, MoveRight } from 'lucide-react'


export default function StayUpdated() {
  return (
    <div className=''>
      <div className='container py-16 px-4 lg:pb-24'>
        <div className='flex flex-col md:flex-row items-center gap-4 lg:gap-36 justify-between'>
            <div className='w-full'>
                <h1 className='text-center lg:text-left font-serif'>Stay Updated</h1>
                <p className='text-center lg:text-left'>Subscribe to our newsletter for latest updates.</p>
            </div>
            <div className='flex gap-4 flex-col md:flex-row  justify-center'>
                <div className='w-xs lg:w-sm relative flex items-center '>
                    <Input type="email" placeholder="Email" className='group pl-8 w-full'/>
                    <Mail className='absolute size-4 left-2 text-(--secondaryText) group-focus:text-red-600'/>
                </div>
                <Button className="group bg-(--blueDark)
                    px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                    transition-all flex items-center gap-2 py-3 rounded-full">
                    Subscribe
                    <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
