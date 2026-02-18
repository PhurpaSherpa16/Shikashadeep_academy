import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CardActionButtons({ editUrl, onDelete, isDeleting, editTitle = "Edit", deleteTitle = "Delete" }) {
    return (
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={editUrl}
                className="size-8 rounded-full bg-white/90 shadow-sm hover:shadow-md hover:bg-white hover:text-blue-dark border border-gray-100 grid place-items-center transition-all"
                title={editTitle}>
                <Pencil className="size-3.5" />
            </Link>
            <Button size="icon" variant="outline" className="size-8 rounded-full bg-white/90 shadow-sm hover:shadow-md hover:bg-white hover:text-red-600 border border-gray-100 transition-all" 
            onClick={onDelete} disabled={isDeleting} title={deleteTitle}>
                <Trash2 className="size-3.5" />
            </Button>
        </div>
    );
}
