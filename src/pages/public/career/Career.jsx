import { useEffect } from "react"
import { useGetAllItem } from "../../../hooks/useGetAllItem"
import VacancyTable from "./components/VacancyTable"

export default function Career() {
    useEffect(() => { window.scrollTo(0, 0) }, [])
    const header = {
        title: "Join Our Team - Our Opening",
        description: "Explore exciting career opportunities and become part of a team that values growth, innovation, and impact. Find the role that matches your skills and start building your future with us."
    }

    const { loading, error, data, page, setPage } = useGetAllItem('school/vacancy-announcement')

    const jobs = data?.result || []
    const total_items = data?.total_items || 0
    const total_pages = data?.total_pages || 0

    const vacancyProps = {jobs, loading, error, page, setPage, total_items, total_pages}

    console.log(jobs)

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50/40 to-white">
            <div className="container mx-auto flex flex-col items-center px-4 py-16">
                <div className="text-center max-w-2xl">
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">{header.title}</h1>
                    <p className="text-gray-500 mt-3 text-sm sm:text-base leading-relaxed">{header.description}</p>
                </div>
                <VacancyTable {...vacancyProps}/>
            </div>
        </div>
    )
}