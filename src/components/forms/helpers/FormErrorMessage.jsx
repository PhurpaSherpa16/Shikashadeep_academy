import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FormErrorMessage({ message, className }) {
    if (!message) return null;

    return (
        <p className={cn("text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1", className)}>
            <AlertCircle className="size-3" /> {message}
        </p>
    );
}
