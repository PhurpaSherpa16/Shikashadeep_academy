import { ArrowRight, CheckCircle2, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPageCard({program, index}) {
    return (
        <div className={`${index % 2 !== 0 ? 'bg-(--offWhiteBackground) py-12' : ''}`}>
            <div className={`container px-4 flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className='col-span-12 md:col-span-6 space-y-4 lg:space-y-8 grid place-items-center md:place-items-start'>
                    <div className="flex flex-col items-center md:items-start w-full">
                        <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{program.grade}</h2>
                        <div className="flex items-center justify-between lg:w-full gap-2">
                            <h2 className='text-2xl font-serif font-bold text-center md:text-left'>{program.title}</h2>
                            <span className="hidden md:block text-xs font-mono text-gray-300 font-black">0{program.displayOrder}</span>
                        </div>
                    </div>
                    <div className='grid gap-2 md:gap-4'>
                        <p className='text-center md:text-justify'>{program.description}</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                            {program?.features?.map((feature, i) => (
                                <div key={i} className="flex items-center gap-1.5 bg-white/80 py-1 px-2.5 rounded-lg shadow-sm border border-gray-100">
                                    <CheckCircle2 className="text-green-500 size-3.5" />
                                    <span className="text-[10px] font-bold text-gray-600">{feature.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-4">
                        <button className="flex items-center gap-2 text-blue-dark font-bold group hover:underline underline-offset-4 transition-all">
                            <Link to={`/contact#${program.title}`} className="flex items-center gap-2">
                                Inquire About This Program
                                <MoveRight className="size-4 group-hover:-rotate-45 transition-transform" />
                            </Link>
                        </button>
                    </div>
                </div>
                <div className='relative col-span-12 md:col-span-6 h-60 lg:h-120 2xl:h-140 w-full group overflow-hidden rounded-lg'>
                    <img src={program.image_url} alt={program.title} className='h-full w-full object-bottom 
                    object-cover group-hover:scale-103 transition-all 
                    relative duration-300'/>
                    <div className='h-full w-full bg-(--blueDark)/10 absolute inset-0 group-hover:hidden transition-all duration-300' />
                </div>
            </div>
        </div>
    )
}