import {mission_data} from '../../../data/about'


export default function Mission() {
  return (
    <div className='grid place-items-center'>   
    <div className="custom_paddings space-y-16">
      <div className="space-y-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{mission_data.label}</h1>

        {/* Image + Description */}
        <div className="">
          <img src={mission_data.image} alt="mission" className="rounded-xl object-cover float-left size-64 p-4"/>
          <p className="text-justify text-gray-700 leading-relaxed">{mission_data.description}</p>
        </div>

        {/* Highlight Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <p className="text-justify border-l-4 border-(--blueDark) pl-4 text-lg 
          lg:text-xl font-light italic text-gray-800 order-2 lg:order-1">
            {mission_data.hightlight}
          </p>
          <img src={mission_data.hightlightImage} alt="mission highlight"
            className="w-full h-56 md:h-64 object-cover rounded-xl shadow-lg order-1 lg:order-2"/>
        </div>
      </div>
    </div>
    </div>
  )
}
