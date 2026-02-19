import { useState } from "react";
import Loading from "../../../../components/Loading";
import IconPagination from "../../../../components/pagination/IconPagination";
import JobApplicationDialog from "./JobApplicationDialog";
import OpeningCard from "./OpeningCard";
import Error from "../../../../components/Error";
import { Briefcase } from "lucide-react";

export default function VacancyTable({...vacancyProps}) {
    const {jobs=[], loading, error, page, setPage, total_items: totalItems, total_pages : totalPages} = vacancyProps
    const [applyingJob, setApplyingJob] = useState(null)

    if (loading && jobs.length === 0) {
        return <div className="py-20"><Loading text="Loading vacancies..." /></div>;
    }

    if (error) return <div className="py-8"><Error message="Failed to load vacancies. Please try again later." /></div>

    if (jobs.length === 0) return (
            <div className="py-16 text-center border-2 border-blue-dark/30 my-16 p-16 rounded-lg border-dotted animate-in fade-in zoom-in duration-300">
                <div className="size-16 rounded-2xl bg-blue-dark/60 grid place-items-center mx-auto mb-4">
                    <Briefcase className="size-7 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-600">No Open Positions</p>
                <p className="text-sm text-gray-400 mt-1">Check back later for new opportunities!</p>
            </div>
        )

    return (
        <>
            <div className="w-full max-w-4xl mt-12 space-y-4">
                {jobs.map((job) => (
                    <OpeningCard key={job.id} job={job} setApplyingJob={setApplyingJob} />
                ))}
                <IconPagination page={page} setPage={setPage} totalPages={totalPages} totalItems={totalItems} itemLabel="vacancies" />
            </div>

            {/* Application Dialog */}
            <JobApplicationDialog job={applyingJob} open={!!applyingJob} onClose={() => setApplyingJob(null)}/>
        </>
    );
}
