import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MoveRight, RefreshCcw } from "lucide-react"
import { QueryFormValidate } from "../../../../utils/Validation"
import { toast } from "sonner"
import usePostQuery from "../../../../hooks/quer/usePostQuery"

export default function InqueryForm() {
    const { postQueryfromHook, loading} = usePostQuery()
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [formData, setFormData] = useState({
        name: "Apple",
        email: "apple@gmail.com",
        subject: "apple",
        message: "apple",
        phone: "1234567890"
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleReset = () => {
        setFormData({name: "",email: "",subject: "",message: "",phone: ""})
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setDisabled(true)
            const validation = QueryFormValidate(formData)
            if (Object.keys(validation).length > 0) {
                setErrors(validation)
            }else{
                console.log('sending...', formData)
                const result = await postQueryfromHook(formData)
                if(result){
                    setErrors({})
                    toast.success("Message sent successfully")
                }else{
                    toast.error('Faild to post query, try later.')
                }
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setDisabled(false)
        }
    }


    return (
        <Card className='lg:col-span-2 shadow-lg border-none'>
            <CardContent className='p-4 lg:p-8  md:p-12'>
                <div className='space-y-8'>
                    <div>
                        <h3 className='font-serif text-2xl font-bold text-gray-900'>Send us a Message</h3>
                        <p className='text-gray-600 mt-2'>Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-900'>Full Name</label>
                            <Input name="name"value={formData.name}onChange={handleChange}placeholder='John Doe'required/>
                            {errors.name && <p className='text-xs pl-2 text-red-500'>{errors.name}</p>}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-900'>Email Address</label>
                            <Input name="email"type='email'value={formData.email}onChange={handleChange}placeholder='john@example.com'required/>
                            {errors.email && <p className='text-xs pl-2 text-red-500'>{errors.email}</p>}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-900'>Phone Number</label>
                            <Input name="phone"type='number'value={formData.phone}onChange={handleChange}placeholder='1234567890'required/>
                            {errors.phone && <p className='text-xs pl-2 text-red-500'>{errors.phone}</p>}
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-900'>Subject</label>
                            <Input name="subject"value={formData.subject}onChange={handleChange}placeholder='Inquiry about admission...'required/>
                            {errors.subject && <p className='text-xs pl-2 text-red-500'>{errors.subject}</p>}
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                            <label className='text-sm font-medium text-gray-900'>Message</label>
                            <Textarea name="message"value={formData.message}onChange={handleChange}placeholder='Write your message here...'className='min-h-[150px]'required/>
                            {errors.message && <p className='text-xs pl-2 text-red-500'>{errors.message}</p>}
                        </div>
                        <div className='md:col-span-2 space-y-4 space-x-4'>

                            <Button disabled={disabled} type="submit" className='group w-full md:w-auto bg-(--blueDark) hover:bg-blue-900 text-white px-8'>
                                {loading ? 'Sending Message' : 'Send Message'}
                                {loading ? <Loader2 className="h-4 w-4 group-hover:-rotate-45 transition-all duration-300"/> : <MoveRight className="h-4 w-4 group-hover:-rotate-45 transition-all duration-300"/>}
                            </Button>

                            <Button disabled={disabled} type="button" onClick={handleReset} className='group w-full md:w-auto bg-white text-(--blueDark) border px-8
                                hover:border-(--blueDark) hover:bg-white'>
                                Reset
                                <RefreshCcw className="transition-transform duration-300 group-hover:rotate-180 origin-center" />
                            </Button>
                        </div>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}   