import BlogCard from '@/components/BlogCard'
import { useGetAllItemsWithCache } from '../../../../api/getAllItemsWithCache';
import { useState } from 'react';
import LoadingErrorHandle from './LoadingErrorHandle';

export default function BlogNewsSection() {
    const [page, setPage] = useState(1)
    const form =  `blogs?page=${page}`
    const {data, isLoading, error} = useGetAllItemsWithCache(form)
    const latestBlog = data?.data?.blogs?.slice(0,3)

    return (
        <div className='bg-(--offWhiteBackground)'>
            <div className='container grid px-4 lg:px-0 py-16 lg:py-24'>
                <div className='grid place-items-center space-y-12'>
                    <div className='grid place-items-center space-y-4'>
                        <h1 className='text-center font-serif text-3xl lg:text-4xl font-bold'>Latest News & Blogs</h1>
                        <p className='text-center text-gray-500 max-w-2xl'>Stay updated with school activities, achievements, and important announcements.</p>
                    </div>

                    <LoadingErrorHandle isLoading={isLoading} error={error} data={latestBlog} linkLabel="View All Blogs & News" linkPath="/blog_news"
                    noDataMessage="No Blogs Available"
                    renderItem = {<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full'> 
                        {latestBlog?.map((blog, index) => (<BlogCard key={index} blog={blog} />))}
                    </div>}/>
                </div>
            </div>
        </div>
    )
}
