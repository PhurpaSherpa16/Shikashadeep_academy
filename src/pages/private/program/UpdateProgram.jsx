import { useNavigate, useParams } from "react-router-dom";
import ProgramForm from "../../../components/forms/programForm";
import HeaderForForms from "../../../components/HeaderForForms";
import useGetItemById from "../../../hooks/useGetItemById";
import { useEffect } from "react";
import useUpdateProgram from "../../../hooks/programs/useUpdateProgram";
import Loading from "../../../components/Loading"


export default function UpdateProgram() {
    const {id} = useParams()
    const navigate = useNavigate()

    // loading data
    const {itemLoading, itemError, data, getItemById} = useGetItemById(id, "programs")
    const programData = data?.data
    useEffect(() => {
        if(id){
            getItemById()
        }
    }, [id])

    // hook for update
    const {update, loading, error, success} = useUpdateProgram()

    useEffect(() => {
        if(success){
            const timer = setTimeout(() => {
                navigate(`/admin/programs/update/${id}`)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [success, navigate, id])

    const handleSubmit = async (data) => {
        return await update(id, data)
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <HeaderForForms
                title={<>Update a <span className="text-blue-dark">Program</span></>}
                description="Update the program details below to register a new program in the system."/>
            {
                itemLoading ? (
                    <Loading container={true} text="Fetching program details..." />
                ) : itemError ? (
                    <div className="bg-red-50 border border-red-100 p-8 rounded-2xl text-center">
                        <p className="text-red-500 font-bold">{itemError}</p>
                    </div>
                ) : (
                    <ProgramForm onSubmit={handleSubmit} loading={loading} error={error}
                    programData={programData}/>
                )
            }
        </div>
    )
}