import { footerData } from '../../../../data/site'
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'


export default function ContactInformation() {
    return (
        <Card className='lg:col-span-1 shadow-lg border-none h-full'>
            <CardContent className='p-4 lg:p-8 md:p-12 space-y-8'>
                <div className='space-y-6'>
                    <h3 className='font-serif text-2xl font-bold text-gray-900 border-b pb-4'>Contact Information</h3>

                    {footerData.contact.map((item, index) => (
                        <div key={index} className='flex items-start gap-4 group'>
                            <div className='p-3 bg-blue-50 rounded-lg text-(--blueDark) group-hover:bg-(--blueDark) group-hover:text-white transition-colors'>
                                <item.icon className='h-5 w-5' />
                            </div>
                            <div>
                                <p className='font-medium text-gray-900'>{item.label}</p>
                                <a href={item.href} className='text-gray-600 hover:text-(--blueDark) transition-colors'>
                                    {item.value}
                                </a>
                            </div>
                        </div>
                    ))}

                    <div className='flex items-start gap-4 group pt-4 border-t'>
                        <div className='p-3 bg-blue-50 rounded-lg text-(--blueDark) group-hover:bg-(--blueDark) group-hover:text-white transition-colors'>
                            <Clock className='h-5 w-5' />
                        </div>
                        <div>
                            <p className='font-medium text-gray-900'>Office Hours</p>
                            <div className='text-gray-600'>
                                {footerData.officehours.map((time, idx) => (
                                    <p key={idx}>{time}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}