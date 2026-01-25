import { useEffect } from 'react'
import { images } from '../../data/site'
import ContactInformation from './component/ContactInformation'
import InqueryForm from './component/InqueryForm'

export default function Contact() {
    useEffect(() => {window.scrollTo(0, 0)},[])
    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero / Header */}
            <div className='relative text-white py-20'>
                {/* Background & Overlay */}
                <div className='absolute inset-0 z-0'>
                    <img src={images[3]} alt="Contact Background" className='w-full h-full object-center object-cover' />
                    <div className='absolute inset-0 bg-[#1800ad]/20 backdrop-blur' />
                </div>

                <div className='container mx-auto px-4 text-center space-y-4 relative z-10'>
                    <h1 className='font-serif text-4xl md:text-5xl font-bold'>Get in Touch</h1>
                    <p className='text-xl text-blue-100 max-w-2xl mx-auto'>
                        We'd love to hear from you. Reach out to us for any queries, admissions, or feedback.
                    </p>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16 -mt-10'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Contact Info */}
                    <ContactInformation />

                    {/* Contact Form */}
                    <InqueryForm />
                </div>

                {/* Map Section */}
                <div className='mt-16 rounded-2xl overflow-hidden shadow-lg h-[450px] bg-gray-200'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.636676166245!2d87.24062531503613!3d26.66535298323214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6c6f600f9a21%3A0xe7586551b6ad7255!2sShikshadeep%20Academy%2C%20Itahari!5e3!3m2!1sen!2snp!4v1678123456789!5m2!1sen!2snp&maptype=satellite"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Shikshadeep Academy Location"/>
                </div>

            </div>
        </div>
    )
}