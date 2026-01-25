import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef } from "react";

export default function ImageViewer({ src, onClose, setCurrentIndex, gallery, currentIndex}) {
    const slideRef = useRef(null)
    const scrollAmount = 100;

    const onHandlePrev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex - 1 < 0) {
            // jump to last slide
            slideRef.current.scrollTo({
                left: slideRef.current.scrollWidth,
                behavior: "smooth",
            });
            return gallery.length - 1;
            } else {
            slideRef.current.scrollBy({
                left: -scrollAmount,
                behavior: "smooth",
            });
            return prevIndex - 1;
            }
        });
    };

    const onHandleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= gallery.length) {
            // jump to first slide
            slideRef.current.scrollTo({
                left: 0,
                behavior: "smooth",
            });
            return 0;
            } else {
            slideRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
            return prevIndex + 1;
            }
        });
    };

    if (!src) return null;

  return (
    <div className="fixed h-screen inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center px-4">
      <button onClick={onClose} className="absolute top-5 right-5 text-white 
        hover:scale-110 transition">
        <X size={32} className="hover:text-red-500 relative z-10"/>
      </button>
        <div className="text-white/60 absolute z-20 flex justify-between w-full px-4 lg:px-16">
            <button className='bg-white/40 hover:bg-white/80 rounded-full p-2'
            onClick={onHandlePrev}>
                <ChevronLeft className="hover:text-black size-8"/>
            </button>
            <button className='bg-white/40 hover:bg-white/80 rounded-full p-2'
            onClick={onHandleNext}>
                <ChevronRight className="hover:text-black size-8"/>
            </button>
        </div>
        <div className="flex gap-8">
            <div className="grid col-span-8 gap-8 py-8">
                <div className="grid place-items-center">
                    <img src={src} alt="preview" className="relative h-[50vh] md:h-[60vh] lg:h-[80vh] w-fit rounded shadow-xl object-top object-cover"/>
                </div>
                <div className="bottom-8 w-screen px-4 2xl:px-32 grid md:flex gap-4  justify-between ">
                    <div className="text-white relative py-2 px-4 bg-black/60 backdrop-blur rounded-lg 
                    grid overflow-hidden">
                        <div>
                            <h2 className="text-sm md:text-xl">{gallery[currentIndex].label}</h2>
                            <p className="text-sm text-white/60">{gallery[currentIndex].caption}</p>
                            <div className="flex gap-1 ">{gallery[currentIndex].tag.map((item, index)=>(
                                <button key={index} className="text-white/60 hover:text-white
                                text-sm md:">#{item}</button>
                            ))}</div>
                        </div>
                    </div>
                    <div ref={slideRef} className="flex gap-3 shadow-lg shadow-black/60 bg-black/60 p-2 rounded-lg 
                    md:w-md lg:w-lg snap-x scrollbar-hide
                    overflow-x-scroll">
                        {gallery.map((item, index)=>(
                            <button key={index} onClick={()=>{
                                setCurrentIndex(index)
                            }} 
                            className="relative group rounded overflow-hidden shrink-0">
                                <img src={item.image} alt="image" className="size-20 rounded object-top object-cover relative"/>
                                <div className={`absolute inset-0
                                ${currentIndex === index ? 'bg-transparent' : 'bg-black/40 group-hover:bg-transparent' }
                                `} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
