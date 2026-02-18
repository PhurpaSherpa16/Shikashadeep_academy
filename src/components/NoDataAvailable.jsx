import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function NoDataAvailable({ message, link, linkText, height="h-64" }) {
    return (
        <div className={`flex items-center justify-center w-full ${height} border-2 border-blue-dark/20 
        rounded-lg border-dotted`}>
            <p className="text-gray-500 flex flex-col items-center gap-4">
                {message}
                <Link to={link} className="text-blue-dark font-medium flex items-center gap-2
                bg-blue-dark/10 p-2 rounded px-4 hover:bg-blue-dark hover:text-white transition-colors">
                    <Plus className="size-4"/>
                    {linkText}
                </Link>
            </p>
        </div>
    )
}