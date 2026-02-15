import BlogForm from "@/components/forms/blogForm"
import { useGetBlogById } from "@/hooks/blogs/useGetBlogById"
import { useUpdateBlog } from "@/hooks/blogs/useUpdateBlog"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import BlogFormSkeleton from "@/components/skeletons/BlogFormSkeleton"
import HeaderForForms from "@/components/HeaderForForms"

export const UpdateBlog = () => {
    const { blogId } = useParams()
    const { fetchBlogs, blog, loading: getLoading = true, error: getError } = useGetBlogById(blogId)
    const { handleUpdateBlog, loading: updateLoading, error: updateError } = useUpdateBlog()

    useEffect(() => {
        fetchBlogs()
    }, [blogId])

    const handleUpdateSubmit = async (formData) => {
        try {
            await handleUpdateBlog({ id: blog.id, formData })
            return true
        } catch (err) {
            console.error("Failed to update blog:", err)
            return false
        }
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms title={<>Update <span className="text-blue-dark">Blog</span> Post</>} 
            description="Share updates, announcements, and important. Fill in the details below to publish a new blog post on the school website."
            />

            {getLoading && <BlogFormSkeleton />}

            {blog && !getLoading &&
                <BlogForm
                    blog={blog}
                    onSubmit={handleUpdateSubmit}
                    isLoading={updateLoading}
                    externalError={updateError}
                />
            }
            {getError && !getLoading && <p className="text-center text-red-500 font-bold">Error: Please try again later.</p>}
        </div>
    )
}