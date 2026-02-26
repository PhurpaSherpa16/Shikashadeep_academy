import DashboardHeader from "../../components/DashboardHeader";
import { useHomeData } from "../../hooks/home/useHomeData";
import LatestPrograms from "./Home/components/LatestPrograms";
import LatestGalleryImages from "./Home/components/LatestGalleryImages";
import HomeInsights from "./Home/components/HomeInsights";
import ViewAllQuickAccess from "./Home/components/ViewAllQuickAccess";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { LayoutDashboard, Sparkles } from "lucide-react";
import KeyInsight from "./Home/components/KeyInsight";
import TableTabs from "./Home/components/TableTabs";

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
        <div className="dashboard_layout animate_in pb-12 px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="pt-32">
                    <Loading container text="Loading dashboard..." />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {/* Header */}
                        <div>
                            <DashboardHeader {...headerProps} />
                        </div>

                    {/* Main Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Left Section */}
                    <div className="md:col-span-1 lg:col-span-5 flex flex-col gap-6">
                        <TableTabs data={data} />
                        <LatestPrograms programs={data?.programs} loading={false}/>
                    </div>

                    {/* Right Section */}
                    <div className="md:col-span-1 lg:col-span-7">
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-6">
                                <KeyInsight data={data} />

                                <LatestGalleryImages images={data?.galleryImages} loading={false}/>

                                <div>
                                <h2 className="font-bold text-xl font-serif">
                                    Our Opening
                                </h2>
                                <p className="text-justify text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Labore dolores lorem ipsum dolor sit.
                                </p>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="hidden lg:block">
                                <HomeInsights data={data} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quick Access */}
                <div>
                    <ViewAllQuickAccess />
                </div>
            </div>
            )}
        </div>
    );
}
