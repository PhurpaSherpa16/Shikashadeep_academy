import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MoveRight, RefreshCcw } from "lucide-react"

export default function InqueryForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { name, email, subject, message } = formData

        // Construct the mailto link
        const schoolEmail = "keshavkhanal1000@gmail.com"
        const mailtoSubject = encodeURIComponent(subject || "Admission Inquiry")
        const mailtoBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )

        window.location.href = `mailto:${schoolEmail}?subject=${mailtoSubject}&body=${mailtoBody}`
    }

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        })
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
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='John Doe'
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-sm font-medium text-gray-900'>Email Address</label>
                            <Input
                                name="email"
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='john@example.com'
                                required
                            />
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                            <label className='text-sm font-medium text-gray-900'>Subject</label>
                            <Input
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder='Inquiry about admission...'
                                required
                            />
                        </div>
                        <div className='space-y-2 md:col-span-2'>
                            <label className='text-sm font-medium text-gray-900'>Message</label>
                            <Textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder='Write your message here...'
                                className='min-h-[150px]'
                                required
                            />
                        </div>
                        <div className='md:col-span-2 space-y-4 space-x-4'>
                            <Button type="submit" className='group w-full md:w-auto bg-(--blueDark) hover:bg-blue-900 text-white 
                            px-8'>
                                Send Message
                                <MoveRight className="h-4 w-4 group-hover:-rotate-45 transition-all duration-300"/>
                            </Button>
                            <Button type="button"
                                onClick={handleReset}
                                className='group w-full md:w-auto bg-white text-(--blueDark) border px-8
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