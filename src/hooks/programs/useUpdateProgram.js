import { useState } from "react"
import updateProgramById from "../../api/programs/updateProgramById"

export default function useUpdateProgram() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const update = async(id, formData) =>{
        console.log('Updating,', id, formData)
        try {
            setLoading(true)
            setError(null)
            setSuccess(false)
            const result = await updateProgramById(id, formData)
            console.log(result)
            if(result.success){
                setSuccess(true)
                return result
            }else{
                throw new Error(result.message || "Update failed")
            }
        } catch (error) {
            console.error("useUpdateProgram Error:", error)
            setError(error.message || "An unexpected error occurred while updating.")
            setLoading(false)
            return false
        } finally {
            setLoading(false)
        }
    }
    return {loading, error, success, update}
}