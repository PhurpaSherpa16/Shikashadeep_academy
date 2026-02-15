import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw, ImagePlus, X, AlertCircle, Loader2, Check, UploadCloud, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GalleryForm({ item, onSubmit, isLoading, externalError }) {
    // --- State ---
    const [tagInput, setTagInput] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        caption: "",
        tags: [],
        images: []
    })
    const [previews, setPreviews] = useState([])
    const [localError, setLocalError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    // --- Effects ---
    // Update form when item changes (for editing)
    useEffect(() => {
        if (item && Object.keys(item).length > 0) {
            // Map the API structure to our form structure
            const mappedTags = item?.galleryPostTags?.map(t => t.tag?.name || t.name).filter(Boolean) || [];
            const mappedImages = item?.images?.map(img => ({
                url: img.image_url,
                isExisting: true,
                id: img.id
            })) || [];

            setFormData(prev => ({
                ...prev,
                title: item?.title || item?.label || prev.title || "",
                caption: item?.caption || prev.caption || "",
                tags: mappedTags,
                images: [] // Reset new files when item changes
            }))

            if (mappedImages.length > 0) {
                setPreviews(mappedImages)
            }
        }
    }, [item])

    // Auto-dismiss alerts
    useEffect(() => {
        if (localError || success) {
            const timer = setTimeout(() => {
                setLocalError("")
                setSuccess(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [localError, success])

    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileSelection = (files) => {
        const newFiles = Array.from(files)
        const validImages = newFiles.filter(file => file.type.startsWith('image/'))

        if (validImages.length === 0) {
            setLocalError("Please select valid image files.")
            return
        }

        const newPreviews = validImages.map(file => ({
            url: URL.createObjectURL(file),
            file: file,
            isExisting: false
        }))

        setFormData(prev => ({ ...prev, images: [...prev.images, ...validImages] }))
        setPreviews(prev => [...prev, ...newPreviews])
        setLocalError("")
    }

    const handleImageChange = (e) => {
        if (e.target.files?.length) {
            handleFileSelection(e.target.files)
        }
    }

    const handleAddTag = () => {
        const tag = tagInput.trim().toLowerCase().split(' ').join('_')
        if (!tag) return

        if (formData.tags.length >= 4) {
            setLocalError("You can only add up to 4 tags.")
            return
        }

        if (formData.tags.includes(tag)) {
            setLocalError("This tag has already been added.")
            return
        }

        setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
        setTagInput("")
        setLocalError("")
    }

    const removeImage = (index) => {
        const imageToRemove = previews[index];

        // If it's a local object URL, revoke it to prevent memory leaks
        if (!imageToRemove.isExisting && imageToRemove.url) {
            URL.revokeObjectURL(imageToRemove.url);
        }

        const updatedPreviews = previews.filter((_, i) => i !== index)
        setPreviews(updatedPreviews)

        // Update formData.images (only contains new files)
        const updatedImages = updatedPreviews
            .filter(p => !p.isExisting)
            .map(p => p.file)
            .filter(Boolean);

        setFormData(prev => ({ ...prev, images: updatedImages }))
    }

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tagToRemove)
        }))
    }

    const handleReset = () => {
        // Clean up object URLs
        previews.forEach(p => {
            if (!p.isExisting && p.url) URL.revokeObjectURL(p.url);
        });

        setFormData({ title: "", caption: "", tags: [], images: [] })
        setPreviews([])
        setLocalError("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.title || !formData.caption) {
            setLocalError("Title and caption are required.")
            return
        }

        if (formData.tags.length === 0) {
            setLocalError("At least one tag is required.")
            return
        }

        if (previews.length === 0) {
            setLocalError("At least one image is required.")
            return
        }

        try {
            // Pass previews as well so the handler knows which existing images were kept/removed
            const result = await onSubmit({ ...formData, previews })
            if (result !== false) {
                if (!item) handleReset()
                setSuccess(true)
            }
        } catch (err) {
            console.error("Form submission error:", err)
            setLocalError("Failed to submit form. Please try again.")
        }
    }

    const errorToDisplay = externalError || localError

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 h-fit">

                {/* --- Left Column: Details --- */}
                <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <div className="space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-bold text-gray-700">Gallery Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange}
                                placeholder="Event or collection name..."
                                className="rounded-lg border-gray-200 focus:ring-blue-dark h-12"
                                required
                            />
                        </div>

                        {/* Caption */}
                        <div className="space-y-2">
                            <Label htmlFor="caption" className="text-sm font-bold text-gray-700">Caption</Label>
                            <Textarea id="caption" name="caption" value={formData.caption} onChange={handleChange}
                                placeholder="Provide a brief description of these moments..."
                                className="h-32 rounded-lg border-gray-200 focus:ring-blue-dark resize-none p-4 overflow-y-auto"
                                required
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-4">
                            <Label className="text-sm font-bold text-gray-700">Tags (Max 4)</Label>
                            <div className="flex flex-wrap gap-2 min-h-8">
                                {formData.tags.map((tag) => (
                                    <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-dark rounded-lg border border-blue-100 text-xs font-bold animate-in zoom-in-95 duration-200 shadow-sm">
                                        #{tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors bg-white/50 rounded-full p-0.5">
                                            <X className="size-3" />
                                        </button>
                                    </span>
                                ))}
                                {formData.tags.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">No tags added yet.</p>
                                )}
                            </div>
                            <div className="relative group">
                                <Input id="tags" value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                                    placeholder={formData.tags.length >= 4 ? "Limit reached" : "Type and press Enter or +"}
                                    disabled={formData.tags.length >= 4}
                                    className="rounded-lg border-gray-200 focus:ring-blue-dark py-6"
                                />
                                <button type="button" onClick={handleAddTag}
                                    disabled={formData.tags.length >= 4 || !tagInput.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-blue-dark hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                                    <Plus className="size-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Messages */}
                    <div className="space-y-3 min-h-[60px]">
                        {errorToDisplay && (
                            <div className="p-4 bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 rounded-lg animate-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="size-4 shrink-0" />
                                <p className="text-xs font-bold">{errorToDisplay}</p>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-50 border border-green-100 flex items-center gap-3 text-green-600 rounded-lg animate-in slide-in-from-top-2 duration-300">
                                <Check className="size-4 shrink-0" />
                                <p className="text-xs font-bold">{item ? "Gallery updated successfully" : "Gallery posted successfully"}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Right Column: Image Upload --- */}
                <div className="p-8 lg:p-12 bg-gray-50/50 flex flex-col">
                    <Label className="text-sm font-bold text-gray-700 mb-4">Upload Images</Label>

                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) handleFileSelection(e.dataTransfer.files); }}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "group relative flex-1 min-h-[240px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer",
                            isDragging ? "border-blue-dark bg-blue-dark/5" : "border-gray-200 hover:border-blue-dark/50 hover:bg-white"
                        )}
                    >
                        <div className="text-center p-6 space-y-3 pointer-events-none">
                            <div className={cn(
                                "size-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto transition-all",
                                isDragging ? "bg-blue-dark text-white scale-110 shadow-lg" : "bg-white text-gray-400 group-hover:text-blue-dark group-hover:scale-110"
                            )}>
                                <UploadCloud className="size-8" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-600">Drag & drop or click to upload</p>
                                <p className="text-xs text-gray-400 mt-1">Select multiple images (Max 5MB each)</p>
                            </div>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" multiple className="hidden" />
                    </div>

                    {/* Previews Grid */}
                    {previews.length > 0 && (
                        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                            {previews.map((preview, index) => (
                                <div key={preview.isExisting ? preview.id : index} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                                    <img src={preview.url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                                        className="absolute top-1 right-1 size-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600">
                                        <X className="size-3" />
                                    </button>
                                    {preview.isExisting && (
                                        <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-blue-dark/80 text-[8px] text-white font-bold rounded uppercase">
                                            Saved
                                        </div>
                                    )}
                                </div>
                            ))}
                            {previews.length < 10 && (
                                <button type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                    className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-dark/30 hover:bg-white hover:text-blue-dark transition-all">
                                    <ImagePlus className="size-5" />
                                    <span className="text-[10px] font-bold mt-1">Add More</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                        {!item && (
                            <Button type="button" variant="outline" onClick={handleReset}
                                className="flex-1 rounded-lg font-bold text-gray-500 hover:bg-gray-100 border-gray-200">
                                Reset
                                <RotateCcw className="size-4 ml-2" />
                            </Button>
                        )}
                        <Button type="submit" disabled={isLoading}
                            className={cn(
                                "flex-2 rounded-lg font-bold bg-blue-dark hover:bg-blue-dark/90 text-white shadow-lg active:scale-95 transition-all h-12",
                                isLoading && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {isLoading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                            {isLoading ? (item ? "Updating..." : "Posting...") : (item ? "Update Gallery" : "Publish Gallery")}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}