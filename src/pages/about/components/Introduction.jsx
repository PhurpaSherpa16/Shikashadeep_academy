import {school_data} from '../../../data/about'


export default function Introduction() {
  return (
    <div className='grid place-items-center'>
        <div className='custom_paddings space-y-16'>
            <div className='space-y-8'>
            <h1 className='font-serif'>
            Shikshadeep Academy  
            </h1>
            {school_data.school_introduction.map((intro, index)=>(
                <p key={index} className='indent-8 text-justify'>
                    {intro}
                </p>
            ))}
        </div>
        <div className='grid lg:flex overflow-hidden items-center gap-8'>
            <p className='text-justify border-l-4 border-(--blueDark) pl-2
            lg:text-xl font-light italic text-gray-800 order-2 lg:order-1'>{school_data.history}</p>
            <img src={school_data.school_image} alt="school image"
            className='w-full lg:size-60 object-center object-cover rounded border shadow order-1 lg:order-2'/>
        </div>
    </div>
    </div>
  )
}
