import { values_data } from '../../../../data/about'
import { Separator } from "@/components/ui/separator"

export default function Values() {
  if (!values_data) return null;

  return (
    <div className='grid place-items-center'>
      <div className="custom_paddings space-y-16">
        {/* Header */}
        <div className='space-y-8 max-w-4xl mx-auto text-center'>
          <h1 className='font-serif text-center text-(--blueDark)'>{values_data.label}</h1>
          <p className='text-lg text-muted-foreground text-justify md:text-center max-w-2xl mx-auto'>
            {values_data.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className='grid gap-6 md:gap-8'>
          {values_data.values.map((value, index) => (
            <div key={index} className='space-y-8'>
              <div className={`grid place-items-center lg:flex items-center gap-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`border-(--blueDark) py-4 ${index % 2 !== 0 ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} order-2 lg:order-1`}>
                  <div className='relative'>
                    <h2 className='font-serif text-2xl'>{value.title}</h2>
                    <p className='text-gray-800 flex relative text-justify md:text-left'>
                      {value.description}</p>
                  </div>
                </div>
                <img src={value.image} alt={value.title} className='size-50 object-center object-cover rounded-lg order-1 lg:order-2' />
              </div>
              {index !== values_data.values.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
