import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Application from './components/Application'
import Notice from './components/Notice'
import AdmissionProcedure from './components/AdmissionProcedure'

export default function Admission() {
    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            window.scrollTo(0, 0)
        }
    }, [hash])

    return (
        <div className='min-h-screen'>
            {/* Admission section */}
            <AdmissionProcedure/>
            {/* Notice Section */}
            <Notice/>
            {/* Application Section */}
            <Application/>
        </div>
    )
}
