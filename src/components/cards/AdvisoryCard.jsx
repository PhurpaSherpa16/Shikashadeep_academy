import { Quote, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { capitalize } from "../../utils/captalize";
import CardActionButtons from "./helpers/CardActionButtons";
import DeletingOverlay from "./helpers/DeletingOverlay";
import DeletionError from "./helpers/DeletionError";

export default function AdvisoryCard({ advisory, ...advisoryProps }) {
    const { advisoryHandleDelete, deleteLoading, deletingId, deleteError } = advisoryProps;
    const isDeleting = deleteLoading && deletingId === advisory.id;
    const isError = deleteError && deletingId === advisory.id;

    return (
        <div className="relative">
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-gray-100 bg-white flex flex-col h-full p-0">
                <CardContent className="p-0 flex flex-col h-full ">
                    {/* Header Information */}
                    <div className="p-4 flex items-center gap-4">
                        <div className="size-16 rounded-md overflow-hidden border border-gray-100 shrink-0 shadow-sm relative group-hover:shadow-md transition-shadow text-white">
                            <img src={advisory.image_url || "/placeholder-avatar.png"} alt={advisory.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-dark transition-colors">
                                {advisory.name.split(" ").map((word) => capitalize(word)).join(" ")}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium truncate capitalize">
                                {advisory.designation.split(" ").map((word) => capitalize(word)).join(" ")}
                            </p>
                            <div className={cn("mt-1.5 w-fit px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
                                advisory.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600")}>
                                {advisory.isActive ? (<><CheckCircle2 className="size-2.5" /> Active</>) : (<><XCircle className="size-2.5" /> Inactive</>)}
                            </div>
                        </div>
                    </div>

                    {/* Quote Section */}
                    {advisory.quotes && (
                        <div className="px-5 pb-5 flex-1">
                            <div className="bg-gray-50/50 p-3 rounded-xl relative group-hover:bg-blue-50/50 transition-colors">
                                <Quote className="size-3 text-blue-dark/20 absolute top-2 left-2" />
                                <p className="text-[11px] text-gray-500 italic leading-relaxed pl-3 line-clamp-3">
                                    {capitalize(advisory.quotes)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons Overlay */}
                    <CardActionButtons editUrl={`/admin/faculty/advisory/update/${advisory.id}`} onDelete={() => advisoryHandleDelete(advisory.id)} 
                    isDeleting={isDeleting} editTitle="Edit Advisory" 
                    deleteTitle="Delete Advisory" />

                    {/* Deleting Overlay */}
                    <DeletingOverlay isVisible={isDeleting} />
                </CardContent>
            </Card>

            <DeletionError isVisible={isError} />
        </div>
    );
}
