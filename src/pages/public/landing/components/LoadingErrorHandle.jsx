import { Link, useLocation } from "react-router-dom"
import Error from "../../../../components/Error"
import Loading from "../../../../components/Loading"
import NoItemsForPublic from "../../../../components/NoItemsForPublic"
import { MoveRight } from "lucide-react"
import { Button } from '@/components/ui/button'

export default function LoadingErrorHandle({...props}) {
    const location = useLocation()
    const {isLoading, error, data, linkLabel, linkPath, renderItem, noDataMessage} = props
    return (
        <div className='space-y-12 lg:space-y-8 relative min-h-120'>
            {isLoading && (
                <div className='flex flex-col gap-8 container px-4 pt-32'>
                    <Loading text={'Loading...'}/>
                </div>
            )}
            {error && (
                <div className='container px-4 w-fit'>
                    <Error text={'Error Loading, Please Wait'}/>
                </div>
            )}
            {!isLoading && !error && data?.length === 0 && (
                    <div className='container px-4 grid place-items-center min-h-64'>
                        <NoItemsForPublic message={noDataMessage} link={'/'} linkText="Refresh"/>
                    </div>
                )
            }
            {!isLoading && !error && data?.length > 0 && data && renderItem}
            
            {location.pathname === '/' && !isLoading && !error && data?.length > 0 && data && (
            <div className='container px-4 flex items-center justify-center py-4 lg:py-8'>
                <Button className="group bg-(--blueDark)
                px-12! cursor-pointer shadow-md hover:shadow-lg 
                transition-all flex items-center gap-2 py-3 rounded-full">
                    <Link to={linkPath} className='flex items-center gap-2'>
                        {linkLabel}
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                    </Link>
                </Button>
            </div>
            )}

        </div>
    )
}