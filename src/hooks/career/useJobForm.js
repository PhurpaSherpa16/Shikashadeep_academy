import { useState } from "react";
import { toast } from "sonner";
import usePostJob from "./usePostJob";

export default function useJobForm() {
    const { loading, postNewJob } = usePostJob();
    const initialFormState = {title: "Junior Teacher",description: "Role of junior",requirements: "Maths, Science",
        qualification: "Bachelor's Degree",experience: "1 year",jobType: "Full Time",salary: "10000",
        location: "Kathmandu",startDate: "2022-01-01",endDate: "2022-12-31",remarks: "",
        isActive: false,document_url: null};

    const [formData, setFormData] = useState(initialFormState);
    const [submitState, setSubmitState] = useState("idle"); // idle, submitting, submitted, error
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = "Job title is required";
        if (!formData.description.trim()) newErrors.description = "Job description is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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
    };

    const handleSubmit = async (e) => {
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

            await postNewJob(data);
            
            setSubmitState("submitted");
            toast.success("Job posted successfully!", { id: loadingToast });
            
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
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setErrors({});
        setSubmitState("idle");
    };

    return {
        formData,
        errors,
        submitState,
        handleChange,
        handleSubmit,
        handleReset,
        loading
    };
}
