
export default function usePostProgram(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const postProgram = async (programData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await postProgram(programData)
            setData(response?.data)
        } catch (error) {
            setError(error.message || "Something went wrong")
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, data, postProgram }
}