import { Quote } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

import { useGetAllItemsWithCache } from '../../../../api/getAllItemsWithCache'
import { capitalize } from '../../../../utils/captalize'

export default function BoardMembers() {

  const {data, isLoading, isError} = useGetAllItemsWithCache('school/advisory')
  const boardMembers = data?.data
  console.log(boardMembers)

  return (
    <div className='grid place-items-center'>
      <div className="custom_paddings space-y-16 w-full">
        <div className='space-y-8'>
          <h1 className='font-serif text-center text-(--blueDark)'>Advisory Members</h1>
          <p className='text-justify'>Shikshadeep Academy's advisory members provide strategic guidance, uphold our mission, and ensure the highest standards in education and student development.</p>
        </div>
        <div className='flex flex-col gap-8 w-full'>
          {
            boardMembers?.map((member, index) => (
              <div key={index} className='space-y-8 w-full'>
                <div className={`grid w-full place-items-center lg:flex items-center gap-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`border-(--blueDark) py-4 order-2 lg:order-1
                  ${index % 2 !== 0 ? 'border-r-4 pr-2' : 'border-l-4 pl-2'}`}>
                    <div className='relative'>
                      <Quote className='rotate-180 size-12 absolute -left-2 -top-4 text-black/10' />
                      <p className='text-gray-800 flex relative text-justify md:text-left'>
                        {member.quotes.charAt(0).toUpperCase() + member.quotes.slice(1)}</p>
                    </div>
                    <h2 className='text-right font-bold'>-{capitalize(member.name)}</h2>
                  </div>
                  <img src={member.image_url} alt={member.name} className='size-50 object-center object-cover rounded-lg order-1 lg:order-2' />
                </div>
                {index !== boardMembers.length - 1 && <Separator />}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
