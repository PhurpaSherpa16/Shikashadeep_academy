import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Loader2, Mail, MoveRight } from "lucide-react"
import useSubscribeForm from "../hooks/subscribe/useSubscribeForm"

export default function SubscribeDecorativeForm() {
    const {formData, handleChange, error, state, handleSubmit} = useSubscribeForm()
    

    return(
        <div className="bg-(--blueDark) rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-bold leading-snug">Subscribe to our News & Updates</h3>
                <p className="text-blue-100 text-sm opacity-90">Stay ahead with the latest happenings at Shikshadeep School.</p>
                <div className="space-y-3">
                    <div>
                        <div className='relative flex items-center '>
                            <Input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="Email" 
                            className='group pl-8 w-full'/>
                            <Mail className='absolute size-4 left-2 group-focus:text-red-600'/>
                        </div>
                        <p className="text-red-500 text-sm pt-2 pl-2">{error.email}</p>
                    </div>

                    <Button onClick={handleSubmit} disabled={state === 'subscribing'} className="group bg-white text-(--blueDark)
                        px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg w-full hover:text-white hover:bg-(--blueDark) 
                        hover:border hover:border-white
                        transition-all flex items-center gap-2 py-3 rounded-full">
                        {state === 'subscribing' ? 'Subscribing...' : 'Subscribe'}
                        {state === 'subscribing'  ? <Loader2 className="h-4 w-4"/> : 
                        <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />}
                    </Button>
                </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 size-24 bg-white/10 rounded-full blur-2xl" />
        </div>
    )
}