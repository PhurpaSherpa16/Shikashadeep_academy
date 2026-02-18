import { Outlet, useLocation } from "react-router-dom";
import SubmitActionButton from "../../../components/SubmitActionButton";
import { Sparkles } from "lucide-react"

export default function ProgramLayout(){
    const location = useLocation();

    return(
        <>
            <Outlet/>
            {location.pathname !== "/admin/programs/new" && (
                <SubmitActionButton actions={[{ label: "Add Program", location: "/admin/programs/new", icon: Sparkles }]} />
            )}
        </>
    )
}