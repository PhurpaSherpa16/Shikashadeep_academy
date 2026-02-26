import DashboardHeader from "../../../components/DashboardHeader";
import { LayoutDashboard, Sparkles } from "lucide-react";
import { useHomeData } from "../../../hooks/home/useHomeData";
import LatestPrograms from "./components/LatestPrograms";
import LatestAdmissions from "./components/LatestAdmissions";
import LatestGalleryImages from "./components/LatestGalleryImages";
import LatestQueries from "./components/LatestQueries";
import HomeInsights from "./components/HomeInsights";
import ViewAllQuickAccess from "./components/ViewAllQuickAccess";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function Home() {
    const userString = localStorage.getItem("user");
    const userData = userString ? JSON.parse(userString) : null;
    const firstName = userData?.first_name || "Admin";

    const { data, loading, error } = useHomeData();

    const headerProps = {
        title: `Welcome back, ${firstName}`,
        description: "Your academy dashboard. Overview of programs, admissions, gallery, and more.",
        icon: <LayoutDashboard className="text-blue-dark size-4" />,
    };

    if (error) {
        return (
            <div className="dashboard_layout animate_in">
                <DashboardHeader {...headerProps} />
                <Error error={error} message="Failed to load dashboard" height="h-96" />
            </div>
        );
    }

    return (
        <div className="dashboard_layout animate_in">
            <DashboardHeader {...headerProps} />

            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-10 text-white shadow-xl mb-8">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="size-5 text-amber-300" />
                        <span className="text-sm font-medium text-blue-100">Shikshadeep Academy</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Administration Portal</h2>
                    <p className="text-blue-100/90 text-sm md:text-base max-w-xl">
                        Your central hub for managing programs, faculty, content, and communications.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            </div>

            {loading ? (
                <div className="mt-12">
                    <Loading container={true} text="Loading dashboard..." />
                </div>
            ) : (
                <>
                    {/* Main grid: Latest items + Insights */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-6">
                            <LatestPrograms programs={data?.programs} loading={false} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <LatestAdmissions admissions={data?.admissions} loading={false} />
                                <LatestQueries queries={data?.queries} loading={false} />
                            </div>
                            <LatestGalleryImages images={data?.galleryImages} loading={false} />
                        </div>
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <HomeInsights data={data} />
                            </div>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <ViewAllQuickAccess />
                </>
            )}
        </div>
    );
}
