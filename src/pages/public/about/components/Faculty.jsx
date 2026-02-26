import { useGetAllItemsWithCache } from '../../../../api/getAllItemsWithCache'
import { faculty_data } from '../../../../data/about'
import { capitalize } from '../../../../utils/captalize'
import TeacherCard from './TeacherCard'
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Faculty() {
  const { data, isLoading, error } = useGetAllItemsWithCache("school/teachers")
  const teachers = data?.data

  return (
    <div className='grid place-items-center'>
      <div className="custom_paddings space-y-16 w-full">
        <div className='space-y-8'>
          <h1 className='font-serif text-(--blueDark)'>{faculty_data.label}</h1>
          <p className='text-justify'>{faculty_data.description}</p>
        </div>
        <div className='grid gap-8 w-full min-h-64'>
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-8 w-48 rounded-md" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <Skeleton key={j} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-red-50 rounded-full mb-4">
                <span className="text-red-600 font-bold text-2xl">!</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Unable to load faculty</h3>
              <p className="text-gray-500 max-w-sm">There was an error fetching the faculty data. Please try refreshing the page.</p>
            </div>
          ) : !teachers || Object.keys(teachers).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <p className="text-gray-500 italic text-lg">No faculty information available at the moment.</p>
            </div>
          ) : (
            Object.entries(teachers).map(([tag, allTeachers], index) => (
              <div key={index} className='space-y-4'>
                <div>
                  <span className='text-lg font-serif text-(--blueDark) font-semibold'>{capitalize(tag)}</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4 w-full'>
                  {allTeachers.map((teacher, index) => (
                    <TeacherCard teacher={teacher} key={index} />
                  ))}
                </div>
                {index !== Object.entries(teachers).length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}