import HeaderForForms from "../../../components/HeaderForForms"

export default function NewProgramAdd(){
    return(
        <div className="animate-in p-8 fade-in slide-in-from-bottom-4 duration-500">
            <HeaderForForms title="Add New Program"/>
            <div className="p-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <p>New Program Add</p>
                </div>
            </div>
        </div>
    )
}