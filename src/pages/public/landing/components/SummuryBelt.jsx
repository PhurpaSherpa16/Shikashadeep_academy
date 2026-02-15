import React from 'react'
import { Summary } from '../../../../data/site'

export default function SummuryBelt() {
  return (
    <div>
      <div className='container py-8 lg:pb-8 md:flex 
      grid grid-cols-2 gap-4 lg:gap-16 items-center justify-center px-4 md:px-0'>
        {Summary.map((item, index)=>(
            <div key={index} className='border group rounded-lg md:w-60 p-4 h-30 flex flex-col items-center gap-2
            shadow transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer
            hover:scale-98'>
                <span className='font-serif text-4xl group-hover:scale-120 transition-all'>
                    <span className='font-bold'>{item.value}</span>
                    <span className='text-lg align-top text-(--secondaryText)'>+</span>
                </span>
                <p className='text-center'>{item.label}</p>
            </div>
        ))}
      </div>
    </div>

  )
}
