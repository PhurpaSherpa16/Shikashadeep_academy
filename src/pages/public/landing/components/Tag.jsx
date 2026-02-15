import React from 'react'

export default function Tag({label}) {
  return (
    <div className='bg-(--lightBlue) w-fit px-8 py-1 rounded-full text-(--blueDark) 
    uppercase text-xs font-medium border border-white/80'>
        <span>{label}</span>
    </div>
  )
}
