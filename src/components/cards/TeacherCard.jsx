import { GraduationCap, Briefcase, Quote, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { capitalize } from "../../utils/captalize";
import CardActionButtons from "./helpers/CardActionButtons";
import DeletingOverlay from "./helpers/DeletingOverlay";
import DeletionError from "./helpers/DeletionError";

export default function TeacherCard({ teacher, ...facultyProps }) {
    const { handleDelete, deleteLoading, deletingId, deleteError } = facultyProps
    const isDeleting = deleteLoading && deletingId === teacher.id
    const isError = deleteError && deletingId === teacher.id

    return (
        <div className="relative">
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-gray-100 bg-white flex flex-col h-full p-0">
                <CardContent className="p-0 flex flex-col h-full ">
                    {/* Header Information */}
                    <div className="p-4 flex items-center gap-4">
                        <div className="size-16 rounded-md overflow-hidden border border-gray-100 shrink-0 shadow-sm relative group-hover:shadow-md transition-shadow">
                            <img src={teacher.image_url || "/placeholder-avatar.png"} alt={teacher.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-dark transition-colors">
                                {teacher.name.split(" ").map((word) => capitalize(word)).join(" ")}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium truncate capitalize">
                                {teacher.designation.split(" ").map((word) => capitalize(word)).join(" ")}
                            </p>
                            <div className={cn("mt-1.5 w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
                                teacher.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                                {teacher.isActive ? (<><CheckCircle2 className="size-2.5" /> Active</>) : (<><XCircle className="size-2.5" /> Inactive</>)}
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="px-5 space-y-3 flex-1">
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                                    <GraduationCap className="size-3 text-gray-300" /> Qualification
                                </p>
                                <p className="text-xs font-semibold text-gray-700 truncate capitalize">
                                    {teacher.qualification || "N/A"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                                    <Briefcase className="size-3 text-gray-300" /> Experience
                                </p>
                                <p className="text-xs font-semibold text-gray-700 truncate capitalize">
                                    {teacher.experience || "N/A"}
                                </p>
                            </div>
                        </div>

                        {teacher.quotes && (
                            <div className="bg-gray-50/50 p-3 rounded-xl relative group-hover:bg-blue-50/50 transition-colors mt-2">
                                <Quote className="size-3 text-blue-dark/20 absolute top-2 left-2" />
                                <p className="text-[11px] text-gray-500 italic leading-relaxed pl-3 line-clamp-2">
                                    {capitalize(teacher.quotes)}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ID Footer */}
                    <div className="px-5 py-3 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between mt-auto">
                        <p className="text-[9px] font-mono text-gray-300 font-bold uppercase tracking-widest">
                            ID: {teacher.id?.slice(0, 8)}
                        </p>
                    </div>

                    {/* Action Buttons Overlay */}
                    <CardActionButtons
                        editUrl={`/admin/faculty/update/${teacher.id}`}
                        onDelete={() => handleDelete(teacher.id)}
                        isDeleting={isDeleting}
                        editTitle="Edit Faculty"
                        deleteTitle="Delete Faculty"
                    />

                    {/* Deleting Overlay */}
                    <DeletingOverlay isVisible={isDeleting} />
                </CardContent>
            </Card>

            <DeletionError isVisible={isError} />
        </div>
    );
}
