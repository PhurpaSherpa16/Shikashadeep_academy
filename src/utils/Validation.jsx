
export const QueryFormValidate = (formData) => {
    const newErrors = {}

    // Required field validation
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must be 10 digits"
    }
    
    // validate email
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())){
        newErrors.email = "Email is invalid"
    }

    // min name character
    if(formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters"
    // min message character
    if(formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
    // min subject character
    if(formData.subject.trim().length < 3) newErrors.subject = "Subject must be at least 3 characters"

    return newErrors
}