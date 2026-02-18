import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, GripVertical, Save, RefreshCw, Layers, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUpdateDisplayOrder } from "../../hooks/programs/useUpdateDisplayOrder"

export default function ArrangeProgram({ programs = [], onSuccess }) {
    const [isOpen, setIsOpen] = useState(false)
    const [list, setList] = useState([])
    const [feedback, setFeedback] = useState({ state: 'idle', message: '' }) // idle, success, error
    const { reorderLoading, reorderItems } = useUpdateDisplayOrder()

    // Sync local list with programs prop
    useEffect(() => {
        setList(programs)
    }, [programs])

    // --- Drag and Drop Logic (Native HTML5) ---
    const [draggedItemIndex, setDraggedItemIndex] = useState(null)

    const onDragStart = (e, index) => {
        setDraggedItemIndex(index)
        e.dataTransfer.effectAllowed = "move"
        // Add a ghost image class or style if needed
        e.target.style.opacity = "0.5"
    }

    const onDragEnd = (e) => {
        e.target.style.opacity = "1"
        setDraggedItemIndex(null)
    }

    const onDragOver = (index) => {
        if (draggedItemIndex === null || draggedItemIndex === index) return

        const newList = [...list]
        const draggedItem = newList[draggedItemIndex]

        // Remove item from old position
        newList.splice(draggedItemIndex, 1)
        // Insert item into new position
        newList.splice(index, 0, draggedItem)

        setDraggedItemIndex(index)
        setList(newList)
    }

    const handleSave = async () => {
        if (reorderLoading) return

        try {
            await reorderItems(list)
            setFeedback({ state: 'success', message: 'Saved' })
            if (onSuccess) onSuccess()

            setTimeout(() => {
                setFeedback({ state: 'idle', message: '' })
            }, 3000)
        } catch (error) {
            setFeedback({ state: 'error', message: 'Failed, try later' })
            setTimeout(() => {
                setFeedback({ state: 'idle', message: '' })
            }, 3000)
        }
    }

    return (
        <Card className="border-gray-100 shadow-xl overflow-hidden bg-white/40 backdrop-blur-md transition-all duration-500 rounded-lg
        group/card border-2 hover:border-blue-dark/20 space-y-2">
            <CardHeader className="flex flex-row items-center justify-between cursor-pointer bg-linear-gradient-to-r from-gray-50/50 to-transparent"
                onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-blue-dark/10 flex items-center justify-center group-hover/card:bg-blue-dark/20 transition-colors">
                        <Layers className="size-4 text-blue-dark" />
                    </div>
                    <div>
                        <CardTitle className="text-sm font-bold text-gray-900 uppercase tracking-widest">Arrange Order</CardTitle>
                        <p className="text-xs text-gray-400 mt-0.5 tracking-tight">Drag to reorder landing feed</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8 rounded-xl text-gray-400">
                        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </Button>
                </div>
            </CardHeader>

            {isOpen && (
                <CardContent className="p-5 pt-0 animate-in slide-in-from-top-4 duration-500">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2.5 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
                            {list.length > 0 ? list.map((p, i) => (
                                <div key={p.id} draggable
                                    onDragStart={(e) => onDragStart(e, i)} onDragEnd={onDragEnd}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        onDragOver(i)
                                    }}
                                    className={`relative group flex items-center gap-4 bg-white p-3.5 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-dark/20 cursor-grab active:cursor-grabbing ${draggedItemIndex === i ? 'opacity-0 scale-95' : 'opacity-100'}`}>
                                    <div className="size-8 rounded-xl bg-gray-50 flex items-center justify-center 
                                    text-[10px] font-bold text-black/60 border border-gray-100 
                                    group-hover:text-black transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] text-black/60 uppercase tracking-widest leading-none">{p.grade}</p>
                                        <h2 className="text-sm font-bold text-gray-800 line-clamp-1 truncate mt-0.5">{p.title}</h2>
                                    </div>
                                    <GripVertical className="size-4 text-gray-300 group-hover:text-blue-dark/40 transition-colors shrink-0" />
                                </div>
                            )) : (
                                <div className="text-center py-10 opacity-40 italic text-xs">No programs to arrange</div>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                onClick={handleSave}
                                disabled={reorderLoading || list.length === 0}
                                className={`w-full bg-blue-dark hover:bg-blue-dark/90 text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-blue-dark/20 gap-2.5 transition-all active:scale-95 disabled:opacity-50 h-10 ${feedback.state === 'success' ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20' :
                                        feedback.state === 'error' ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' : ''
                                    }`}
                            >
                                {reorderLoading ? (
                                    <RefreshCw className="size-4 animate-spin" />
                                ) : feedback.state === 'success' ? (
                                    <CheckCircle2 className="size-4" />
                                ) : feedback.state === 'error' ? (
                                    <AlertCircle className="size-4" />
                                ) : (
                                    <Save className="size-4" />
                                )}
                                {reorderLoading ? "Saving Changes..." :
                                    feedback.state === 'success' ? feedback.message :
                                        feedback.state === 'error' ? feedback.message :
                                            "Save"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}
