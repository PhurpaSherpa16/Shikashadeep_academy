export default function DashboardHeader({...headerProps}){
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-32">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h1 className="font-serif text-gray-900 tracking-tight">{headerProps.title}</h1>
                </div>
                <p className="text-gray-400 text-sm font-medium flex items-center gap-1.5 ">
                    {headerProps.icon}
                    {headerProps.description}
                </p>
            </div>
        </div>
    )
}