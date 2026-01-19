import React from 'react'
import {BlueBeltContent} from '@/data/site'

export default function BlueBelt() {
  return (
    <div className='py-8 bg-(--blueDark)'>
      <div className='container grid place-items-center space-y-2 px-4 lg:lg-0'>
        <h1 className='text-white'>{BlueBeltContent.label}</h1>
        <p className='text-(--secondaryTextWhite) lg:w-lg text-center'>{BlueBeltContent.description}</p>
      </div>
    </div>
  )
}
