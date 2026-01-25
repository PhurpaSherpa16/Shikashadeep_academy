import {faculty_data} from '../../../data/about'
import TeacherCard from './TeacherCard'
import { Separator } from "@/components/ui/separator"

export default function Faculty() {

  const tags = [...new Set(faculty_data.teachers.map((item) => item.tag))]
  
  console.log(tags)

  if(!faculty_data) return <p>Data not available.</p>
  return (
     <div className='grid place-items-center'>   
      <div className="custom_paddings space-y-16">
        <div className='space-y-2'>
          <h1 className='font-serif'>{faculty_data.label}</h1>
          <p className='text-justify'>{faculty_data.description}</p>
        </div>
        <div className='grid gap-8'>
          {
            tags.map((tag, index) =>(
              <div ket={index} className='space-y-4 grid'>
                  {/* Heading */}
                  <h2 className='font-serif font-bold'>
                    {faculty_data.tagTitles[tag]}
                  </h2>
                  <div className='grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4'>
                    {faculty_data.teachers.filter(teacher => teacher.tag === tag).map((item, index)=>(
                      <TeacherCard teacher={item} key={index}/> 
                    ))}
                  </div>
                  {index !== tags.length - 1 && <Separator/>}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}