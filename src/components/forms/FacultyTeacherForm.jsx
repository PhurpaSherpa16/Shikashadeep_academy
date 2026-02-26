import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import FormActionButtons from "./helpers/FormActionButtons";
import FormStatusMessages from "./helpers/FormStatusMessages";
import FormErrorMessage from "./helpers/FormErrorMessage";
import { capitalize } from "../../utils/captalize";

const EXPERIENCE_YEARS = [ 1, 2, 3, 5, 8, 10, 15 ];

const QUALIFICATIONS = [
    "Bachelor's Degree",
    "Master's Degree",
    "PhD / Doctorate",
    "B.Ed",
    "M.Ed",
    "M.Sc",
    "M.A",
    "B.Sc",
    "B.A"
];

const SUBJECT_TAGS = [
    "Mathematics",
    "Science",
    "English",
    "Nepali",
    "Social Studies",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Accountancy",
    "Economics",
    "Sports"
]

const Designation = [
    "director",
    "principal",
    "vice principal",
    "senior lecturer",
    "lecturer",
    "assistant lecturer",
    "sports coach",
    "others"
]

export default function FacultyTeacherForm({ facultyData, onSubmit, error }) {
    const [status, setStatus] = useState("idle")
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        experience: 0,
        qualification: "",
        quotes: "",
        isActive: true,
        tag: "",
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [internalError, setInternalError] = useState({});
    // reseting the status after 3 seconds
    useEffect(() => {
        let timer;
        if (status === "saved" || status === "failed") {
            timer = setTimeout(() => {
                setStatus("idle");
                if (!facultyData && !error && status === "saved") handleReset();
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, facultyData, error]);

    // update data setting in useEffect
    useEffect(() => {
        if (facultyData && Object.keys(facultyData).length > 0) {
            setFormData({
                name: facultyData?.name || "",
                designation: facultyData?.designation || "",
                experience: facultyData?.experience || "",
                qualification: facultyData?.qualification || "",
                quotes: facultyData?.quotes || "",
                isActive: facultyData?.isActive ?? true,
                tag: facultyData?.teacherTag?.name || "",
                image: facultyData?.image_url || null
            });
            setPreview(facultyData?.image_url || null);
        }
    }, [facultyData]);

    // resetting the form
    const handleReset = () => {
        setFormData({
            name: "",
            designation: "",
            experience: "",
            qualification: "",
            quotes: "",
            isActive: true,
            tag: "",
            image: null
        });
        setPreview(null);
        setInternalError({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // handling form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (internalError[name]) setInternalError(prev => ({ ...prev, [name]: null }));
    }

    // handling image changes
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

    // validating the form
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.tag.trim()) newErrors.tag = "Subject/Tag is required";
        if (!formData.image) newErrors.image = "Teacher image is required";

        // Optional but recommended
        if (!formData.designation.trim()) newErrors.designation = "Designation is required";

        setInternalError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("saving")
        try {
            const result = await onSubmit(formData);
            if (!result) {
                setStatus("failed")
                return
            }
            setStatus("saved")
        } catch (error) {
            console.log('Error in form submission', error);
            setStatus("idle")
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
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Dr. John Doe"
                                    className={cn("rounded-lg border-gray-200 focus:ring-blue-dark h-12", internalError.name && "border-red-300 bg-red-50")} />
                                <FormErrorMessage message={internalError.name} />
                            </div>

                            {/* Designation & Tag (Subject) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="designation" className="text-sm font-bold text-gray-700">Designation</Label>
                                    <select id="designation" name="designation" value={formData.designation} onChange={handleChange}
                                        className={cn("w-full px-4 h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-dark/20 focus:border-blue-dark outline-none transition-all bg-white text-sm", internalError.designation && "border-red-300 bg-red-50")}>
                                        <option value="">Select Designation</option>
                                        {Designation.map(designation => (
                                            <option key={designation} value={designation}>{capitalize(designation)}</option>
                                        ))}
                                    </select>   
                                    <FormErrorMessage message={internalError.designation} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tag" className="text-sm font-bold text-gray-700">Subject / Tag</Label>
                                    <select id="tag" name="tag" value={formData.tag} onChange={handleChange}
                                        className={cn("w-full px-4 h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-dark/20 focus:border-blue-dark outline-none transition-all bg-white text-sm", internalError.tag && "border-red-300 bg-red-50")}>
                                        <option value="">Select Subject</option>
                                        {SUBJECT_TAGS.map(tag => (
                                            <option key={tag} value={tag.toLowerCase()}>{tag}</option>
                                        ))}
                                    </select>
                                    <FormErrorMessage message={internalError.tag} />
                                </div>
                            </div>

                            {/* Experience & Qualification */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="experience" className="text-sm font-bold text-gray-700">Experience</Label>
                                    <select id="experience" name="experience" value={formData.experience} onChange={handleChange}
                                        className="w-full px-4 h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-dark/20 focus:border-blue-dark outline-none transition-all bg-white text-sm">
                                        <option value="">Select Experience</option>
                                        {EXPERIENCE_YEARS.map(year => (
                                            <option key={year} value={year}>{year}+ years</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="qualification" className="text-sm font-bold text-gray-700">Qualification</Label>
                                    <select id="qualification" name="qualification" value={formData.qualification} onChange={handleChange}
                                        className="w-full px-4 h-12 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-dark/20 focus:border-blue-dark outline-none transition-all bg-white text-sm">
                                        <option value="">Select Qualification</option>
                                        {QUALIFICATIONS.map(q => (
                                            <option key={q} value={q}>{q}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Quotes */}
                            <div className="space-y-2">
                                <Label htmlFor="quotes" className="text-sm font-bold text-gray-700">Teacher's Quote</Label>
                                <Textarea id="quotes" name="quotes" value={formData.quotes} onChange={handleChange} placeholder="A short inspirational quote or message..."
                                    className="h-24 rounded-lg border-gray-200 focus:ring-blue-dark resize-none p-4" />
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
                            isUpdateMode={!!facultyData}
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
                            <FormErrorMessage message={internalError.image} className="text-center justify-center" />
                        </div>

                        {/* Action Buttons */}
                        <FormActionButtons status={status} onReset={handleReset} isUpdateMode={!!facultyData} updatingText="Update Teacher" />
                    </div>
                </form>
            </div>
            <p className="max-w-xl mx-auto text-center text-gray-400 text-xs italic">
                Note: Faculty information added here will be showcased on the official school website.
            </p>
        </div>
    );
}