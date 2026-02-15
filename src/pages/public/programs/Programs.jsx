import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Programme1 from '@/assets/Programe1.jpg'
import Programme2 from '@/assets/Programe2.jpg'
import Programme3 from '@/assets/Programe3.jpg'
import blog3 from '@/assets/blog3.jpg' // Using for Tuition
import {Download, MoveRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const programContent = [
    {
        id: "early-years",
        label: "Early Years Foundation",
        age: "Playgroup - Grade 1",
        description: "A nurturing environment that focuses on core skills through interactive, play-based activities.",
        features: ["Social & Emotional Development", "Fine Motor Skills", "Basic Numeracy & Literacy", "Creative Arts"],
        image: Programme1,
        color: "bg-blue-50"
    },
    {
        id: "elementary-years",
        label: "Elementary Years",
        age: "Grade 2 - 6",
        description: "Expansion of knowledge across core subjects while developing critical thinking and problem-solving skills.",
        features: ["Core Academic Mastery", "Inquiry-Based Learning", "Language Proficiency", "Physical Education"],
        image: Programme2,
        color: "bg-gray-50"
    },
    {
        id: "secondary-school",
        label: "Secondary School",
        age: "Grade 7 - 10",
        description: "Preparing students for higher education through project-based learning and leadership opportunities.",
        features: ["Advanced Sciences & Math", "Leadership Development", "Project-Based Learning", "Career Counseling"],
        image: Programme3,
        color: "bg-blue-50"
    },
    {
        id: "tuition",
        label: "Specialized Tuition",
        age: "All Grades",
        description: "Dedicated support for students who need extra guidance or wish to excel further in specific subjects.",
        features: ["Personalized Attention", "Subject-Specific Support", "Exam Preparation", "Bridge Courses"],
        image: blog3,
        color: "bg-gray-50"
    }
];

export default function Programs() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [hash]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="grid place-items-center lg:place-items-start px-4 lg:px-0">
                <div className="container mx-auto py-16 text-center lg:text-left">
                    <div className="w-full md:max-w-2xl lg:max-w-3xl space-y-6">
                        <h1 className="font-serif">
                            Our Academic <span className="text-(--blueDark)">Programs</span>
                        </h1>
                        <p className="text-xl text-gray-500 leading-relaxed">
                            Comprehensive learning programs designed to nurture each child's unique potential and prepare them for future success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Programs List */}
            <div className="space-y-16 px-4 lg:px-0">
                {programContent.map((program, index) => (
                    <section key={program.id} id={program.id} 
                    className={`${index % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
                        <div className="container mx-auto px-4">
                            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    <div className="space-y-4">
                                        <span className="text-(--blueDark) tracking-widest uppercase text-sm">
                                            {program.age}
                                        </span>
                                        <h1 className="font-serif">
                                            {program.label}
                                        </h1>
                                        <p className="text-lg text-gray-600 leading-relaxed text-justify">
                                            {program.description}
                                        </p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {program.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <CheckCircle2 className="text-green-500 size-5 shrink-0" />
                                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4">
                                        <button className="flex items-center gap-2 text-(--blueDark) font-bold group hover:underline underline-offset-4 transition-all">
                                            <Link to='/contact' className="flex items-center gap-2">
                                                Inquire About This Program
                                                <ArrowRight className="size-4 group-hover:-rotate-45 transition-transform" />
                                            </Link>
                                        </button>
                                    </div>
                                </div>

                                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                                        <img src={program.image} alt={program.label} className="w-full h-full object-cover 
                                        object-top hover:scale-105 transition-transform duration-700"/>
                                        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute -bottom-6 -right-6 -left-6 h-12 bg-(--blueDark)/5 rounded-full blur-3xl -z-10" />
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="py-20 text-center relative overflow-hidden">
                <div className="container grid place-items-center space-y-8">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold">Ready to Start the Journey?</h2>
                        <p className=" text-lg">
                            We invite you to visit our campus and experience our vibrant community firsthand.
                        </p>
                    </div>
                    <div className='grid md:flex gap-4 lg:gap-8'>
                        <Button className="group bg-(--blueDark)
                            px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                            <Link to="/admission#application-form" className="flex items-center gap-2">
                                Apply Now
                                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                            </Link>
                        </Button>
                        <Button variant='outline' className="group
                            px-8! lg:px-12! cursor-pointer shadow-md hover:shadow-lg 
                            transition-all flex items-center gap-2 py-3 rounded-full">
                            <Link to="/admission" className="flex items-center gap-2">
                                Contact Admission
                                <MoveRight className="transition-transform duration-300 group-hover:-rotate-45 origin-center" />
                            </Link>
                        </Button>
                    </div>


                </div>
            </div>
        </div>
    );
}