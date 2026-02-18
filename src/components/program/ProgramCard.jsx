import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, GripVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Loading from "../Loading"

export default function ProgramCard({ program, index, ...props}) {

    return (
        <Card className={`group relative overflow-hidden transition-all duration-300 
        hover:shadow-lg border-gray-100 backdrop-blur-sm flex flex-col lg:flex-row
        ${index % 2 === 1 ? "lg:flex-row-reverse bg-gray-50/50" : "bg-white/50"}`}>
            <CardContent className="p-6 space-y-4 w-full lg:w-1/2 flex flex-col justify-between h-full">
                <div className="space-y-3">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{program.grade}</p>
                        <div className="flex items-center justify-between gap-4">
                            <h3 className="font-serif text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-dark transition-colors">
                                {program.title}
                            </h3>
                            <span className="text-xs font-mono text-gray-300 font-black">
                                0{program.displayOrder}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                        {program.description}
                    </p>
                    <div className="grid 2xl:flex gap-2 w-fit flex-wrap pt-2">
                        {program.features?.map((feature, i) => (
                            <div key={i} className="flex items-center gap-1.5 bg-white/80 py-1 px-2.5 rounded-lg shadow-sm border border-gray-100">
                                <CheckCircle2 className="text-green-500 size-3.5" />
                                <span className="text-[10px] font-bold text-gray-600">{feature.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-100/50">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {program.id.slice(0, 8)}</p>
                    <GripVertical className="size-4 text-gray-200" />
                </div>
            </CardContent>

            <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden relative">
                <img
                    src={program.image_url}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={`update/${program.id}`} className="h-8 w-8 rounded-full bg-white/90 hover:bg-white 
                hover:text-blue-dark border-gray-200 grid place-items-center"
                    title="Edit Program">
                    <Pencil className="h-3.5 w-3.5" />
                </Link>
                <Button size="icon" variant="outline" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white hover:text-red-600 border-gray-200"
                    onClick={() => props.handleDelete(program.id)}
                    title="Delete Program">
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>

            {props.loading && props.deletingId === program.id && (
                <div className="absolute top-0 h-full w-full bg-white/60 grid place-items-center">
                    <Loading fullPage={false} text="deleting..."/>
                </div>
            )}
        </Card>
    )
}
