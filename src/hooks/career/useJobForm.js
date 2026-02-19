import { useState } from "react";
import { toast } from "sonner";
import usePostJob from "./usePostJob";
import updateJobDetails from "../../api/career/updateJob";

export default function useJobForm(handleRefresh) {
    const [updateingId, setUpdatingId] = useState(null)
    const { loading, postNewJob } = usePostJob();
    const initialFormState = {title: "",description: "",requirements: "",
        qualification: "",experience: "",jobType: "Full Time",salary: "",
        location: "",startDate: "",endDate: "",remarks: "",
        no_of_applicants: "",isActive: false,document_url: null}

    const [formData, setFormData] = useState(initialFormState);
    const [submitState, setSubmitState] = useState("idle"); // idle, submitting, submitted, error
    const [errors, setErrors] = useState({});
    
    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});
        setSubmitState("idle")
    }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Job title is required";
        if (!formData.description.trim()) newErrors.description = "Job description is required";
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === "checkbox") {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === "file") {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }
    

    const handleSubmit = async (e, id) => {
        if (e) e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill in the required fields");
            return;
        }

        setSubmitState("submitting");
        const loadingToast = toast.loading("Posting job...");

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'document_url') {
                    if (formData[key]) {
                        data.append(key, formData[key]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            });

            await postNewJob(data)
            
            setSubmitState("submitted")
            toast.success("Job posted successfully!", { id: loadingToast })
            
            // Reset form
            setTimeout(() => {
                handleReset();
                setSubmitState("idle");
            }, 1000);
        } catch (error) {
            setSubmitState("error");
            toast.error(error.message || "Failed to post job. Please try again.", { id: loadingToast });
            
            setTimeout(() => {
                setSubmitState("idle");
            }, 3000);
        }
    }

    const handleUpdate = async(e) =>{
        if(e) e.preventDefault()
        
        if(!validateForm()) return toast.error('Please fill in the required fields')
        
        setSubmitState("submitting")
        const loadingToast = toast.loading("Updating job...")

        try {
            const data = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'document_url') {
                    if (formData[key]) {
                        data.append(key, formData[key]);
                    }
                } else {
                    data.append(key, formData[key]);
                }
            })
            await updateJobDetails(updateingId, data)

            setSubmitState("submitted")
            toast.success("Job updated successfully!", { id: loadingToast })
            // Reset form
            setTimeout(() => {
                setSubmitState("idle")
            }, 1000)
            handleRefresh()
        } catch (error) {
            setSubmitState("error")
            toast.error(error.message || "Failed to update job. Please try again.", { id: loadingToast })
            setTimeout(() => {
                setSubmitState("idle")
            }, 3000)
        }
    }


    return {
        formData,
        errors,
        submitState,
        handleChange,
        handleSubmit,
        handleReset,
        loading,
        handleUpdate,
        setUpdatingId,
        setFormData
    };
}
