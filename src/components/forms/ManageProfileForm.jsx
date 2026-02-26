import { useState, useRef, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import FormActionButtons from "./helpers/FormActionButtons";
import FormErrorMessage from "./helpers/FormErrorMessage";
import { toast } from "sonner";

export default function ManageProfileForm({ userData, onSubmit, error }) {
    const [status, setStatus] = useState("idle");
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        image: null,
    });
    const [preview, setPreview] = useState(null);
    const [internalError, setInternalError] = useState({});

    useEffect(() => {
        let timer;
        if (status === "saved" || status === "failed") {
            timer = setTimeout(() => {
                setStatus("idle");
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [status, error]);

    useEffect(() => {
        if (userData && Object.keys(userData).length > 0) {
            setFormData({
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                email: userData?.email || "",
                phone: userData?.phone || "",
                image: userData?.avatar_url || null,
            });
            setPreview(userData?.avatar_url || null);
        }
    }, [userData]);

    const handleReset = () => {
        if (userData) {
            setFormData({
                first_name: userData?.first_name || "",
                last_name: userData?.last_name || "",
                email: userData?.email || "",
                phone: userData?.phone || "",
                image: userData?.avatar_url || null,
            });
            setPreview(userData?.avatar_url || null);
        } else {
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                image: null,
            });
            setPreview(null);
        }
        setInternalError({});
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (internalError[name]) setInternalError((prev) => ({ ...prev, [name]: null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            setInternalError((prev) => ({ ...prev, image: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.first_name?.trim()) newErrors.first_name = "First name is required";
        if (!formData.last_name?.trim()) newErrors.last_name = "Last name is required";
        setInternalError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("saving")
        try {
            await onSubmit(formData);
            setStatus("saved")
        } catch (err) {
            console.log("Error in form submission", err);
            toast.error(err?.message || "Failed to update profile. Please try again.");
        }finally{
            setStatus("idle");
        }
    };

    return (
        <div className="space-y-10">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden relative">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 h-fit">
                    <div className="p-8 lg:p-12 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-100 relative">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name" className="text-sm font-bold text-gray-700">
                                        First Name
                                    </Label>
                                    <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="e.g. John"
                                        className={cn(
                                            "rounded-lg border-gray-200 focus:ring-blue-dark h-12",
                                            internalError.first_name && "border-red-300 bg-red-50"
                                        )}
                                    />
                                    <FormErrorMessage message={internalError.first_name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name" className="text-sm font-bold text-gray-700">
                                        Last Name
                                    </Label>
                                    <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="e.g. Doe"
                                        className={cn(
                                            "rounded-lg border-gray-200 focus:ring-blue-dark h-12",
                                            internalError.last_name && "border-red-300 bg-red-50"
                                        )}
                                    />
                                    <FormErrorMessage message={internalError.last_name} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-bold text-gray-700">
                                    Email
                                </Label>
                                <Input id="email" name="email" value={formData.email} readOnly disabled className="rounded-lg border-gray-200 h-12 bg-gray-50 cursor-not-allowed"
                                />
                                <p className="text-[10px] text-gray-500">Email cannot be changed</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-bold text-gray-700">
                                    Phone
                                </Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +977 98XXXXXXXX" className="rounded-lg border-gray-200 focus:ring-blue-dark h-12" />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12 bg-gray-50/50 flex flex-col justify-between">
                        <div className="space-y-4 flex-1 flex flex-col">
                            <Label className="text-sm font-bold text-gray-700">Profile Photo</Label>
                            <div onClick={() => fileInputRef.current?.click()}
                                className={cn(
                                    "flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative min-h-75",
                                    preview
                                        ? "border-transparent bg-white shadow-inner"
                                        : "border-gray-200 hover:border-blue-dark/50 hover:bg-white"
                                )}>
                                {preview ? (
                                    <img src={preview} alt="Avatar preview" className="size-60 rounded-full border-4 border-gray-200/60 border-dotted p-1 object-cover" />
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
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden"
                                />
                            </div>
                            {preview && (
                                <button type="button" onClick={() => { setPreview(null); setFormData((prev) => ({ ...prev, image: null }))}}
                                    className="flex items-center gap-2 mx-auto mt-2 text-[10px] font-bold text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-red-100 px-3 py-1.5 bg-white transition-colors" >
                                    <X className="size-3" /> Remove Image
                                </button>
                            )}
                        </div>

                        <FormActionButtons status={status} onReset={handleReset} isUpdateMode={!!userData} updatingText="Update Profile"/>
                    </div>
                </form>
            </div>
        </div>
    );
}
