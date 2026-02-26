import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGetAllItemsWithCache } from "../../../api/getAllItemsWithCache";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import NoItemsForPublic from "../../../components/NoItemsForPublic";
import LandingPageCard from "../../../components/program/LandingPageCard";

export default function Programs() {
    const { hash } = useLocation();
    const {data, isLoading, error} = useGetAllItemsWithCache("programs", 1)
    const programData = data?.data?.programs

    console.log(programData)

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
            <div className="grid place-items-center lg:place-items-start px-4 l:px-0">
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
            <div className="min-h-120 flex flex-col gap-8">
                {isLoading && (
                    <div className='flex flex-col gap-8 container px-4'>
                        <Loading text={'Loading Programs'}/>
                    </div>
                )}
                {error && (
                    <div className='container px-4'>
                        <Error text={'Error Loading Programs, Please Wait'}/>
                    </div>
                )}
                {!isLoading && !error && programData?.length === 0 && (
                        <div className='container px-4 grid place-items-center min-h-64'>
                            <NoItemsForPublic message="No Programs Available" link={'/'} linkText="Refresh"/>
                        </div>
                    )
                }
                {!isLoading && !error && programData?.map((item, index) => (
                    <>
                       <LandingPageCard actions={false} key={index} program={item} index={index}/>
                    </>
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