import { Outlet, useLocation } from "react-router-dom";
import SubmitActionButton from "../../../components/SubmitActionButton";

export default function ProgramLayout(){
    const location = useLocation();

    return(
        <>
            <Outlet/>
            {location.pathname !== "/admin/programs/new" && (
                <SubmitActionButton location="/admin/programs/new" text="Add Program"/>
            )}
        </>
    )
}