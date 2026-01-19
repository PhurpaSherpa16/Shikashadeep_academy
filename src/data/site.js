import { Heart, Layers, Mail, MapPin, Monitor, Phone, Shield } from "lucide-react";
import Modern from '../assets/1.jpg'
import Safe from '../assets/2.png'
import Holistic from '../assets/3.jpg'
import Caring from '../assets/4.png'
import Programme1 from '../assets/Programe1.jpg'
import Programme2 from '../assets/Programe2.jpg'
import Programme3 from '../assets/Programe3.jpg'
import g1 from '../assets/g1.jpg'
import g2 from '../assets/g2.jpg'
import g3 from '../assets/g3.jpg'
import g4 from '../assets/g4.jpg'
import g5 from '../assets/g5.jpg'
import g6 from '../assets/g6.jpg'
import { PiPresentationChartLight } from "react-icons/pi";
import { MdBiotech } from "react-icons/md";
import { PiBusBold } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa6";


export const quickContacts = [
    {
        icon : Phone,
        label : "Phone",
        value : "+977-9787467839",
        href : "tel: +977-9787467839",
    },
    {
        icon : Mail,
        label : "Email",
        value : "info@school.com",
        href : "mailto:info@school.com",
    },
]

export const Location ={   
        icon : MapPin,
        city : "Ithari",
        ward : 16,
        district : "Sunsari",
        provience : 1,
        country : "Nepal"
}

export const Summary = [
    {
        label : 'students',
        value : 400,
    },
    {
        label : 'teachers',
        value : 50,
    },
    {
        label : 'Years Of Excellence',
        value : 10,
    },
    {
        label : 'Success Rate',
        value : '95%',
    },
]

export const AboutUsCardData = [
  {
    label: "Modern Curriculum",
    description:
      "Our updated curriculum blends academics, technology, and real-world skills to prepare students for future learning and careers.",
    image: Modern,
  },
  {
    label: "Safe Environment",
    description:
      "We provide a secure, friendly campus where students feel respected, supported, and confident to grow both academically and socially.",
    image: Safe,
  },
  {
    label: "Holistic Development",
    description:
      "We focus on academics, sports, creativity, and leadership to help students develop balanced personalities and strong life skills.",
    image: Holistic,
  },
  {
    label: "Caring Educators",
    description:
      "Our dedicated teachers guide, motivate, and mentor every student with personal attention and a passion for teaching excellence.",
    image: Caring,
  },
]

export const FacilitiesContentHeroText ={
    before: "Our",
    highlight: "Learning Environment",
    after: "that inspire Growth and Nurture Creativity",
    description : "Modern, safe, and well-equipped spaces that encourage exploration, collaboration, and growth."
}

export const FacilitiesContentForCard =[
    {   icon : PiPresentationChartLight, 
        label: "Interactive Classrooms",
        description : "Smart boards, ergonomic seating, and bright, dynamic spaces designed for collaborative and engaging learning experiences."
    },
    {   
        icon : MdBiotech, 
        label: "Creative Labs",
        description : "Dedicated labs for art, science, and hands-on projects that foster creativity, experimentation, and curiosity."
    }
]

export const BlueBeltContent = {
    label : "Our Academic Programs",
    description : "Comprehensive learning program designed to nurture each child’s unique and prepare them for future success"
}

export const programme = [
    {
        label : "Early Years Foundation (Playgroup - Grade 1)",
        description : "Comprehensive learning program designed to nurture each child’s unique and prepare them for future success",
        image : Programme1
    },
    {
        label : "Elementary Group  (Grade 2 - 6)",
        description : "Expanding knowledge across core subjects while developing critical, problem-solving, advanced academic to encourage their passions and strength.",
        image : Programme2
    },
    {
        label : "Secondary Group (Grade 7 - 10)",
        description : "Preparing for secondary education with independence through project base learning, leadership opportunities and collaborative activities. ",
        image : Programme3
    },
]

export const whyChooseUs = [
    {
      label : "Safe Environment",
      description : "24/7 security with CCT Monitoring",
      icon : Shield
    },
    {
      label : "Computers Labs",
      description : "Well-equipped with latest tech",
      icon : Monitor
    },
    {
      label : "Library",
      description : "Extensive book collection",
      icon : Layers
    },
    {
      label : "Transportation",
      description : "Safe school bus services",
      icon : PiBusBold
    },
    {
      label : "Caring Teachers",
      description : "Dedicated faculty with experience",
      icon : Heart
    },
    {
      label : "Canteen Facility",
      description : "Hygienic and nutritious food",
      icon : FaKitchenSet
    },
]

export const images = [g1, g2, g3, g4, g5, g6]

