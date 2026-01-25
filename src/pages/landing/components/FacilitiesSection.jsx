import React from 'react'
import Tag from './Tag'
import { FacilitiesContentHeroText, FacilitiesContentForCard } from '../../../data/site'
import HeroImage from '../../../assets/facilities_hero_image.jpg'

export default function FacilitiesSection() {
    return (
        <div className='bg-(--offWhiteBackground) relative'>
            <div className='container py-16 lg:py-24 grid grid-cols-12 px-4 lg:px-0 gap-8 lg:gap-12'>
                <div className='hidden lg:flex col-span-6 h-60 lg:h-full relative overflow-hidden w-fit group rounded-lg'>
                    <img src={HeroImage} alt="Hero image"
                        className='relative h-full w-lg 2xl:w-xl object-center object-cover border shadow-2xl shadow-black/60
            group-hover:scale-103 transition-all duration-300'/>
                    <div className='h-full w-full bg-(--blueDark)/10 absolute inset-0 group-hover:hidden transition-all' />
                </div>
                <div className='col-span-12 lg:col-span-6 space-y-8 lg:space-y-16 2xl:space-y-24'>
                    <div className='space-y-4 grid place-items-center lg:place-items-start'>
                        <Tag label={'facilities'} />
                        <div className='space-y-2'>
                            <h1 className='text-center lg:text-left font-serif'>
                                {FacilitiesContentHeroText.before}
                                <span className='text-(--blueDark)'> {FacilitiesContentHeroText.highlight} </span>
                                {FacilitiesContentHeroText.after}
                            </h1>
                            <p className='w-full text-center xl:w-lg lg:text-justify'>
                                {FacilitiesContentHeroText.description}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-8 2xl:gap-12'>
                        {FacilitiesContentForCard.map((item, index) => (
                            <div key={index} className='space-y-4
                    grid place-items-center lg:place-items-start'>
                                <item.icon className='size-8' />
                                <div className='grid place-items-center lg:place-items-start'>
                                    <span className='font-bold'>{item.label}</span>
                                    <p className='text-center lg:text-justify'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
