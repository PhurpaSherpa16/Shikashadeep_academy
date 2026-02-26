import { useState, useEffect } from "react";
import ImageCard from "../../../components/ImageCard";
import { useGetAllItemsWithCache } from "../../../api/getAllItemsWithCache";
import Pagination from "../../../components/Pagination";
import Error from "../../../components/Error";
import NoItemsForPublic from "../../../components/NoItemsForPublic";
import ImageViewer from "../../../components/gallery/ImageViewer";
import GalleryImageSkeleton from "../../../components/skeletons/GalleryImageSkeleton";
import FilterTags from "./components/FilterTags";

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(null)
    const [page, setPage] = useState(1)
    const [from, setFrom] = useState('gallery/images')
    const [filter, setFilter] = useState('all')
    const {data, isLoading, error} = useGetAllItemsWithCache(from)

    const galleryData = data?.data?.images
    const total_pages = data?.data?.total_pages

    useEffect(()=>{
        window.scrollTo(0, 0)

        if(filter === 'all'){
            setFrom(`gallery/images?page=${page}`)
        }
        else if(filter){
            setFrom(`gallery/images/tag?q=${filter}&page=${page}`)
        }
        else{   
            setFrom(`gallery/images?page=${page}`)
        }
    },[filter, page])
    

    return (
        <div className="min-h-screen">
            {/* Hero Header */}
            <div className="bg-white border-gray-100 space-y-8">
                <div className="headerPosition md:flex justify-between ">
                    <div className="max-w-3xl space-y-2 lg:space-y-4">
                        <h1 className="font-serif font-bold text-gray-900">
                            Our <span className='text-(--blueDark)'>Gallery</span>
                        </h1>
                        <p className="text-gray-500">
                            A visual journey through the moments that define Shikshadeep Academy.
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center justify-end">
                        <FilterTags setFilter={setFilter} setPage={setPage}/>
                    </div>
                </div>

                <div className="min-h-screen">
                    <div className="min-h-200 pb-10">
                        {isLoading && (
                            <div className="container px-4 lg:px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({length: 9}).map((_, index)=>(<GalleryImageSkeleton key={index}/>))}
                            </div>
                        )}
                        {error && (
                            <div className='container px-4 w-fit py-32'>
                                <Error text={'Error Loading Images, Please Wait'}/>
                            </div>
                        )}
                        {!isLoading && !error && galleryData?.length === 0 && (
                                <div className='container px-4 grid place-items-center py-32'>
                                    <NoItemsForPublic message="No Images Available" link={'/'} linkText="Refresh"/>
                                </div>
                            )
                        }
                        {!isLoading && !error && galleryData?.length > 0 && (
                            <div className="container px-4 lg:px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {galleryData?.map((item, index)=>( 
                                    <ImageCard key={index} item={item} handleOpenViewer={()=>setCurrentIndex(index)}/>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="pb-8">
                        <Pagination page={page} setPage={setPage} totalPages={total_pages}/>
                    </div>
                </div>
            </div>
            
            {currentIndex !== null && (<ImageViewer images={{ images: galleryData }} onClose={() => setCurrentIndex(null)} index={currentIndex}/>)}

        </div>
    );
}