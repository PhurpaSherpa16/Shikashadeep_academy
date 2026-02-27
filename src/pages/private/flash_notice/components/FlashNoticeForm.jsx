import { Calendar, Image as ImageIcon, Layout, Type, FileText, CheckCircle2, RotateCcw, Send } from "lucide-react";

export default function FlashNoticeForm({ ...props }) {
    const { formData, errors, handleChange, handleSubmit, handleUpdate, handleReset, loading, isUpdate } = props

    return (
        <form onSubmit={isUpdate ? handleUpdate : handleSubmit} className="max-w-4xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Title and Content */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Type size={16} className="text-blue-500" />
                            Notice Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a catchy title..."
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                                ${errors.title ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-gray-100 focus:border-blue-400 dark:border-gray-800 dark:focus:border-blue-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'}
                                focus:ring-4 focus:ring-blue-500/10`}
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1 ml-1">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FileText size={16} className="text-blue-500" />
                            Notice Content
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Describe the announcement in detail..."
                            rows={6}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none resize-none
                                ${errors.content ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-gray-100 focus:border-blue-400 dark:border-gray-800 dark:focus:border-blue-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'}
                                focus:ring-4 focus:ring-blue-500/10`}
                        />
                        {errors.content && <p className="text-xs text-red-500 mt-1 ml-1">{errors.content}</p>}
                    </div>
                </div>

                {/* Right Column: Dates, Image, and Status */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" />
                                Start Date
                            </label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                                    ${errors.startDate ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-gray-100 focus:border-blue-400 dark:border-gray-800 dark:focus:border-blue-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'}
                                    focus:ring-4 focus:ring-blue-500/10 uppercase text-sm`}/>
                            {errors.startDate && <p className="text-xs text-red-500 mt-1 ml-1">{errors.startDate}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <Calendar size={16} className="text-blue-500" />
                                End Date
                            </label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
                                    ${errors.endDate ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-gray-100 focus:border-blue-400 dark:border-gray-800 dark:focus:border-blue-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'}
                                    focus:ring-4 focus:ring-blue-500/10 uppercase text-sm`}/>
                            {errors.endDate && <p className="text-xs text-red-500 mt-1 ml-1">{errors.endDate}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <ImageIcon size={16} className="text-blue-500" />
                            Notice Image (Optional)
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                name="image_url"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50/50 dark:bg-gray-900/30 transition-all cursor-pointer overflow-hidden group-hover:bg-blue-50/30"
                            >
                                {formData.image_url ? (
                                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                                        <CheckCircle2 size={20} />
                                        <span>Image selected: {formData.image_url.name}</span>
                                    </div>
                                ) : (
                                    <>
                                        <ImageIcon className="text-gray-400 mb-2" size={32} />
                                        <span className="text-sm text-gray-500">Click to upload or drag & drop</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${formData.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                <Layout size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Active Status</p>
                                <p className="text-xs text-gray-500">Enable to show notice immediately</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={(e) => handleChange({ target: { name: 'isActive', value: e.target.checked } })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                >
                    <RotateCcw size={18} />
                    Reset Form
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Send size={18} className="transition-transform group-hover:translate-x-1" />
                            {isUpdate ? 'Update Notice' : 'Publish Notice'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
