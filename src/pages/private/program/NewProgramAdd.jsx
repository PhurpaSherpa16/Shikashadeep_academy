import HeaderForForms from "../../../components/HeaderForForms";
import ProgramForm from "../../../components/forms/programForm";
import usePostProgram from "../../../hooks/programs/usePostProgram";


export default function NewProgramAdd() {
    
    const {postNewProgram, loading, error} = usePostProgram()

    const handleSubmit = async (formData) => {
        return await postNewProgram(formData)
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms
                title={<>Add a <span className="text-blue-dark">New Program</span></>}
                description="Expand our academic offerings. Fill in the details below to register a new program in the system."/>
            <ProgramForm onSubmit={handleSubmit} loading={loading} error={error}/>
        </div>
    );
}