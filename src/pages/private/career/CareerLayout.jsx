import { Outlet } from "react-router-dom";
import SubmitActionButton from "../../../components/SubmitActionButton";
import { Plus } from "lucide-react";

export default function CareerLayout() {
    return (
        <div>
            <Outlet/>
            {/* add new job button */}
            <SubmitActionButton actions={[{label: "Add New Job",icon: Plus, location: "/admin/career/new"}]}/>
        </div>
    )
}