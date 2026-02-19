import { RotateCcw, Loader2, CheckCircle2, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FormActionButtons({
    status,
    onReset,
    isUpdateMode = false,
    submitText = "Save Now",
    updatingText = "Update",
    savingLabel = "Saving...",
    updatingLabel = "Updating...",
}) {
    return (
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onReset}
                className="flex-1 rounded-lg font-bold text-gray-500 hover:bg-gray-100 border-gray-200 h-12"
                disabled={status === "saving"}>
                Reset <RotateCcw className="size-4 ml-2" />
            </Button>

            <Button type="submit" disabled={status === "saving" || status === "saved"}
                className={cn("flex-2 rounded-lg font-bold bg-blue-dark hover:bg-blue-dark/90 text-white shadow-lg active:scale-95 transition-all h-12", (status === "saving" || status === "saved") && "opacity-80")}>
                {status === "saving" ? (
                    <><Loader2 className="size-4 mr-2 animate-spin" />
                        {isUpdateMode ? updatingLabel : savingLabel}
                    </>
                ) : status === "saved" ? (
                    <><CheckCircle2 className="size-4 mr-2" />
                        {isUpdateMode ? "Updated" : "Saved"}
                    </>
                ) : status === "failed" ? (
                    <><X className="size-4 mr-2" />
                        {isUpdateMode ? "Update Failed" : "Save Failed"}
                    </>
                ) : (
                    <><Save className="size-4 mr-2" />
                        {isUpdateMode ? updatingText : submitText}
                    </>
                )}
            </Button>
        </div>
    );
}
