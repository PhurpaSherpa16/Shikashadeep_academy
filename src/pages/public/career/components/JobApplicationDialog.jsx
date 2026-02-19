import { useState } from "react";
import { X, User, Mail, Phone, FileText, Upload, Send, Briefcase } from "lucide-react";
import { capitalize } from "../../../../utils/captalize";

export default function JobApplicationDialog({ job, open, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cover_letter: "",
        resume_url: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume_url") {
            setFormData(prev => ({ ...prev, resume_url: files[0] || null }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.cover_letter.trim()) newErrors.cover_letter = "Cover letter is required";
        if (!formData.resume_url) newErrors.resume_url = "Resume is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // TODO: hook up backend submission here
        console.log("Submitting application:", formData);
    };

    const resetAndClose = () => {
        setFormData({ name: "", email: "", phone: "", cover_letter: "", resume_url: null });
        setErrors({});
        onClose();
    };

    if (!open) return null;

    const jobTitle = job?.title?.split(' ').map(word => capitalize(word)).join(' ') || "Position";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={resetAndClose} />

            {/* Dialog */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-t-2xl px-6 py-5">
                    <button onClick={resetAndClose} className="absolute top-4 right-4 size-8 rounded-full bg-white/20 hover:bg-white/30 
                        grid place-items-center text-white transition-colors">
                        <X className="size-4" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-white/20 grid place-items-center">
                            <Briefcase className="size-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Apply for Position</h2>
                            <p className="text-sm text-blue-100 font-medium">{jobTitle}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="size-3.5 text-blue-500" /> Full Name
                        </label>
                        <input
                            id="name" name="name" type="text" placeholder="Enter your full name"
                            value={formData.name} onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.name ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="size-3.5 text-blue-500" /> Email Address
                        </label>
                        <input
                            id="email" name="email" type="email" placeholder="you@example.com"
                            value={formData.email} onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.email ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <Phone className="size-3.5 text-blue-500" /> Phone Number
                        </label>
                        <input
                            id="phone" name="phone" type="tel" placeholder="+977 98XXXXXXXX"
                            value={formData.phone} onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.phone ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1.5">
                        <label htmlFor="cover_letter" className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="size-3.5 text-blue-500" /> Cover Letter
                        </label>
                        <textarea
                            id="cover_letter" name="cover_letter" rows={4}
                            placeholder="Tell us why you'd be a great fit for this role..."
                            value={formData.cover_letter} onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.cover_letter ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.cover_letter && <p className="text-[11px] text-red-500 font-medium">{errors.cover_letter}</p>}
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-1.5">
                        <label htmlFor="resume_url" className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                            <Upload className="size-3.5 text-blue-500" /> Resume / CV
                        </label>
                        <div className={`relative rounded-xl border-2 border-dashed transition-all duration-200 
                            ${errors.resume_url ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/30 hover:border-blue-300 hover:bg-blue-50/20"}`}>
                            <input
                                id="resume_url" name="resume_url" type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="size-10 rounded-xl bg-blue-50 grid place-items-center mb-2">
                                    <Upload className="size-4.5 text-blue-500" />
                                </div>
                                {formData.resume_url ? (
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-blue-700">{formData.resume_url.name}</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">{(formData.resume_url.size / 1024).toFixed(1)} KB — Click to change</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-gray-500">
                                            <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">PDF, DOC, or DOCX (max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {errors.resume_url && <p className="text-[11px] text-red-500 font-medium">{errors.resume_url}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button type="button" onClick={resetAndClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600
                                hover:bg-gray-50 active:scale-[0.97] transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
                                bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-sm
                                hover:from-blue-700 hover:to-indigo-700 hover:shadow-md
                                active:scale-[0.97] transition-all duration-200">
                            <Send className="size-4" /> Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
