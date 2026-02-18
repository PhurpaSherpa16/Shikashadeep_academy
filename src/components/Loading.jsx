import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Loading({ className, text = "Loading...", fullPage = false, container = false }) {
    const content = (
        <div className={cn(
            "flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500",
            container && "h-64",
            className
        )}>
            <div className="relative flex items-center justify-center">
                {/* Outer pulse ring */}
                <div className="absolute size-16 rounded-full border-4 border-blue-dark/20 animate-ping" />

                {/* Middle spinning ring */}
                <div className="size-12 rounded-full border-4 border-t-blue-dark border-r-transparent border-b-blue-dark border-l-transparent animate-spin" />

                {/* Inner icon */}
                <Loader2 className="absolute size-6 text-blue-dark animate-pulse" />
            </div>

            {text && (
                <p className="text-sm font-bold text-gray-500 tracking-widest uppercase animate-pulse">
                    {text}
                </p>
            )}
        </div>
    )

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
