import { MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Card({schoolData}) {
  return (
    <div className='w-full bg-white md:w-xl h-full border p-4 lg:p-8 rounded-lg shadow custom_hover_effect'>
      <div className='grid gap-4 h-full'>
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 lg:col-span-6'>
                <h2 className='font-bold'>{schoolData.label}</h2>
                <p className='text-justify'>{schoolData.description.split(' ').slice(0,16).join(' ')}...</p>
            </div>
            <div className='col-span-12 lg:col-span-6 grid place-items-center'>
                <img src={schoolData.image} alt='image' className='h-40 w-full object-center object-cover lg:size-40 rounded-sm' />
            </div>
        </div>
        <div>
            <Link to={schoolData.href} className="group flex items-center gap-2"
            onClick={()=>{window.scrollTo(0, 0)}}>
                Read More
                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
            </Link>
        </div>
      </div>
    </div>
  )
}
