import React from 'react'
import background from "@/assets/principalBackground.svg"
import principal from "@/assets/principal.png"
import { principalWords } from '../../../data/site'


export default function PrincipleWordSection() {
  return (
    <div className='pt-8'>
        <div className='container px-4 lg:px-0 py-8 grid place-items-center'>
            <div className='hidden lg:grid place-items-center relative'>
                <div className='grid place-items-center relative w-fit rounded-2x overflow-hidden'>
                    <div className='relative h-fit'>
                        <h2 className='absolute top-8 font-medium left-4'>From the Principal's Desk</h2>
                        <img src={background} alt="background" className='relative w-full'/>
                    </div>
                    <div className='absolute bottom-0 right-2'>
                        <div className='col-span-6 relative z-10'>
                            <img src={principal} alt="principal image"  className='lg:h-70 w-full object-top object-cover'/>
                        </div>
                        <div className='absolute bg-blue-400 size-40 rounded-full bottom-0 right-24 right
                        blur-3xl'/>
                        <div className='absolute bg-green-500 size-46 rounded-full bottom-0 right-24 right
                        blur-2xl'/>
                        <div className='absolute bg-white/60 size-52 rounded-full bottom-0 right-24 right
                        blur-3xl'/>
                    </div>
                    <div className='absolute bottom-10 left-4 w-2xl'>
                        <div>
                            <div>
                                <p className='text-white font-serif italic'>{principalWords.itroduction}</p>
                                <p className='text-white font-serif italic'>{principalWords.description}</p>
                            </div>
                            <div>
                                <p className='text-right text-white font-serif'>— Principal, Shikshadeep Academy</p>
                                <p className='text-right text-white font-serif'>{principalWords.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:hidden md:w-lg bg-(--blueDark) p-2 pb-0 rounded-lg'>
                <div className='px-2'>
                    <div>
                        <div>
                            <p className='text-white text-justify'>{principalWords.itroduction}</p>
                            <p className='text-white text-justify'>{principalWords.description}</p>
                        </div>
                        <div>
                            <p className='text-right text-white'>— Principal, Shikshadeep Academy</p>
                            <p className='text-right text-white font-medium'>{principalWords.name}</p>
                        </div>
                    </div>
                </div>
                <div className='grid place-items-center'>
                    <img src={principal} alt="principal image"  className=' md:size-80 object-top object-cover'/>
                </div>
            </div>
        </div>
    </div>
  )
}
