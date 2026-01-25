import { Quote } from 'lucide-react'
import { boardMember } from '../../../data/about'
import { Separator } from "@/components/ui/separator"

export default function BoardMembers() {

  return (
     <div className='grid place-items-center'>   
      <div className="custom_paddings space-y-16">
        <div className='space-y-8'>
          <h1 className='font-serif text-center text-(--blueDark)'>{boardMember.label}</h1>
          <p className='text-justify'>{boardMember.description}</p>
        </div>
        <div className='grid gap-8'>
          {
            boardMember.members.map((member, index) => (
              <div key={index} className='space-y-8'>
                <div className={`grid place-items-center lg:flex items-center gap-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className='border-l-4 pl-2 border-(--blueDark) py-4 order-2 lg:order-1'>
                    <div className='relative'>
                      <Quote className='rotate-180 size-12 absolute -left-2 -top-4 text-black/10' />
                      <p className='text-gray-800 flex relative text-justify md:text-left'>
                        {member.some_words}</p>
                    </div>
                    <h2 className='text-right'>-{member.names}</h2>
                  </div>
                  <img src={member.image} alt={member.names} className='size-50 object-center object-cover rounded-lg order-1 lg:order-2' />
                </div>
                {index !== boardMember.members.length - 1 && <Separator />}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
