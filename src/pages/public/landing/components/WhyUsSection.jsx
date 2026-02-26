import React from 'react'
import Tag from './Tag'
import { whyChooseUs } from '@/data/site'

export default function WhyUsSection() {
  return (
    <div className='bg-(--offWhiteBackground)'>
      <div className='container py-16 lg:py-24 grid place-items-center space-y-12'>
        <div className='grid place-items-center space-y-4'>
          <Tag label={'Why choose us?'} />
          <div className='space-y-2 grid place-items-center'>
            <h1 className='text-center lg:w-xl font-serif'>What Makes <span className='text-(--blueDark)'>Shikshadeep</span> Special?</h1>
            <p className='text-center'>We go beyond academics to provide a complete educational experience.</p>
          </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-16'>
          {whyChooseUs.map((item, index) => (
            <div key={index} className='group grid place-items-center gap-8 border 
                py-6 px-8 rounded-lg shadow transition-all cursor-pointer bg-white
                hover:-translate-y-1 hover:shadow-xl duration-300 hover:scale-98'>
              <div className='p-3 bg-(--lightBlue)/30 w-fit rounded group-hover:bg-(--blueDark) group-hover:transition-all duration-300
                    group-hover:scale-120'>
                <item.icon className='size-6 text-(--blueDark) 
                        group-hover:text-white 
                        group-hover:transition-all group-hover:scale-120 duration-300'/>
              </div>
              <div className='lg:h-20'>
                <h2 className='text-center'>{item.label}</h2>
                <p className='text-center w-50'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
