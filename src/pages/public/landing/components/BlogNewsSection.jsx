import { MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { blogs } from "@/data/blogNews";


import BlogCard from '@/components/BlogCard'
import { Link } from 'react-router-dom';

export default function BlogNewsSection() {

    const latestBlog = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
        <div className='bg-(--offWhiteBackground)'>
            <div className='container grid px-4 lg:px-0 py-16 lg:py-24'>
                <div className='grid place-items-center space-y-12'>
                    <div className='grid place-items-center space-y-4'>
                        <h1 className='text-center font-serif text-3xl lg:text-4xl font-bold'>Latest News & Blogs</h1>
                        <p className='text-center text-gray-500 max-w-2xl'>Stay updated with school activities, achievements, and important announcements.</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full'>
                        {latestBlog.slice(0, 3).map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </div>
                    <div className='flex items-center justify-center py-4 lg:py-8'>
                        <Button className="group bg-(--blueDark)
                            px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                           <Link to="/blog_news?q=All" className='flex items-center gap-2'>
                                View All Blogs & News
                                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
