import { CheckCircle2, AlertCircle } from "lucide-react";

export default function FormStatusMessages({
    showSuccess,
    error,
    successMessage = "Saved successfully",
    updateMessage = "Updated successfully",
    isUpdateMode = false
}) {
    return (
        <>
            {showSuccess && (
                <div className="absolute top-4 right-12 z-10 p-4 bg-green-50 border border-green-100 flex items-center gap-3 text-green-600 rounded-lg animate-in slide-in-from-bottom-2 duration-300 shadow-sm">
                    <CheckCircle2 className="size-4" />
                    <p className="text-xs font-bold">{isUpdateMode ? updateMessage : successMessage}</p>
                </div>
            )}
            {error && (
                <div className="absolute top-4 right-12 z-10 p-4 bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 rounded-lg animate-in slide-in-from-bottom-2 duration-300 shadow-sm">
                    <AlertCircle className="size-4" />
                    <p className="text-xs font-bold">{error}</p>
                </div>
            )}
        </>
    );
}
