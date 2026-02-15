import { useBlogs } from '../../hooks/blogs/useBlogs';

export default function Home() {
    const {blogs, loading, error} = useBlogs()

    return (
        <div className="p-8 space-y-4">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && blogs &&
            <>
                <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
                <p className="text-gray-500">Welcome to the management portal.</p>
                <h1>lorem500</h1>
            </>
            }
        </div>
    )
}