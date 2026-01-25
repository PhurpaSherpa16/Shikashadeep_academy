import React from 'react';
import { CalendarDays, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ item }) {
    return (
        <div className='group relative w-full border border-gray-100 rounded-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-[0.98] hover:-translate-y-2 transition-all duration-300 flex flex-col'>
            <div className='relative  overflow-hidden'>
                <img src={item.image} alt={item.label} className='h-70 w-full object-cover object-top 
                transition-transform duration-500 group-hover:scale-110'/>
                <div className="absolute inset-0 bg-blue-900/10" />
                <div className="absolute left-4 top-4 text-xs uppercase tracking-widest 
                    backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg transition-transform duration-300 
                    group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}cc`, color: 'white' }}>
                    {item.tag}
                </div>
            </div>

            <div className='p-6 flex flex-col flex-1 justify-between gap-4'>
                <div className='space-y-3'>
                    <div className='flex items-center gap-3 text-sm text-gray-500'>
                        <span className='flex items-center gap-1.5'>
                            <CalendarDays className='size-4' />
                            {item.date}
                        </span>
                        <span className='text-gray-300'>•</span>
                        <span>{item.readingTime} min read</span>
                    </div>

                    <div className='space-y-2'>
                        <h2 className='font-bold text-gray-900 leading-tight group-hover:text-(--blueDark) 
                        transition-colors'>
                            {item.label}
                        </h2>
                        <p className='line-clamp-3 text-sm leading-relaxed'>
                            {item.description}
                        </p>
                    </div>
                </div>

                <div className='pt-4 border-t border-gray-50'>
                    <Link to={`/blog_news?q=${item.tag}`} className='inline-flex items-center gap-2 
                    text-(--blueDark) font-bold text-sm group/link hover:underline decoration-2 
                    underline-offset-4 transition-all'>
                        Read more
                        <MoveRight className='size-4 transition-transform duration-300 group-hover/link:-rotate-45' />
                    </Link>
                </div>
            </div>
        </div>
    );
}
