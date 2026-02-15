import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, ImagePlus, XCircle, AlertCircle, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { capitalize } from "@/utils/captalize"

export default function BlogForm({ blog, onSubmit, isLoading, externalError }) {
    const category = [
        "travel",
        "events",
        "sports",
        "technology",
        "community",
        "examination",
        "admission",
        "culture",
        "achievements",
        "environment",
        "academic",
        "announcement",
        "others"
    ]

    const [formData, setFormData] = useState({
        title: "",
        tagName: "",
        description: "",
        image: ""
    })
    const [preview, setPreview] = useState(null)
    const [localError, setLocalError] = useState("")
    const [success, setSuccess] = useState(false)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog?.title || "",
                tagName: blog?.tag?.name || "",
                description: blog?.description || "",
                image: blog?.image_url || ""
            })
            setPreview(blog?.image_url || null)
        } else {
            handleReset()
        }
    }, [blog])


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({ ...prev, image: file }))
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }


    const handleReset = () => {
        setFormData({ title: "", tagName: "", description: "", image: "" })
        setPreview(null)
        setLocalError("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.title || !formData.description || !formData.tagName) {
            setLocalError("Title, description, and category are required.")
            return
        }

        try {
            const result = await onSubmit(formData)
            if (result !== false) { // Assuming onSubmit might return false on error or we just handle catch
                if (!blog) handleReset()
                setSuccess(true)
            }
        } catch (err) {
            // Error is likely handled by the parent or passed via externalError
            console.error("Form submission error:", err)
        }
    }


    const handleAddTag = (tag) => {
        if (tag.trim() !== "") {
            setFormData(prev => ({ ...prev, tagName: tag }))
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocalError("")
            setSuccess(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [localError, success])

    const errorToDisplay = externalError || localError

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl 
        overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500
        relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-fit relative">
                {/* Left Column: Inputs */}
                <div className="p-8 lg:p-12 h-full lg:min-h-160 space-y-6 border-b 
                lg:border-b-0 lg:border-r border-gray-100 relative">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-bold text-gray-700">Blog Title</Label>
                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter a catchy title..."
                                className="rounded-lg border-gray-200 focus:ring-(--blueDark) h-12" />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-bold text-gray-700">Description</Label>
                            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Write your blog content here..."
                                className="h-48 rounded-lg border-gray-200 focus:ring-(--blueDark) resize-none p-4 
                                overflow-y-auto" />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="tag" className="text-sm font-bold text-gray-700">Category</Label>
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                                    Required
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1">
                                {category.map((cat) => {
                                    const isActive = formData.tagName === cat
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => handleAddTag(cat)}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border",
                                                isActive
                                                    ? "bg-(--blueDark) text-white border-(--blueDark) shadow-md scale-105"
                                                    : "bg-white text-gray-500 border-gray-100 hover:border-(--blueDark)/30 hover:bg-gray-50"
                                            )}
                                        >
                                            {capitalize(cat)}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    {/* Error Message */}
                    {errorToDisplay && (
                        <div className="p-4 bg-red-50 border-t border-red-100 flex items-center gap-3 text-red-600 
                        absolute top-4 right-12 z-10 animate-in slide-in-from-bottom-2 duration-300 rounded-lg
                        w-fit shadow-sm">
                            <AlertCircle className="size-4" />
                            <p className="text-xs font-bold">{errorToDisplay}</p>
                        </div>
                    )}
                    {success && (
                        <div className="p-4 bg-green-50 border-t border-green-100 flex items-center gap-3 text-green-600
                        absolute top-4 right-12 z-10 animate-in slide-in-from-bottom-2 duration-300 rounded-lg
                        w-fit shadow-sm">
                            <Check className="size-4" />
                            <p className="text-xs font-bold">{blog ? "Blog updated successfully" : "Blog posted successfully"}</p>
                        </div>
                    )}
                </div>

                {/* Right Column: Image Preview */}
                <div className="p-8 lg:p-12 bg-gray-50/50 flex min-h-120 lg:h-full flex-col justify-between">
                    <div className="space-y-4 h-full flex flex-col">
                        <Label className="text-sm font-bold text-gray-700">Image</Label>
                        <div onClick={() => fileInputRef.current?.click()} className={cn("flex-1 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden",
                            preview ? "border-transparent" : "border-gray-200 hover:border-(--blueDark) hover:bg-white")}>
                            {preview ? (
                                <img src={preview} alt="Preview" className="size-60 rounded-lg object-cover object-center" />
                            ) : (
                                <div className="text-center p-6 space-y-3">
                                    <div className="bg-white size-14 rounded-lg shadow-sm flex items-center justify-center mx-auto text-gray-400">
                                        <ImagePlus className="size-7" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-600">Click to upload</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (Max. 5MB)</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        <div className="flex justify-center">
                            {preview && (
                                <button type="button" onClick={() => { setPreview(null); setFormData(prev => ({ ...prev, image: "" })) }}
                                    className="mt-2 text-xs w-fit font-bold text-red-500 hover:text-red-600 
                                    hover:bg-red-50 rounded-lg border border-red-100 px-3 py-1 bg-white transition-colors">
                                    <span className="flex items-center gap-2">
                                        <XCircle className="size-3" />
                                        Remove Image
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mt-8 flex-col-reverse lg:flex-row">
                        {!blog && (
                            <Button type="button" variant="outline" onClick={handleReset}
                                className="flex-1 rounded-lg font-bold w-full text-gray-500 hover:bg-gray-100 border-gray-200 h-12">
                                Reset
                                <RotateCcw className="size-4 ml-2" />
                            </Button>
                        )}
                        <Button type="submit" disabled={isLoading} className={cn("rounded-lg overflow-hidden font-bold bg-(--blueDark) hover:bg-(--blueDark)/90 text-white shadow-lg active:scale-95 transition-all h-12 w-full", blog ? "flex-1" : "flex-2")}
                            onClick={handleSubmit}>
                            {isLoading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                            {isLoading ? (blog ? "Updating..." : "Saving...") : (blog ? "Update Blog" : "Save Blog")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}