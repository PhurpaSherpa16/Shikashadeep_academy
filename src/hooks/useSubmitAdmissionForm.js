import { useState } from "react"
import { toast } from "sonner"
import { postStudentApplication } from "../api/admission/postStudentApplication"

export default function useSubmitAdmissionForm() {
    const initialFormState = {
        full_name: "",
        father_name: "",
        mother_name: "",
        contact_no: "",
        address: "",
        previous_school_name: "",
        current_grade: "",
        academic_results: "",
        remarks: ""
    }

    const [formData, setFormData] = useState(initialFormState)
    const [submitState, setSubmitState] = useState("idle") // idle, submitting, submitted, error
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        // Required field validation
        if (!formData.full_name.trim()) newErrors.full_name = "Full name is required"
        if (!formData.father_name.trim()) newErrors.father_name = "Father's name is required"
        if (!formData.mother_name.trim()) newErrors.mother_name = "Mother's name is required"
        
        if (!formData.contact_no.trim()) {
            newErrors.contact_no = "Contact number is required"
        } else if (!/^[0-9]{10}$/.test(formData.contact_no.trim())) {
            newErrors.contact_no = "Contact number must be 10 digits"
        }

        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.previous_school_name.trim()) newErrors.previous_school_name = "Previous school name is required"
        
        if (!formData.current_grade) {
            newErrors.current_grade = "Current grade is required"
        } else if (formData.current_grade < 1 || formData.current_grade > 12) {
            newErrors.current_grade = "Grade must be between 1 and 12"
        }

        if (!formData.academic_results.trim()) newErrors.academic_results = "Academic results are required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error("Please fix the errors in the form")
            return
        }

        setSubmitState("submitting")
        toast.loading("Submitting your application...")

        try {
            const result = await postStudentApplication(formData)
            console.log(result)
            setSubmitState("submitted")
            toast.dismiss()
            toast.success("Application submitted successfully! We'll contact you soon.")
            
            // Reset form after 2 seconds
            setTimeout(() => {
                handleReset()
                setSubmitState("idle")
            }, 2000)
        } catch (error) {
            setSubmitState("error")
            toast.dismiss()
            toast.error(error.message || "Failed to submit application. Please try again.")
            
            // Reset button state after 3 seconds
            setTimeout(() => {
                setSubmitState("idle")
            }, 3000)
        }
    }

    const handleReset = () => {
        setFormData(initialFormState)
        setErrors({})
        setSubmitState("idle")
    }

    return {
        formData,
        errors,
        submitState,
        handleChange,
        handleSubmit,
        handleReset
    }
}
