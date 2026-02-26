import Wave from "@/assets/wave2.svg"
import { useGetAllItemsWithCache } from '../../../../api/getAllItemsWithCache'
import LandingPageCard from '../../../../components/program/LandingPageCard'
import LoadingErrorHandle from './LoadingErrorHandle'

export default function ProgrameSection() {
    const {data, isLoading, error} = useGetAllItemsWithCache("programs", 1)
    const programmeData = data?.data?.programs.slice(0,3)
    return (
        <div className='relative 2xl:pb-20'>
            <div className='py-16 lg:py-24 relative'>
                <div className='space-y-12 lg:space-y-8 relative min-h-120'>
                    <LoadingErrorHandle isLoading={isLoading} error={error} data={programmeData} linkLabel="View All Programs" linkPath="/programs"
                    noDataMessage="No Programs Available"
                    renderItem = {
                        <div className='space-y-12'> 
                            {programmeData?.map((item, index) => (
                                    <LandingPageCard actions={false} key={index} program={item} index={index}/>
                            ))}
                        </div>
                    }/>
                </div>
            </div>
            <img src={Wave} alt="background" className="absolute w-full -bottom-1 lg:-bottom-5 z-10 rotate-180" />
        </div>
    )
}
