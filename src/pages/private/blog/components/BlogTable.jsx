import { Edit2, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogTable({ blogData, handleDeleteBlog, idDeleting }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Story</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {blogData.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-6 py-4 align-middle">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                        <img src={blog.thumbnail_url} alt="" className="size-full object-cover" />
                                    </div>
                                    <div className="max-w-[200px]">
                                        <p className="font-bold text-gray-900 truncate text-sm leading-tight">{blog.title}</p>
                                        <p className="text-[10px] text-gray-400 mt-1 font-medium italic">by Admin</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 align-middle">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                                    style={{ backgroundColor: `${blog.tag?.color}15`, color: blog.tag?.color }}>
                                    {blog.tag?.name || 'News'}
                                </span>
                            </td>
                            <td className="px-6 py-4 align-middle">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 whitespace-nowrap">
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Published
                                </span>
                            </td>
                            <td className="px-6 py-4 align-middle text-right">
                                {idDeleting === blog.id ? (
                                    <div className="flex items-center justify-end gap-1.5 text-red-400 font-medium text-[11px]">
                                        <Loader2 className="size-3.5 animate-spin" />
                                        Deleting...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-end gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link to={`/admin/blogs/update/${blog.id}`}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-(--blueDark) transition-colors">
                                            <Edit2 className="size-4" />
                                        </Link>
                                        <button onClick={() => handleDeleteBlog(blog.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-500 transition-colors">
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}