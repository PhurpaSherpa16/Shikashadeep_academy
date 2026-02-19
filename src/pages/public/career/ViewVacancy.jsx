import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useGetItemById from "../../../hooks/useGetItemById"
import VacancyDetails from "./components/VacancyDetails"
import ApplyForm from "./components/ApplyForm"
import {MoveLeft } from "lucide-react"

export default function ViewVacancy() {
    const { id } = useParams()

    const { getItemById, data, isLoading: vacancyLoading, error: vacancyError } = useGetItemById(id, 'school/job')
    useEffect(() => {
        if (id) {
            getItemById()
        }
    }, [id])
    const vacancyData = data?.data

    const vacancyProps = {
        vacancyData, vacancyLoading, vacancyError
    }
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container mx-auto px-4 py-16">
                {/* back */}
                <Link to="/career" className="pb-8 inline-block group">
                    <p className="flex items-center gap-2 group-hover:text-blue-dark">
                    <MoveLeft className="transition-transform duration-300 group-hover:-translate-x-1 origin-center"/>
                        Return Back
                    </p>
                </Link>
                <div className="grid grid-cols-1 lg:grid-cols-3 space-y-8 lg:space-x-8">
                    <div className="col-span-1 md:col-span-2 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
                        <VacancyDetails {...vacancyProps} />
                    </div>
                    <div className="col-span-1">
                        <ApplyForm id={id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}