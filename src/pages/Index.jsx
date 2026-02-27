import { useEffect, useState } from "react";
import AboutUsSection from "./public/landing/components/AboutUsSection";
import BlogNewsSection from "./public/landing/components/BlogNewsSection";
import BlueBelt from "./public/landing/components/BlueBelt";
import FacilitiesSection from "./public/landing/components/FacilitiesSection";
import GallerySection from "./public/landing/components/GallerySection";
import HeroSection from "./public/landing/components/HeroSection";
import OurFacultySection from "./public/landing/components/OurFacultySection";
import ProgrameSection from "./public/landing/components/ProgrameSection";
import StayUpdated from "./public/landing/components/StayUpdated";
import SummuryBelt from "./public/landing/components/SummuryBelt";
import TestonomialSection from "./public/landing/components/TestonomialSection";
import WhyUsSection from "./public/landing/components/WhyUsSection";
import { useGetAllItemsWithCache } from "../api/getAllItemsWithCache";
import FlashNotice from "./public/landing/components/FlashNotice";
import Preloader from "../components/Preloader";

export default function Index() {
  const [isFlashNoticeOpen, setIsFlashNoticeOpen] = useState(true)
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    setShowPreloader(true);
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  }

  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { data } = useGetAllItemsWithCache("school/flash-notice/public")
  const flashNotice = data?.data?.notices.slice(0, 3)

  useEffect(() => {
    if (flashNotice && flashNotice.length > 0) {
      const noticeId = flashNotice[0].id;
      const isHidden = localStorage.getItem(`hide_notice_${noticeId}`);
      if (isHidden === "true") {
        setIsFlashNoticeOpen(false);
      }
    }
  }, [flashNotice]);

  return (
    <div className="relative">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {isFlashNoticeOpen && flashNotice && flashNotice.length > 0 && (
        <FlashNotice flashNotice={flashNotice} setIsFlashNoticeOpen={setIsFlashNoticeOpen} />
      )}
      <HeroSection />
      <SummuryBelt />
      <AboutUsSection />
      <FacilitiesSection />
      <BlueBelt />
      <ProgrameSection />
      <WhyUsSection />
      <GallerySection />
      <BlogNewsSection />
      <OurFacultySection />
      <TestonomialSection />
      <StayUpdated />
    </div>
  )
}
