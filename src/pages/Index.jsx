import AboutUsSection from "./landing/components/AboutUsSection";
import BlogNewsSection from "./landing/components/BlogNewsSection";
import BlueBelt from "./landing/components/BlueBelt";
import FacilitiesSection from "./landing/components/FacilitiesSection";
import GallerySection from "./landing/components/GallerySection";
import HeroSection from "./landing/components/HeroSection";
import OurFacultySection from "./landing/components/OurFacultySection";
import PrincipleWordSection from "./landing/components/PrincipleWordSection";
import ProgrameSection from "./landing/components/ProgrameSection";
import StayUpdated from "./landing/components/StayUpdated";
import SummuryBelt from "./landing/components/SummuryBelt";
import TestonomialSection from "./landing/components/TestonomialSection";
import WhyUsSection from "./landing/components/WhyUsSection";

export default function Index() {
  return (
    <div>
      <HeroSection/>
      <SummuryBelt/>
      <AboutUsSection/>
      <FacilitiesSection/>
      <BlueBelt/>
      <ProgrameSection/>
      <WhyUsSection/>
      <GallerySection/>
      <BlogNewsSection/>
      {/* <PrincipleWordSection/> */}
      <OurFacultySection/>
      <TestonomialSection/>
      <StayUpdated/>
    </div>
  )
}
