import { Sparkles } from "lucide-react";

export default function Header({ searchQuery, setSearchQuery }) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-32">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h1 className="font-serif text-gray-900 tracking-tight">Programs</h1>
                </div>
                <p className="text-gray-400 text-sm font-medium flex items-center gap-1.5 ">
                    <Sparkles className="size-3.5 text-blue-dark" />
                    Curate your educational journey
                </p>
            </div>
        </div>
    )
}