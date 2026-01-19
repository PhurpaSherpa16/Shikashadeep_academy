import AboutUsSection from "./landing/components/AboutUsSection";
import BlueBelt from "./landing/components/BlueBelt";
import FacilitiesSection from "./landing/components/FacilitiesSection";
import GallerySection from "./landing/components/GallerySection";
import HeroSection from "./landing/components/HeroSection";
import ProgrameSection from "./landing/components/ProgrameSection";
import SummuryBelt from "./landing/components/SummuryBelt";
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
    </div>
  )
}
