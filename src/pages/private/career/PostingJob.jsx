import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import HeaderForForms from "../../../components/HeaderForForms";
import FormActionButtons from "../../../components/forms/helpers/FormActionButtons";
import useJobForm from "../../../hooks/career/useJobForm";
import { Briefcase, MapPin, Calendar, DollarSign, FileText, CheckCircle } from "lucide-react";

export default function PostingJob() {
    const { formData, errors, submitState, handleChange, handleSubmit, handleReset } = useJobForm();

    return (
        <div className="dashboard_layout animate_in max-w-5xl mx-auto pb-12">
            <HeaderForForms
                title="Post New Job"
                description="Fill in the details below to create a new job vacancy posting."
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Basic Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="size-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-800">General Information</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-gray-600">Job Title <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior Secondary Teacher"
                                            className={errors.title ? "border-red-500" : "border-gray-200"}
                                        />
                                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-gray-600">Job Description <span className="text-red-500">*</span></Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Provide a detailed description of the role..."
                                            className={`min-h-[150px] ${errors.description ? "border-red-500" : "border-gray-200"}`}
                                        />
                                        {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="requirements" className="text-gray-600">Requirements</Label>
                                        <Textarea
                                            id="requirements"
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleChange}
                                            placeholder="List specific skills or attributes required..."
                                            className="min-h-[100px] border-gray-200"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="size-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="qualification" className="text-gray-600">Qualification</Label>
                                        <Input
                                            id="qualification"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            placeholder="e.g. Masters in Education"
                                            className="border-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience" className="text-gray-600">Experience</Label>
                                        <Input
                                            id="experience"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            placeholder="e.g. 2+ years"
                                            className="border-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="jobType" className="text-gray-600">Job Type</Label>
                                        <select
                                            id="jobType"
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleChange}
                                            className="w-full flex h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <option value="Full Time">Full Time</option>
                                            <option value="Part Time">Part Time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Freelance">Freelance</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="salary" className="text-gray-600">Salary Range</Label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                            <Input
                                                id="salary"
                                                name="salary"
                                                value={formData.salary}
                                                onChange={handleChange}
                                                placeholder="e.g. 30k - 50k"
                                                className="pl-9 border-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Meta Info & Actions */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="size-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-800">Location & Dates</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-gray-600">Location</Label>
                                        <Input
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Kathmandu, Nepal"
                                            className="border-gray-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate" className="text-gray-600">Start Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                            <Input
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="pl-9 border-gray-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate" className="text-gray-600">End Date (Deadline)</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                            <Input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="pl-9 border-gray-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="size-5 text-blue-600" />
                                    <h3 className="text-lg font-semibold text-gray-800">Additional Options</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="document_url" className="text-gray-600">Job Document (PDF/JD)</Label>
                                        <Input
                                            id="document_url"
                                            name="document_url"
                                            type="file"
                                            onChange={handleChange}
                                            className="border-gray-200"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <input
                                            id="isActive"
                                            name="isActive"
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={handleChange}
                                            className="size-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                        />
                                        <Label htmlFor="isActive" className="text-sm font-medium text-blue-900 cursor-pointer">
                                            Publish immediately
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="pt-2">
                            <FormActionButtons
                                status={submitState === "submitting" ? "saving" : submitState === "submitted" ? "saved" : submitState === "error" ? "failed" : "idle"}
                                onReset={handleReset}
                                submitText="Post Job Now"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}