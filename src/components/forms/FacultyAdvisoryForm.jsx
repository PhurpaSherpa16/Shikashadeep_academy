import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormActionButtons from "./helpers/FormActionButtons";
import FormStatusMessages from "./helpers/FormStatusMessages";
import FormErrorMessage from "./helpers/FormErrorMessage";

export default function FacultyAdvisoryForm({ ...AdvisoryProps }) {
    const { advisoryData, error, advisoryPostSubmit } = AdvisoryProps
    const [status, setStatus] = useState("idle");
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        quotes: "",
        isActive: true,
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [internalError, setInternalError] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        let timer;
        if (status === "saved" || status === "failed") {
            timer = setTimeout(() => {
                if (!advisoryData && !error && status === "saved") handleReset()
                setStatus("idle")
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, advisoryData, error]);

    // Populate form with existing data when in update mode
    useEffect(() => {
        if (advisoryData && Object.keys(advisoryData).length > 0) {
            setFormData({
                name: advisoryData?.name || "",
                designation: advisoryData?.designation || "",
                quotes: advisoryData?.quotes || "",
                isActive: advisoryData?.isActive ?? true,
                image: advisoryData?.image_url || null
            });
            setPreview(advisoryData?.image_url || null);
        }
    }, [advisoryData]);

    const handleReset = () => {
        setFormData({
            name: "",
            designation: "",
            quotes: "",
            isActive: true,
            image: null
        });
        setPreview(null);
        setInternalError({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (internalError[name]) setInternalError(prev => ({ ...prev, [name]: null }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setInternalError(prev => ({ ...prev, image: null }))
        }
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";

        // Only require image for new advisory members (not when updating with existing image)
        if (!formData.image && !advisoryData) {
            newErrors.image = "Profile image is required";
        }

        setInternalError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("saving")
        try {
            const result = await advisoryPostSubmit(formData)
            if (result) {
                setStatus("saved")
                return
            }
            setStatus("failed")
        } catch (error) {
            setStatus("failed")
        }
    };

    return (
        <div className="space-y-10">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 h-fit">
                    {/* Left Column: Details */}
                    <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100 relative">
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Dr. Jane Smith"
                                    className={cn("rounded-lg border-gray-200 focus:ring-blue-dark h-12", internalError.name && "border-red-300 bg-red-50")} />
                                <FormErrorMessage message={internalError.name} />
                            </div>

                            {/* Designation */}
                            <div className="space-y-2">
                                <Label htmlFor="designation" className="text-sm font-bold text-gray-700">Designation</Label>
                                <Input id="designation" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Academic Advisor"
                                    className={cn("rounded-lg border-gray-200 focus:ring-blue-dark h-12", internalError.designation && "border-red-300 bg-red-50")} />
                                <FormErrorMessage message={internalError.designation} />
                            </div>

                            {/* Quotes */}
                            <div className="space-y-2">
                                <Label htmlFor="quotes" className="text-sm font-bold text-gray-700">Member's Quote</Label>
                                <Textarea id="quotes" name="quotes" value={formData.quotes} onChange={handleChange} placeholder="An inspirational message for the community..."
                                    className="h-32 rounded-lg border-gray-200 focus:ring-blue-dark resize-none p-4" />
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center gap-4 pt-2">
                                <Label className="text-sm font-bold text-gray-700">Active Status</Label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="isActive" checked={formData.isActive === true} onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
                                            className="size-4 border-gray-300 text-blue-dark focus:ring-blue-dark" />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Active</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="isActive" checked={formData.isActive === false} onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
                                            className="size-4 border-gray-300 text-blue-dark focus:ring-blue-dark" />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Inactive</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <FormStatusMessages
                            showSuccess={status === "saved"}
                            error={status === "failed" ? (error || "Failed to save. Please try again.") : null}
                            isUpdateMode={!!advisoryData}
                            successMessage="Advisory member saved successfully"
                            updateMessage="Advisory member updated successfully"
                        />
                    </div>

                    {/* Right Column: Image Upload */}
                    <div className="p-8 lg:p-12 bg-gray-50/50 flex flex-col justify-between">
                        <div className="space-y-4 flex-1 flex flex-col">
                            <Label className="text-sm font-bold text-gray-700">Profile Image</Label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative min-h-[300px]",
                                    preview ? "border-transparent bg-white shadow-inner" : "border-gray-200 hover:border-blue-dark/50 hover:bg-white",
                                    internalError.image && "border-red-300 bg-red-50"
                                )}
                            >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="size-80 object-cover object-center" />
                                ) : (
                                    <div className="text-center p-6 space-y-3 pointer-events-none">
                                        <div className="bg-white size-14 rounded-2xl shadow-sm flex items-center justify-center mx-auto text-gray-400">
                                            <ImagePlus className="size-7" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600">Click to upload image</p>
                                            <p className="text-[10px] text-gray-400 mt-1">PNG, JPG or WEBP (Max. 5MB)</p>
                                        </div>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                            </div>
                            {preview && (
                                <button type="button" onClick={() => { setPreview(null); setFormData(prev => ({ ...prev, image: null })) }}
                                    className="flex items-center gap-2 mx-auto mt-2 text-[10px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-red-100 px-3 py-1.5 bg-white transition-colors">
                                    <X className="size-3" /> Remove Image
                                </button>
                            )}
                            <FormErrorMessage message={internalError.image} className="text-center justify-center" />
                        </div>

                        <FormActionButtons
                            status={status}
                            onReset={handleReset}
                            isUpdateMode={!!advisoryData}
                            submitText="Save Advisor"
                            updatingText="Update Advisor"
                        />
                    </div>
                </form>
            </div>
            <p className="max-w-xl mx-auto text-center text-gray-400 text-xs italic">
                Note: Advisory council information will be displayed prominently on the school's leadership page.
            </p>
        </div>
    );
}
