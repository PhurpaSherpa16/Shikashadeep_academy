import { Outlet, useLocation } from "react-router-dom";
import SubmitActionButton from "../../../components/SubmitActionButton";
import { GraduationCap, UserPlus } from "lucide-react";

export default function FacultyLayout() {
    const location = useLocation()
    return (
        <>
            <Outlet />
            {location.pathname !== "/admin/faculty/new" && location.pathname !== "/admin/faculty/advisory/new" && (
                <SubmitActionButton actions={[{ label: "Add Advisory Member", location: "/admin/faculty/advisory/new", icon: GraduationCap }, { label: "Register New Teacher", location: "/admin/faculty/new", icon: UserPlus }]} />
            )}
        </>
    )
}