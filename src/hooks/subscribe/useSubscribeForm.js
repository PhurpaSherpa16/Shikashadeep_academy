import { useEffect, useState } from "react"
import { toast } from "sonner"
import useSubscribePost from "./useSubscribePost"

export default function useSubscribeForm(){
    const [formData, setFormData] = useState({
        email : ""
    })
    const [error, setError] = useState("")
    const [state, setState] = useState("idel")

    const {subscribePost} = useSubscribePost()

    const handleReset = () =>{
        setFormData({
            email : ""
        })
    }

    useEffect(()=>{
        if(error){
        const timer = setTimeout(() =>{
            setError("")
            }, 3000)
        return () => clearTimeout(timer)
        } 
    }, [error])

    const validate = () =>{
        const newError = {}
        if(!formData.email.trim()) newError.email = "Email is required"
        else if(!/\S+@\S+\.\S+/.test(formData.email)) newError.email = "Invalid email address"
        setError(newError)
        return Object.keys(newError).length === 0
    }

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name] : value}))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!validate()) return
        setState('subscribing')
        try {
            const subscribeData = new FormData()
            Object.keys(formData).forEach(key =>{
                subscribeData.append(key, formData[key])
            })
            await subscribePost(subscribeData)
            toast.success('Subscribed successfully!')
            handleReset()

        }catch (error) {
            toast.error(error || 'Failed to subscribe')
        }finally{
            setState('idel')
        }
    }
    return {handleSubmit, formData, handleChange, error, state}
}