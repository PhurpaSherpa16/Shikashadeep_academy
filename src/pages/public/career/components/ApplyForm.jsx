import { User, Mail, Phone, FileText, Upload, Send, Briefcase, CheckCircle2, Loader2, RefreshCcw } from "lucide-react"
import useApplyForm from "../../../../hooks/career/useApplyForm"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ApplyForm({id}) {
    const {formData, errors, handleChange, handleSubmit, handleReset, submitState} = useApplyForm()
    return (
        <div className="sticky top-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-blue-dark to-indigo-600 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="size-9 rounded-xl bg-white/20 grid place-items-center">
                            <Briefcase className="size-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-white">Apply Now</h2>
                            <p className="text-xs text-blue-100 font-medium">Fill in your details below</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={(e) => handleSubmit(e, id)} className="p-5 space-y-4">

                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label htmlFor="apply-name" className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="size-3 text-blue-500" /> Full Name
                        </label>
                        <input
                            id="apply-name" name="name" type="text" placeholder="Enter your full name"
                            value={formData.name} onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.name ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="apply-email" className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Mail className="size-3 text-blue-500" /> Email Address
                        </label>
                        <input
                            id="apply-email" name="email" type="email" placeholder="you@example.com"
                            value={formData.email} onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.email ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label htmlFor="apply-phone" className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Phone className="size-3 text-blue-500" /> Phone Number
                        </label>
                        <input
                            id="apply-phone" name="phone" type="tel" placeholder="+977 98XXXXXXXX"
                            value={formData.phone} onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.phone ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1.5">
                        <label htmlFor="apply-cover" className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="size-3 text-blue-500" /> Cover Letter
                        </label>
                        <textarea
                            id="apply-cover" name="cover_letter" rows={3}
                            placeholder="Tell us why you'd be a great fit..."
                            value={formData.cover_letter} onChange={handleChange}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                                ${errors.cover_letter ? "border-red-300 bg-red-50/50" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
                        />
                        {errors.cover_letter && <p className="text-[11px] text-red-500 font-medium">{errors.cover_letter}</p>}
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-1.5">
                        <label htmlFor="apply-resume" className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                            <Upload className="size-3 text-blue-500" /> Resume / CV
                        </label>
                        <div className={`relative rounded-xl border-2 border-dashed transition-all duration-200 
                            ${errors.document_url ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50/30 hover:border-blue-300 hover:bg-blue-50/20"}`}>
                            <input
                                id="apply-resume" name="document_url" type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center py-5">
                                <div className="size-9 rounded-xl bg-blue-50 grid place-items-center mb-2">
                                    <Upload className="size-4 text-blue-500" />
                                </div>
                                {formData.document_url ? (
                                    <div className="text-center">
                                        <p className="text-xs font-semibold text-blue-700">{formData.document_url.name}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">
                                            {(formData.document_url.size / 1024).toFixed(1)} KB — Click to change
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="text-xs font-medium text-gray-500">
                                            <span className="text-blue-600 font-semibold">Click to upload</span> or drag & drop
                                        </p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">PDF, DOC, or DOCX (max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {errors.document_url && <p className="text-[11px] text-red-500 font-medium">{errors.document_url}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4 mt-8 border-t border-gray-100">
                        <Button type="button" variant="outline" onClick={handleReset}
                            className="group flex-1 rounded-lg font-bold text-gray-500 hover:bg-gray-100 border-gray-200"
                            disabled={submitState === "saving"}>
                            Reset <RefreshCcw className="transition-transform duration-300 group-hover:rotate-180 origin-center" />
                        </Button>
                        <Button type="submit" disabled={submitState === "saving"}
                            className={cn("group flex-2 rounded-lg font-bold bg-linear-to-r from-blue-dark to-indigo-600 text-white shadow-lg active:scale-95 transition-all", (submitState === "saving") && "opacity-80")}>
                            {submitState === "saving" ? (
                                <><Loader2 className="size-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <><Send className="size-4 mr-2 transition-transform duration-300 group-hover:translate-x-1 
                                group-hover:-translate-y-1 group-hover:scale-90 origin-center" />
                                    Submit Application
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
