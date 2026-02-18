import { AlertCircle } from "lucide-react";

export default function DeletionError({ isVisible, message = "Deletion failed. Please try again." }) {
    if (!isVisible) return null;

    return (
        <div className="absolute -bottom-6 left-2 right-0 flex items-center gap-1.5 text-red-600 animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="size-3" />
            <p className="text-[10px] font-bold">{message}</p>
        </div>
    );
}
