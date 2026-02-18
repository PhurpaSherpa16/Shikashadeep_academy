import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, message, className, height }) {
    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-50/50 border border-red-100 rounded-3xl gap-6 animate-in fade-in zoom-in duration-300 ${height || "h-80"} ${className}`}>
            <div className="bg-white size-16 rounded-2xl shadow-sm flex items-center justify-center text-red-500">
                <AlertCircle className="size-8" />
            </div>
            <div className="space-y-2 max-w-sm">
                <h3 className="text-lg font-bold text-gray-900">Oops! Something went wrong</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {error || message || "We're having trouble loading this section. Please try again later."}
                </p>
            </div>
            <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="rounded-xl border-gray-200 hover:bg-white hover:text-blue-dark font-bold gap-2"
            >
                <RefreshCcw className="size-4" />
                Retry Loading
            </Button>
        </div>
    );
}