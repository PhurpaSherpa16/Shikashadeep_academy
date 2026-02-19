import { useState } from "react"
import { toast } from "sonner"
import usePostJobApplication from "./usePostJobApplication"

export default function useApplyForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cover_letter: "",
        document_url: null,
    })
    const {jobApplicationPosting} = usePostJobApplication()
    const [errors, setErrors] = useState({})
    const [submitState, setSubmitState] = useState('idel')

    const handleReset = () =>{
        setFormData({
            name: "",
            email: "",
            phone: "",
            cover_letter: "",
            document_url: null,
        })
        setErrors({})
        setSubmitState('idel')
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "document_url") {
            setFormData(prev => ({ ...prev, document_url: files[0] || null }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Full name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        if (!formData.cover_letter.trim()) newErrors.cover_letter = "Cover letter is required"
        if (!formData.document_url) newErrors.document_url = "Resume is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async(e, id) => {
        e.preventDefault()
        if (!validate()) return
        setSubmitState("saving")
        console.log('formData', formData)
        try {
            const data = new FormData()
            Object.keys(formData).forEach(key => {
                if(key === 'document_url'){
                    if(formData[key]){
                        data.append(key, formData[key])
                    }
                }else{
                    data.append(key, formData[key])
                }
            })
            await jobApplicationPosting(id, data)
            toast.success("Application submitted successfully!")
            handleReset()
        } catch (error) {
            toast.error('Application submitting failed, please try later.')
        }finally{
            setSubmitState("idel")
        }
    }
    
    return {formData, setFormData, errors, handleChange, handleSubmit, handleReset, submitState}
}
    
