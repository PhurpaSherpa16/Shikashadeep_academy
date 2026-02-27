import { Outlet } from "react-router-dom";
import SubmitActionButton from "../../../components/SubmitActionButton";
import { Megaphone } from "lucide-react";

export default function FlashNoticeLayout(){
    return (
        <>
        <Outlet />
        {location.pathname !== "/admin/notice/new" && (
            <SubmitActionButton actions={[{ label: "Add Notice", location: "/admin/notice/new", icon: Megaphone }]} />
        )}
        </>
    )
}