import React from 'react'
import { Summary } from '../../../data/site'

export default function SummuryBelt() {
  return (
    <div>
      <div className='container py-8 lg:pb-8 lg:flex grid gap-4 lg:gap-16 items-center justify-center'>
        {Summary.map((item, index)=>(
            <div key={index} className='border group rounded-lg w-60 p-4 flex flex-wrap flex-col items-center gap-2
            shadow transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer
            hover:scale-98'>
                <span className='font-serif text-4xl group-hover:scale-120 transition-all'>
                    <span className='font-bold'>{item.value}</span>
                    <span className='text-lg align-top text-(--secondaryText)'>+</span>
                </span>
                <span className='text-(--secondaryText)'>{item.label}</span>
            </div>
        ))}
      </div>
    </div>

  )
}
