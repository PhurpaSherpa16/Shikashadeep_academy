import { Search } from "lucide-react";


export default function ImageCard({ item, handleOpenViewer, index }) {
    return (
        <div
            key={item.id}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            onClick={()=>handleOpenViewer(index)}>
            <div className="aspect-4/3 relative overflow-hidden">
                <img
                    src={item.image}
                    alt={item.label}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#1800ad]/10" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="p-3 bg-white/20 backdrop-blur rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Search className="size-6" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                        <h3 className="font-bold text-gray-900 truncate">{item.label}</h3>
                        <p className="text-xs text-gray-500 truncate mt-1">{item.caption}</p>
                        <div className='flex gap-1'>
                            {item.tag.map((t, i)=>(
                            <button key={i} className='text-black/60 text-sm'>#{t}</button>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}