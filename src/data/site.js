import { Heart, Layers, Mail, MapPin, Monitor, Phone, Shield, Trophy } from "lucide-react";
import Modern from '../assets/gallery/about-card/Modern2.jpg'
import Safe from '../assets/gallery/about-card/Safe.jpg'
import Holistic from '../assets/gallery/about-card/Holistic.jpg'
import Caring from '../assets/gallery/about-card/Caring.jpg'
import footerLogo from '../assets/footer_logo.png'
import { PiPresentationChartLight, PiTiktokLogo } from "react-icons/pi";
import { MdBiotech } from "react-icons/md";
import { PiBusBold } from "react-icons/pi";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import alumni1 from '../assets/alumni/1.jpg'
import alumni2 from '../assets/alumni/2.jpg'
import alumni3 from '../assets/alumni/3.jpg'
import alumni4 from '../assets/alumni/4.jpg'

import defaultImage from '../assets/gallery/faculty/board/default.png'

export const quickContacts = [
  {
    icon: Phone,
    label: "Phone",
    value: "025-590896",
    href: "tel: 025-590896",
  },
  {
    icon: Mail,
    label: "Email",
    value: "shikshadeepacademy123@gmail.com ",
    href: "mailto:shikshadeepacademy123@gmail.com",
  },
]

export const Location = {
  icon: MapPin,
  city: "Itahari",
  ward: 16,
  district: "Sunsari",
  provience: 1,
  country: "Nepal"
}

export const Summary = [
  {
    label: 'students',
    value: 500,
  },
  {
    label: 'teachers',
    value: 25,
  },
  {
    label: 'Years Of Excellence',
    value: 18,
  },
  {
    label: 'Success Rate',
    value: '99%',
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

export const FacilitiesContentHeroText = {
  before: "Our",
  highlight: "Learning Environment",
  after: "that inspire Growth and Nurture Creativity",
  description: "Modern, safe, and well-equipped spaces that encourage exploration, collaboration, and growth."
}

export const FacilitiesContentForCard = [
  {
    icon: PiPresentationChartLight,
    label: "Interactive Classrooms",
    description: "Smart boards, ergonomic seating, and bright, dynamic spaces designed for collaborative and engaging learning experiences."
  },
  {
    icon: MdBiotech,
    label: "Creative Labs",
    description: "Dedicated labs for art, science, and hands-on projects that foster creativity, experimentation, and curiosity."
  }
]

export const BlueBeltContent = {
  label: "Our Academic Programs",
  description: "Comprehensive learning program designed to nurture each child’s unique and prepare them for future success"
}

export const whyChooseUs = [
  {
    label: "Safe Environment",
    description: "24/7 security with CCT Monitoring",
    icon: Shield
  },
  {
    label: "Computers Labs",
    description: "Well-equipped with latest tech",
    icon: Monitor
  },
  {
    label: "Library",
    description: "Extensive book collection",
    icon: Layers
  },
  {
    label: "Transportation",
    description: "Safe school bus services",
    icon: PiBusBold
  },
  {
    label: "Caring Teachers",
    description: "Dedicated faculty with experience",
    icon: Heart
  },
  {
    label: "Sport Facility",
    description: "Wide range of sports facilities",
    icon: Trophy
  },
]

export const footerData = {
  school: {
    title: "SHIKSHADEEP",
    subtitle: "Academy",
    desctiption: "Illuminating minds and building futures through quality education in Itahari, Nepal.",
    icon: footerLogo,
    href: '/'
  },
  socialIcons: [
    {
      label: 'facebook',
      href: 'https://www.facebook.com/shikshadeepacademy.itahari',
      icon: FiFacebook
    },
    {
      label: 'youtube',
      href: '/',
      icon: AiOutlineYoutube
    },
    {
      label: 'tiktok',
      href: '/',
      icon: PiTiktokLogo
    },
    {
      label: 'mail',
      href: 'shikshadeepacademy123@gmail.com ',
      icon: Mail
    },
  ],
  quickLinks: [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'About us',
      href: '/about_us'
    },
    {
      label: 'Programs',
      href: '/programs'
    },
    {
      label: 'Gallery',
      href: '/gallery'
    },
    {
      label: 'Blog & News',
      href: '/blog_news'
    },
  ],
  programs: [
    {
      label: 'Early Years',
      href: '/programs#early-years'
    },
    {
      label: 'Elementry Years',
      href: '/programs#elementary-years'
    },
    {
      label: 'Secondary School',
      href: '/programs#secondary-school'
    },
    {
      label: 'Tution',
      href: '/programs#tuition'
    },
  ],
  contact: [
    {
      icon: MapPin,
      label: "Address",
      value: "Itahari-16, Sunsari, Koshi Province, Nepal",
      href: "https://www.google.com/maps/search/26.665353,+87.242814?entry=tts&g_ep=EgoyMDI2MDExMy4wIPu8ASoASAFQAw%3D%3D&skid=77d1773f-9bf6-4bec-9ae6-44a15938504f",
      type: "link",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 9834536787",
      href: "tel:+977 9834536787",
      type: "tel",
    },
    {
      icon: Mail,
      label: "Admission Email",
      value: "shikshadeepacademy123@gmail.com",
      href: "mailto:shikshadeepacademy123@gmail.com ",
      type: "email",
    },
    {
      icon: Mail,
      label: "Admission Email",
      value: "admission@shikshadeep.edu.np",
      href: "mailto:admission@shikshadeep.edu.np",
      type: "email",
    },
  ],

  officehours: [
    'Sun - Thursday: 9:00 AM - 4:00 PM',
    'Friday: 9:00 AM - 4:00 PM'
  ],
  terms: [
    '© 2024 Shikshadeep Academy. All rights reserved.',
    'Privacy Policy || Terms and services'
  ]
}

export const testimonials = [
  {
    name: "Aarav Magar",
    class: "Grade 9",
    image: alumni2,
    rating: 4,
    message: "The teachers are very supportive and always help me when I face difficulties. I enjoy learning here every day."
  },
  {
    name: "Nisha Karki",
    class: "Grade 10",
    image: alumni1,
    rating: 3,
    message: "My confidence has improved a lot since joining this school. The environment is friendly and motivating."
  },
  {
    name: "Rohan Thapa",
    class: "Grade 8",
    image: alumni4,
    rating: 5,
    message: "I love the activities and projects we do in class. It makes learning fun and interesting."
  },
  {
    name: "Reshma Sharma",
    class: "Grade 10",
    image: alumni3,
    rating: 4,
    message: "I enjoy the projects we do in class, group sudy. It makes learning fun and interesting."
  }
]



