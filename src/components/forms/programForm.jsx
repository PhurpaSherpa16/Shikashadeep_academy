import { useState, useRef, useEffect } from "react";
import { Save, Plus, AlertCircle, CheckCircle2, Loader2, ImagePlus, X, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProgramForm({ programData, onSubmit, loading, error }) {
    const [status, setStatus] = useState("idle"); // idle, saving, saved
    const [tagInput, setTagInput] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        grade: "",
        description: "",
        features: [],
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // reseting the status after 3 seconds
    useEffect(() => {
        let timer;
        if (status === "saved") {
            setShowSuccess(true);
            timer = setTimeout(() => {
                setShowSuccess(false);
                setStatus("idle");
                if (!programData) handleReset()
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status]);

    // update data setting in useEffect
    useEffect(() => {
        if (programData && Object.keys(programData).length > 0) {
            const feature = programData?.features?.map((feature) => feature.title)
            setFormData({
                title: programData?.title,
                grade: programData?.grade,
                description: programData?.description,
                features: feature,
                image: programData?.image_url
            })
            setPreview(programData?.image_url)
        }
    }, [programData])

    // resetting the form
    const handleReset = () => {
        setFormData({ title: "", grade: "", description: "", features: [], image: null });
        setPreview(null);
        setErrors({});
        setTagInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // handling form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    // handling image changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setErrors(prev => ({ ...prev, image: null }));
        }
    };

    // handling feature addition
    const handleAddFeature = () => {
        const feature = tagInput.trim();
        if (!feature) return;
        if (formData.features.includes(feature)) {
            setErrors(prev => ({ ...prev, features: "This feature is already added." }));
            return;
        }
        setFormData(prev => ({ ...prev, features: [...prev.features, feature] }));
        setTagInput("");
        setErrors(prev => ({ ...prev, features: null }));
    };

    // removing features
    const removeFeature = (featureToRemove) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f !== featureToRemove)
        }));
    };

    // validating the form
    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.grade) newErrors.grade = "Grade is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (formData.features.length === 0) newErrors.features = "At least one feature is required";
        if (!formData.image) newErrors.image = "Program image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return

        setStatus("saving")
        try {
            const result = await onSubmit(formData)
            if (result) {
                setStatus("saved")
            }
        } catch (error) {
            setStatus("idle")
        }
    }



    return (
        <div className="space-y-10">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 h-fit">
                    {/* Left Column: Details */}
                    <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100 relative">
                        <div className="space-y-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-bold text-gray-700">Program Title</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Advanced Mathematics"
                                    className={cn("rounded-lg border-gray-200 focus:ring-blue-dark h-12", errors.title && "border-red-300 bg-red-50")} />
                                {errors.title && <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.title}</p>}
                            </div>

                            {/* Grade */}
                            <div className="space-y-2">
                                <Label htmlFor="grade" className="text-sm font-bold text-gray-700">Grade / Level</Label>
                                <Input id="grade" name="grade" value={formData.grade} onChange={handleChange}
                                    className={cn("w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-dark/20 focus:border-blue-dark outline-none transition-all appearance-none bg-white text-sm", errors.grade && "border-red-300 bg-red-50")} />
                                {errors.grade && <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.grade}</p>}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-bold text-gray-700">Description</Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Briefly describe the program objectives..."
                                    className={cn("h-32 rounded-lg border-gray-200 focus:ring-blue-dark resize-none p-4", errors.description && "border-red-300 bg-red-50")}
                                />
                                {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.description}</p>}
                            </div>

                            {/* Features Tags */}
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-gray-700">Key Features</Label>
                                <div className="flex flex-wrap gap-2 min-h-8">
                                    {formData.features.map((feature) => (
                                        <span key={feature} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-dark rounded-lg border border-blue-100 text-[10px] font-bold animate-in zoom-in-95 duration-200 shadow-sm">
                                            {feature}
                                            <button type="button" onClick={() => removeFeature(feature)} className="hover:text-red-500 transition-colors bg-white/50 rounded-full p-0.5">
                                                <X className="size-3" />
                                            </button>
                                        </span>
                                    ))}
                                    {formData.features.length === 0 && <p className="text-xs text-gray-400 italic">No features added yet.</p>}
                                </div>
                                <div className="relative group">
                                    <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }} placeholder="Type feature and press Enter or +" className={cn("rounded-lg border-gray-200 focus:ring-blue-dark py-6", errors.features && "border-red-300 bg-red-50")} />
                                    <button type="button" onClick={handleAddFeature} disabled={!tagInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-blue-dark hover:text-white transition-all shadow-sm disabled:opacity-50"
                                    >
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                                {errors.features && <p className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1"><AlertCircle className="size-3" /> {errors.features}</p>}
                            </div>
                        </div>

                        {/* Status Messages overlay */}
                        {showSuccess && (
                            <div className="absolute top-4 right-12 z-10 p-4 bg-green-50 border border-green-100 flex items-center gap-3 text-green-600 rounded-lg animate-in slide-in-from-bottom-2 duration-300 shadow-sm">
                                <CheckCircle2 className="size-4" />
                                <p className="text-xs font-bold">{programData ? "Program updated successfully" : "Program saved successfully"}</p>
                            </div>
                        )}
                        {error && (
                            <div className="absolute top-4 right-12 z-10 p-4 bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 rounded-lg animate-in slide-in-from-bottom-2 duration-300 shadow-sm">
                                <AlertCircle className="size-4" />
                                <p className="text-xs font-bold">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Image Upload */}
                    <div className="p-8 lg:p-12 bg-gray-50/50 flex flex-col justify-between">
                        <div className="space-y-4 flex-1 flex flex-col">
                            <Label className="text-sm font-bold text-gray-700">Program Banner</Label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative",
                                    preview ? "border-transparent bg-white shadow-inner" : "border-gray-200 hover:border-blue-dark/50 hover:bg-white",
                                    errors.image && "border-red-300 bg-red-50"
                                )}
                            >
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
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
                            {errors.image && <p className="text-red-500 text-[10px] font-bold text-center mt-1 flex items-center justify-center gap-1"><AlertCircle className="size-3" /> {errors.image}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                            <Button type="button" variant="outline" onClick={handleReset}
                                className="flex-1 rounded-lg font-bold text-gray-500 hover:bg-gray-100 border-gray-200 h-12"
                                disabled={status === "saving"}>
                                Reset <RotateCcw className="size-4 ml-2" />
                            </Button>

                            <Button type="submit" disabled={status === "saving" || status === "saved"}
                                className={cn("flex-2 rounded-lg font-bold bg-blue-dark hover:bg-blue-dark/90 text-white shadow-lg active:scale-95 transition-all h-12", (status === "saving" || status === "saved") && "opacity-80")}>
                                {status === "saving" ? (
                                    <><Loader2 className="size-4 mr-2 animate-spin" /> 
                                    {programData ? "Updating..." : "Saving..."}
                                    </>
                                ) : status === "saved" ? (
                                    <><CheckCircle2 className="size-4 mr-2" /> 
                                        {programData ? "Updated" : "Saved"}
                                    </>
                                ) : (
                                    <><Plus className="size-4 mr-2" />
                                        {programData ? "Update Program" : "Save Program"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <p className="max-w-xl mx-auto text-center text-gray-400 text-xs italic">
                Note: Programs added here will be immediately available in the public academic.
            </p>
        </div>
    )
}