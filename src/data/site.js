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
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
import f1 from '../assets/f1.jpeg'
import f2 from '../assets/f2.jpeg'
import f3 from '../assets/f3.jpeg'
import f4 from '../assets/f4.jpeg'
import f5 from '../assets/f5.jpeg'
import f7 from '../assets/f7.jpeg'
import t1 from '../assets/t1.jpg'
import t2 from '../assets/t2.jpeg'
import t3 from '../assets/t3.jpg'
import t4 from '../assets/t4.jpg'
import footerLogo from '../assets/footer_logo.png'
import { PiPresentationChartLight, PiTiktokLogo } from "react-icons/pi";
import { MdBiotech } from "react-icons/md";
import { PiBusBold } from "react-icons/pi";
import { FaKitchenSet } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";

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
        value : "shikshadeepacademy123@gmail.com ",
        href : "mailto:shikshadeepacademy123@gmail.com",
    },
]

export const Location ={   
        icon : MapPin,
        city : "Itahari",
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

export const LatestBLogNews = [
  {
    tag : 'Community',
    date : 'Aug 5, 2025',
    readingTime : 5,
    label : 'Building Strong Learning Foundations in Early Years',
    description : 'Our early education program focuses on core skills through interactive activities that prepare children for long-term academic success.',
    image : blog1,
    color : '#1800ad'
  },
  {
    tag : 'Culture',
    date : 'Sept 21, 2025',
    readingTime : 3,
    label : 'Children celebrating Krishna Ashtimi with Pride and Joy',
    description : 'Students took part in artistic endeavors centered around Lord Krishna, cultural performances, talks, and bearing ideals.',
    image : blog2,
    color : 'red'
  },
  {
    tag : 'Achivement',
    date : 'July 12, 2025',
    readingTime : 6,
    label : 'Shikshadeep Students Shine in Inter-School Competitions',
    description : 'Our students earned top positions across academic and sports events, reflecting their dedication, teamwork.',
    image : blog3,
    color : '#015513'
  },
]

export const principalWords = {
  itroduction: "At Shikshadeep Academy, we focus on nurturing confident learners with strong values and academic excellence.",
  description: "Our dedicated teachers and supportive environment help every child grow, explore their potential, and prepare for a bright future. Together with parents, we strive to build responsible, skilled, and successful individuals.",
  name : "Mrs. Sikaha Pandit"
}

export const footerData = {
  school : {
    title : "SHIKSHADEEP",
    subtitle : "Academy",
    desctiption : "Illuminating minds and building futures through quality education in Itahari, Nepal.",
    icon : footerLogo,
    href : '/'
  },
  socialIcons : [
    {
      label: 'facebook',
      href : 'https://www.facebook.com/shikshadeepacademy.itahari',
      icon : FiFacebook
    },
    {
      label: 'youtube',
      href : '/',
      icon : AiOutlineYoutube
    },
    {
      label: 'tiktok',
      href : '/',
      icon : PiTiktokLogo
    },
    {
      label: 'mail',
      href : 'shikshadeepacademy123@gmail.com ',
      icon : Mail
    },
  ],
  quickLinks : [
    {
      label : 'Home',
      href : '/'
    },
    {
      label : 'About us',
      href : '/about_us'
    },
    {
      label : 'Programs',
      href : '/programs'
    },
    {
      label : 'Gallery',
      href : '/gallery'
    },
    {
      label : 'Blog & News',
      href : '/blog'
    },
  ],
  programs:[
    {
      label : 'Early Years',
      href : '/'
    },
    {
      label : 'Elementry Years',
      href : '/'
    },
    {
      label : 'Secondary School',
      href : '/'
    },
    {
      label : 'Tution',
      href : '/'
    },
  ],
  contact : [
    {
      icon: MapPin,
      label: "Address",
      value: "Itahari-16, Sunsari, Province No. 1, Nepal",
      href: "https://www.google.com/maps/search/26.665353,+87.242814?entry=tts&g_ep=EgoyMDI2MDExMy4wIPu8ASoASAFQAw%3D%3D&skid=77d1773f-9bf6-4bec-9ae6-44a15938504f",
      type: "link",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 9834536787",
      href: "tel:+9779834536787",
      type: "tel",
    },
    {
      icon: Mail,
      label: "Admission Email",
      value: "shikshadeepacademy123@gmail.com ",
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

  officehours : [
    'Sun - Thursday: 8:00 AM - 4:00 PM',
    'Friday: 9:00 AM - 1:00 PM'
  ],
  terms : [
    '© 2024 Shikshadeep Academy. All rights reserved.',
    'Privacy Policy || Terms and services'
  ]
}

export const teachers = [
  {
    name: "Dr. Ram Prasad Aryal",
    designation: "Principal",
    qualification: "Ph.D in Education",
    experience: 15,
    image: f1,
    quote: "Education is the most powerful tool to shape the future."
  },
  {
    name: "Ms. Sita Sharma",
    designation: "Math Teacher",
    qualification: "M.Sc in Mathematics",
    experience: 10,
    image: f2,
    quote: "I believe every student can excel if given the right guidance."
  },
  {
    name: "Mr. Ramesh Thapa",
    designation: "Science Teacher",
    qualification: "M.Sc in Physics",
    experience: 8,
    image: f4,
    quote: "Science is about curiosity — I encourage students to explore."
  },
  {
    name: "Ms. Anjali Koirala",
    designation: "English Teacher",
    qualification: "M.A in English Literature",
    experience: 12,
    image: f5,
    quote: "Language is the key to understanding the world."
  },
  {
    name: "Mr. Binod Gurung",
    designation: "Social Studies Teacher",
    qualification: "M.A in History",
    experience: 9,
    image: f7,
    quote: "Learning from the past helps us build a better future."
  },
  {
    name: "Ms. Shyam Shrestha",
    designation: "Computer Science Teacher",
    qualification: "B.Tech in Computer Engineering",
    experience: 7,
    image: f3,
    quote: "Coding opens up a world of endless possibilities."
  }
];

export const testimonials = [
  {
    name: "Aarav Sharma",
    class: "Grade 9",
    image: t1,
    rating : 4,
    message: "The teachers are very supportive and always help me when I face difficulties. I enjoy learning here every day."
  },
  {
    name: "Nisha Karki",
    class: "Grade 10",
    image: t2,
    rating : 3,
    message: "My confidence has improved a lot since joining this school. The environment is friendly and motivating."
  },
  {
    name: "Rohan Thapa",
    class: "Grade 8",
    image: t3,
    rating : 5,
    message: "I love the activities and projects we do in class. It makes learning fun and interesting."
  },
  {
    name: "Clare Johnson",
    class: "Grade 10",
    image: t4,
    rating : 4,
    message: "I enjoy the projects we do in class, group sudy. It makes learning fun and interesting."
  }
]



