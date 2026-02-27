import { toast } from "sonner"
import usePostForm from "../usePostForm"
import { data, Form } from "react-router-dom"
import { useState } from "react"

export default function useNoticeForm(){
    const [initialFormState, setInitialFormState] = useState({
        title: "",
        content: "",
        isActive: true,
        startDate: "",
        endDate: "",
        image_url: null
    })
    const [updatingId, setUpdatingId] = useState(null)
    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState({})
    const { postForm, loading } = usePostForm()

    // reseting the form
    const handleReset =()=>{
        setFormData(initialFormState)
        setErrors({})
        setUpdatingId(null)
    }

    // form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = "Title is required";
        if (!formData.content?.trim()) newErrors.content = "Content is required"
        if (!formData.startDate) newErrors.startDate = "Start date is required"
        if (!formData.endDate) newErrors.endDate = "End date is required"
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // handle change
    const handleChange = (e) =>{
        const {name, value, type, files} = e.target

        if(type === 'file'){
            setFormData(prev =>({...prev, [name]: files[0]}))
        }else{
            setFormData(prev =>({...prev, [name]: value}))
        }
    }

    const getFormData = () => {
        const tempFormData = new FormData()
        Object.keys(formData).forEach(key => {
            if (key === 'image_url') {
                if (formData[key] instanceof File) {
                    tempFormData.append(key, formData[key])
                }
            } else {
                tempFormData.append(key, formData[key])
            }
        })
        return tempFormData
    }

    // handle submit
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(!validateForm()) return

        console.log('submitting...');
        try {
            const payload = getFormData()
            await postForm('school/flash-notice/create', payload, 'post')
            toast.success('Flash Notice posted successfully!')
            handleReset()

        }catch(error){
            toast.error(error.message)
            console.log(error)
        }
    }

    // handle update
    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        console.log(formData)
        console.log('updating...')
        try {
            const payload = getFormData()
            await postForm(`school/flash-notice/update/${updatingId}`, payload, 'put')
            toast.success('Flash Notice updated successfully!')
            handleReset()
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return {
        formData,
        errors,
        setFormData,
        setUpdatingId,
        handleChange,
        handleSubmit,
        handleUpdate,
        handleReset,
        loading
    }
}