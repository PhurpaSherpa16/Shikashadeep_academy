import { useState, useEffect } from 'react'
import { facilities_data } from '../../../data/about'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Facilties() {
  const [current, setCurrent] = useState(0)
  const length = facilities_data?.items?.length || 0
  const duration = 5000;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, duration)
    return () => clearInterval(interval)
  }, [current, length])

  if (!facilities_data || length === 0) return null;

  return (
    <div className='space-y-12'>
      {/* Header */}
      <div className='space-y-8 max-w-4xl mx-auto text-center'>
        <h1 className='font-serif text-center text-(--blueDark)'>{facilities_data.label}</h1>
        <p className='text-lg text-muted-foreground text-justify md:text-center max-w-2xl mx-auto'>
          {facilities_data.description}
        </p>
      </div>

      {/* Slideshow */}
      <div className='relative w-full md:max-w-xl lg:max-w-6xl rounded-lg h-full mx-auto overflow-hidden shadow-xl flex flex-col
      border'>
        <div className='grid grid-cols-1 lg:grid-cols-2 h-full rounded-lg'>
          {/* Text Section */}
          <div className='p-8 lg:p-16 flex flex-col justify-center order-2 lg:order-1 h-full
          space-y-8'>
            <div className='flex flex-col h-70 md:h-45 lg:h-70'>
              <span className='text-(--blueDark) font-bold tracking-widest uppercase text-sm'>
                Facility {current + 1} / {length}
              </span>
              <div className='space-y-4 animate-in h-full fade-in slide-in-from-left-4 duration-500' key={current}>
                <h2 className='text-3xl md:text-4xl font-serif text-gray-900'>
                  {facilities_data.items[current].title}
                </h2>
                <p className='text-lg text-gray-600 leading-relaxed text-justify'>
                  {facilities_data.items[current].description}
                </p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className='relative flex gap-2 justify-center'>
              {facilities_data.items.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-500 ease-out ${index === current ? 'w-12 bg-gray-200' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  onClick={() => setCurrent(index)}
                >
                  {index === current && (
                    <div
                      className='h-full bg-(--blueDark) origin-left'
                      style={{
                        animation: `progress ${duration}ms linear forwards`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* Image Section */}
          <div className='relative h-full order-1 lg:order-2 overflow-hidden'>
            <img
              key={current}
              src={facilities_data.items[current].image}
              alt={facilities_data.items[current].title}
              className='h-60 lg:h-115 w-full object-cover object-center animate-in fade-in zoom-in-105 duration-700'
            />

            {/* Navigation Buttons */}
            <div className='absolute bottom-20  md:bottom-8 px-8 flex justify-between w-full gap-4 z-10'>
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className='h-12 w-12 rounded-full border-2  text-(--blueDark) hover:bg-(--blueDark) hover:text-white transition-colors bg-white/80'
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className='h-12 w-12 rounded-full border-2 text-(--blueDark) hover:bg-(--blueDark) hover:text-white transition-colors bg-white/80'
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Inline Style for Animation */}
        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
            }
          .animate-progress {
            animation-name: progress;
            animation-timing-function: linear;}`}</style>
      </div>
    </div>
  )
}
