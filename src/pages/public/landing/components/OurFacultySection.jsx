import { MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Tag from './Tag'
import { Link } from 'react-router-dom'
import { useGetAllItemsWithCache } from '@/api/getAllItemsWithCache'
import TeacherCard from '../../about/components/TeacherCard'
import LoadingErrorHandle from './LoadingErrorHandle'

export default function OurFacultySection() {
    const { data } = useGetAllItemsWithCache("school/teachers/all")
    const teachers = data?.data?.slice(0, 3)

    return (
        <div className='py-16'>
            <div className='container px-4'>
                <div className='grid place-items-center space-y-16 relative'>
                    <div className='w-fit relative grid place-items-center space-y-4'>
                        <Tag label={'Our Faculty'} />
                        <div className='grid place-items-center'>
                            <h1 className='text-center font-serif w-full md:w-xl'>Dedicated team that help to develop your children</h1>
                            <p className='text-center'>Dedicated and experienced educators committed to nurturing every student's potential</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-32 w-full lg:w-5xl 2xl:w-6xl'>
                        {teachers?.map((teacher, index) => (
                            <TeacherCard teacher={teacher} key={index} />
                        ))}
                    </div>

                    <div>
                        <Button className="group bg-(--blueDark)
                    px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                    transition-all flex items-center gap-2 py-3 rounded-full">
                            <Link to="/about_us#faculty" className="flex items-center gap-2">
                                Join our Team
                                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
