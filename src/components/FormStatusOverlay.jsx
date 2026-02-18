import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function FormStatusOverlay({
    show,
    status,
    successMessage = "Saved successfully",
    errorMessage = "Failed to save",
    error
}) {
    if (!show) return null;

    const isSuccess = status === "saved";
    const isError = status === "failed" || error;

    if (!isSuccess && !isError) return null;

    return (
        <div className={`absolute top-4 right-12 z-10 p-4 flex items-center gap-3 rounded-lg animate-in slide-in-from-bottom-2 duration-300 shadow-sm border 
            ${isSuccess ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
            {isSuccess ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            <p className="text-xs font-bold">
                {isSuccess ? successMessage : (error || errorMessage)}
            </p>
        </div>
    );
}
