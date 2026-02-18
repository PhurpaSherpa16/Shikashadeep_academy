import { Loader2, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FormSubmitButton({
    loading,
    status,
    idleText = "Save Now",
    loadingText = "Saving...",
    successText = "Saved",
    failedText = "Save Failed",
    IdleIcon,
    className}) {
    return (
        <Button type="submit" disabled={loading}
            className={cn("flex-2 rounded-lg font-bold bg-blue-dark hover:bg-blue-dark/90 text-white shadow-lg active:scale-95 transition-all h-12",
                loading && "opacity-80",
                className
            )}>
            {loading ? (
                <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    {loadingText}
                </>
            ) : status === "saved" ? (
                <>
                    <CheckCircle2 className="size-4 mr-2" />
                    {successText}
                </>
            ) : status === "failed" ? (
                <>
                    <X className="size-4 mr-2" />
                    {failedText}
                </>
            ) : (
                <>
                    {IdleIcon && <IdleIcon className="size-4 mr-2" />}
                    {idleText}
                </>
            )}
        </Button>
    );
}
