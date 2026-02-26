import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function NoItemsForPublic({message, link, linkText}) {
    return (
        <div className="h-full w-md  border-3 border-dotted border-indigo-500 rounded-lg grid place-items-center py-16">
            <div className="flex flex-col gap-4">
                <p>{message}</p>
                <div>
                    <Link to={link} className="flex items-center justify-center gap-2 text-blue-dark bg-indigo-600/20 p-2 rounded-lg">
                        <RotateCcw className="size-4" />
                        {linkText}
                    </Link>           
                </div>
            </div>
        </div>
    )
}