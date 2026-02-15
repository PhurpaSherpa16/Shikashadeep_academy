export default function HeaderForForms({ title, description }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 border-b border-gray-100 pb-8">
            <div className="w-full">
                <h1 className="font-serif font-bold text-gray-900 tracking-tight
                text-center">{title}</h1>
                <p className="text-gray-500 mt-2 text-lg text-center w-full lg:w-2xl mx-auto">{description}</p>
            </div>
        </div>
    )
}