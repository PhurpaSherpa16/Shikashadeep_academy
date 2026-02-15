import { Link } from "react-router-dom"

export default function NoDataAvailable({ message, link, linkText }) {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">{message}
                <Link to={link} className="text-blue-dark font-medium">{" - " + linkText}</Link></p>
        </div>
    )
}