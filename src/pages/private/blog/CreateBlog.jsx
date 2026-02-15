import BlogForm from "@/components/forms/blogForm"
import { usePostBlog } from "@/hooks/blogs/usePostBlog"
import HeaderForForms from "@/components/HeaderForForms"

export const CreateBlog = () => {
    const { handlePostBlog, loading, error } = usePostBlog()

    const handleSubmit = async (formData) => {
        try {
            await handlePostBlog(formData)
            return true
        } catch (err) {
            console.error("Failed to create blog:", err)
            return false
        }
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms title={<>Create a <span className="text-(--blueDark)">New Blog</span> Post</>} 
            description="Share updates, announcements, and important. Fill in the details below to publish a new blog post on the school website." />
            <BlogForm onSubmit={handleSubmit} isLoading={loading} externalError={error} />
        </div>
    )
}