import { useCallback, useEffect, useState } from "react"
import { getJobAndItsApplicants } from "../../api/career/getJobAndItsApplicants"

export default function useGetJobAndItsApplicants(id) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)

    const fetchJobAndItsApplicantsData = useCallback(async () => {
        try {
            setLoading(true)
            setError("")
            const response = await getJobAndItsApplicants(id, page)
            setData(response)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }, [id, page])

    useEffect(()=>{
        fetchJobAndItsApplicantsData()
    }, [id, page])

    return { refetchJobAndItsApplicantsData: fetchJobAndItsApplicantsData, loading, error, data, page, setPage }
}