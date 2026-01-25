import { admissionData } from "../../../data/admission"
import { Button } from "@/components/ui/button"
import { MoveRight } from "lucide-react"
import { Download } from "lucide-react"

export default function AdmissionProcedure() {
    return (
        <div id='admission' className='container px-4 lg:px-0 pb-16'>
                <div className='grid place-items-center py-8 pt-16'>
                    <div className='grid place-items-center space-y-2'>
                        <h1 className='font-serif'>{admissionData.label}</h1>
                        <p className='w-full lg:w-sm text-center'>{admissionData.description}</p>
                    </div>
                </div>
                <div className='grid place-items-center md:grid-cols-2 
            lg:grid-cols-4 gap-4 pb-8 md:py-8 lg:gap-8'>
                    {admissionData.process.map((item, index) => (
                        <div key={index} className=' relative border p-8 rounded-lg space-y-2
                    bg-white group shadow
                    hover:bg-(--blueDark) hover:text-white hover:shadow-xl
                    hover:-translate-y-1 transition-all duration-300
                    '>
                            <h2 className='text-center lg:text-xl font-bold lg:font-medium'>{item.label}</h2>
                            <p className='text-center
                        group-hover:text-white/60'>{item.description}</p>
                            <span className='absolute -bottom-4 -left-4
                        text-xl text-white rounded-full size-10
                        flex items-center justify-center
                        font-serif font-bold
                        group-hover:text-(--blueDark) group-hover:bg-(--offWhiteBackground)
                        border-2 border-white
                        bg-(--blueDark) '>{index + 1}
                            </span>
                        </div>
                    ))}
                </div>

                <div className='grid place-items-center md:py-8'>
                    {/* Application */}
                    <div className='flex gap-4 w-fit'>
                        <Button
                            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group bg-(--blueDark) lg:w-fit
                            px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                            Fill Application
                            <MoveRight className="transition-transform duration-300 group-hover:rotate-45 origin-center" />
                        </Button>
                        <Button variant='outline' className="group lg:w-fit
                        px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                        transition-all flex items-center gap-2 py-3 rounded-full">
                            Download Prospectus
                            <Download className="transition-transform duration-300 group-hover:scale-90 origin-center" />
                        </Button>
                    </div>
                </div>
            </div>
    )
}