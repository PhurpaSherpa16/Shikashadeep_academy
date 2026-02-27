import HeaderForForms from "../../../components/HeaderForForms";
import useNoticeForm from "../../../hooks/flash_notice/useNoticeForm";
import FlashNoticeForm from "./components/FlashNoticeForm";

export default function AddNewFalshNotice(){
    const {formData, errors, handleChange, handleSubmit, handleReset, loading} = useNoticeForm()
    const props = { formData, errors, handleChange, handleSubmit, handleReset, loading}

    return (
        <div className="dashboard_layout animate_in">
            <HeaderForForms title={<>Create a <span className="text-blue-dark">New Flash Notice</span></>} 
            description="Quickly publish an important announcement for immediate attention."/>
            <FlashNoticeForm {...props}/>
        </div>
    )
}