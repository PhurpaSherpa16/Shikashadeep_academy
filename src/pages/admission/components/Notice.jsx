import { admissionData } from "../../../data/admission"
import { Calendar, FileText } from "lucide-react"
import { CircleCheck } from "lucide-react"
import exam from "../../../assets/exam.webp"


export default function Notice() {
    return (
        <div id='notice' className='bg-(--offWhiteBackground) relative overflow-hidden scroll-mt-50'>
            <div className='relative z-20 container py-16 px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 w-fit gap-8 lg:gap-16'>
                <div className='bg-white h-full lg:w-lg p-8 lg:p-16 border shadow rounded-lg space-y-6 lg:space-y-8
            group'>
                    <h2 className='text-xl font-medium flex items-center gap-2 font-serif'>
                        <div className='bg-(--lightBlue) group-hover:bg-(--blueDark)/20 p-2 rounded text-(--blueDark)'>
                            <FileText />
                        </div>
                        Required Document
                    </h2>
                    <div className='space-y-4'>
                        {admissionData.document_required.map((document, index) => (
                            <p key={index} className='flex items-center gap-4 hover:bg-(--lightBlue) py-2 px-2 rounded'>
                                <CircleCheck className='size-4 text-white bg-(--blueDark) rounded-full' />{document}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='bg-white group h-full lg:w-lg p-8 lg:p-16 border shadow rounded-lg space-y-6 lg:space-y-8'>
                    <h2 className='text-xl font-medium flex items-center gap-2 font-serif'>
                        <div className='bg-(--lightBlue) group-hover:bg-(--blueDark)/20 p-2 rounded text-(--blueDark)'>
                            <Calendar />
                        </div>
                        Important Dates
                    </h2>
                    <div className='space-y-4'>
                        {admissionData.important_date.map((date, index) => (
                            <div key={index} className='border-l-4 border-(--blueDark) pl-4 hover:bg-(--lightBlue)'>
                                <h2 className='font-medium'>{date.label}</h2>
                                <p>{date.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='h-full w-full absolute inset-0'>
                <div className='h-full w-full bg-(--blueDark)/20 backdrop-blur absolute inset-0 z-10' />
                <img src={exam} alt="exam background" className='h-full w-full object-center object-cover' />
            </div>
        </div>
    )
}