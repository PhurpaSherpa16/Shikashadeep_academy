import { useCallback, useEffect, useState } from "react"
import { getAllItems } from "../api/getAllItems"

export const useGetAllItem = (from) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const getAllItemResponse = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getAllItems(from, page, limit)
            console.log(response);
            setData(response?.data)
        } catch (error) {
            console.log('Error', error);
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    },[page, limit, from])

    useEffect(()=>{
        getAllItemResponse(from)
    },[getAllItemResponse, from])

    return { itemLoading: loading, itemError: error, itemsData: data, getAllItemResponse, page, limit, setPage, setLimit}
}