import { Funnel } from "lucide-react"
import { useGetAllItemsWithCache } from "../../../../api/getAllItemsWithCache"
import { capitalize } from "../../../../utils/captalize"
import { useState } from "react"
import Loading from "../../../../components/Loading"
import Error from "../../../../components/Error"

export default function FilterTags({setFilter, setPage}) {
    const [open, setOpen] = useState(false)
    const {data, isLoading, error} = useGetAllItemsWithCache("gallery/tags")
    const tags = data?.data
    return (
        <div className="relative">
            <button onClick={()=>setOpen((prev)=>!prev)} className="group bg-indigo-600/10 hover:bg-indigo-600 p-2 rounded-md transition-all">
                <Funnel className="size-4 text-gray-500 group-hover:text-white transition-all duration-300"/>
            </button>
            {open && isLoading && (
                <div className="absolute right-0 bg-white/60 backdrop-blur-lg z-10 shadow rounded-lg p-4 mt-4 flex flex-wrap w-sm md:w-lg gap-4">
                    <Loading/>
                </div>
            )}
            {open && error && (
                <div className="absolute right-0 bg-white/60 backdrop-blur-lg z-10 shadow rounded-lg p-4 mt-4 flex flex-wrap w-sm md:w-lg gap-4">
                    <Error text={'Error Loading Tags, Please Wait'}/>
                </div>
            )}
            {open && tags?.length === 0 && (
                <div className="absolute right-0 bg-white/60 backdrop-blur-lg z-10 shadow rounded-lg p-4 mt-4 flex flex-wrap w-sm md:w-lg gap-4">
                    <p className="text-sm text-gray-500">No Tags Available</p>
                </div>
            )}

            {open && !isLoading && !error && tags?.length > 0 && 
                <div className="absolute right-0 bg-white/60 backdrop-blur-lg z-10 shadow rounded-lg p-4 mt-4 flex flex-wrap w-sm md:w-lg gap-4">
                    <div className="flex items-center gap-2 bg-indigo-600 p-2 rounded-md cursor-pointer px-4"
                        onClick={()=>{
                            setPage(1)
                            setFilter('all')
                            setOpen(false)
                        }}>
                            <p className="text-sm text-white">All</p>
                        </div>
                    {tags?.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2 bg-indigo-600 p-2 rounded-md cursor-pointer px-4"
                        onClick={()=>{
                            setPage(1)
                            setFilter(tag?.name)
                            setOpen(false)
                        }}>
                            <p className="text-sm text-white">{capitalize(tag?.name)}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}