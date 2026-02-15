import { Plus } from "lucide-react";
import { Link } from "react-router-dom";


export default function UploadImagesAlbum({location, text}) {
    return (
        <Link to={`${location}`}
            className="fixed bottom-8 right-8 p-4 bg-blue-dark hover:bg-blue-dark/90 text-white rounded-full 
            shadow-2xl hover:shadow-xl transition-all active:scale-95 z-50 group">
            <Plus className="size-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {text}
            </span>
        </Link> 
    )
}