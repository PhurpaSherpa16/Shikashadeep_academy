import { useEffect } from "react";
import AboutUsSection from "./public/landing/components/AboutUsSection";
import BlogNewsSection from "./public/landing/components/BlogNewsSection";
import BlueBelt from "./public/landing/components/BlueBelt";
import FacilitiesSection from "./public/landing/components/FacilitiesSection";
import GallerySection from "./public/landing/components/GallerySection";
import HeroSection from "./public/landing/components/HeroSection";
import OurFacultySection from "./public/landing/components/OurFacultySection";
import PrincipleWordSection from "./public/landing/components/PrincipleWordSection";
import ProgrameSection from "./public/landing/components/ProgrameSection";
import StayUpdated from "./public/landing/components/StayUpdated";
import SummuryBelt from "./public/landing/components/SummuryBelt";
import TestonomialSection from "./public/landing/components/TestonomialSection";
import WhyUsSection from "./public/landing/components/WhyUsSection";

export default function Index() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div>
      <HeroSection />
      <SummuryBelt />
      <AboutUsSection />
      <FacilitiesSection />
      <BlueBelt />
      <ProgrameSection />
      <WhyUsSection />
      <GallerySection />
      <BlogNewsSection />
      {/* <PrincipleWordSection/> */}
      <OurFacultySection />
      <TestonomialSection />
      <StayUpdated />
    </div>
  )
}
