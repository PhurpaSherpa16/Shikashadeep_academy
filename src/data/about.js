import schoolimage from '../assets/gallery/school_image.jpg'
import mission from '../assets/gallery/mission/1.jpg'
import faculty from '../assets/gallery/faculty/1.jpg'
import board from '../assets/gallery/board/1.jpg'
import culture from '../assets/gallery/Culture/1.jpg'
import election from '../assets/gallery/election/2.jpg'
import coreMission from '../assets/mission.png'
import facilities from '../assets/gallery/facilities.jpg'
import one from '../assets/gallery/faculty/teachers/1.jpeg'
import two from '../assets/gallery/faculty/teachers/2.jpeg'
import three from '../assets/gallery/faculty/teachers/3.jpeg'
import four from '../assets/gallery/faculty/teachers/4.jpeg'
import five from '../assets/gallery/faculty/teachers/5.jpeg'
import six from '../assets/gallery/faculty/teachers/6.jpeg'
import seven from '../assets/gallery/faculty/teachers/7.jpeg'
import eight from '../assets/gallery/faculty/teachers/8.jpeg'
import nine from '../assets/gallery/faculty/teachers/9.jpeg'
import ten from '../assets/gallery/faculty/teachers/10.jpeg'
import eleven from '../assets/gallery/faculty/teachers/11.jpeg'
import twelve from '../assets/gallery/faculty/teachers/12.jpeg'
import thirteen from '../assets/gallery/faculty/teachers/13.jpeg'
import fourteen from '../assets/gallery/faculty/teachers/14.jpeg'
import fifteen from '../assets/gallery/faculty/teachers/15.jpeg'
import sixteen from '../assets/gallery/faculty/teachers/16.jpeg'
import seventeen from '../assets/gallery/faculty/teachers/17.jpeg'
import eighteen from '../assets/gallery/faculty/teachers/18.jpeg'
import board1 from '../assets/gallery/faculty/board/1.jpeg'
import board2 from '../assets/gallery/faculty/board/2.jpeg'
import board3 from '../assets/gallery/faculty/board/3.jpeg'
import defaultImage from '../assets/gallery/faculty/board/default.png'

export const school_data = {
    school_introduction: [
        "Shikshadeep Academy is a well-established educational institution founded in 2063 B.S. in the heart of Itahari Sub-Metropolitan City, Sunsari. Established with the motto of providing quality education for all, the school has been continuously committed to academic excellence and holistic student development. The school is located in the southern part of Balgram, offering a peaceful and student-friendly learning environment.",
        "The school is equipped with modern and well-maintained infrastructure, including a principal’s office, accountant’s office, staff room, seminar hall, science laboratory, computer laboratory, 17 classrooms, four restrooms, a canteen, and a library. To ensure safety and convenience, the school also provides safe drinking water facilities, a well-designed stage and entrance gate, and two school buses.",
        "Shikshadeep Academy currently serves more than 500 students from pre-primary to secondary levels, guided by a team of highly qualified, experienced, and dedicated teachers. Supported by 25 teaching staff and 7 non-teaching staff, the school maintains a friendly, disciplined, and inclusive environment where students feel safe, motivated, and encouraged to achieve their full potential.",
        "At Shikshadeep Academy, we believe education goes beyond textbooks. We focus on nurturing knowledge, character, discipline, and confidence, preparing students to become responsible and capable citizens of the future.",
    ],
    history: "Established in 2063 B.S., Shikshadeep Academy has grown from a small learning community into a school serving over 500 students, with small class sizes that allow personal attention.",
    school_image: schoolimage
}

export const about_us = [
    {
        label: 'Introduction',
        href: '/about_us#introduction',
        image: schoolimage,
        description: "Comprehensive educational program from early years to secondary level, designed to develop confident, independent, and thoughtful learners with strong academic foundations.",
    },
    {
        label: 'Mission',
        href: '/about_us#mission',
        description: "Student-centered curriculum enriched through arts, technology, physical education, and social development, ensuring balanced growth in knowledge and character development.",
        image: mission,
    },
    {
        label: 'Faculty',
        href: '/about_us#faculty',
        description: "Dedicated team of experienced educators committed to providing personalized attention and fostering positive relationships with students and families in our community.",
        image: faculty,
    },
    {
        label: 'Advisory Members',
        href: '/about_us#advisory_members',
        description: "Experienced leaders guiding the school's vision and strategic direction while promoting values of respect, cooperation, and responsibility among all stakeholders.",
        image: board,
    },
    {
        label: 'Values',
        href: '/about_us#values',
        description: "We promote respect, cooperation, and responsibility, emphasizing teamwork, communication skills, and positive relationships to create a supportive and inclusive learning environment.",
        image: culture,
    },
    {
        label: 'Facilities',
        href: '/about_us#facilities',
        description: "Modern infrastructure and resources supporting dynamic learning experiences, including technology labs, arts spaces, and recreational areas for holistic student development.",
        image: facilities,
    },
]

export const mission_data = {
    label: "Where Education Meets Character",
    description: "At Shikshadeep Academy, our mission is to nurture every child's potential and guide them toward academic excellence while shaping them into kind, confident, and responsible individuals. We believe true success is not only measured by certificates and trophies, but by strong values, curiosity, discipline, and respect for others. Through supportive teaching, encouragement, and opportunities to grow, we prepare our students to achieve their goals and contribute positively to society. We are committed to creating an inclusive learning environment where every student feels valued, supported, and inspired to reach their fullest potential. Our educators work collaboratively with families to foster critical thinking, creativity, and emotional intelligence. We aim to instill lifelong learning habits and empower students to become compassionate leaders who make meaningful contributions to their communities and the world around them.",
    image: coreMission,
    hightlight: "Instilling Democratic Values Through School-Level Leadership Voting to Shape Confident and Responsible Leaders.",
    hightlightImage: election,

}

export const faculty_data = {
    label: "Our Teaching Community",
    description: "At Shikshadeep Academy, our strength lies in our dedicated and experienced teachers who are committed to guiding students both academically and personally. Our faculty members bring passion, knowledge, and care into every classroom, creating a supportive environment where students feel encouraged to learn, grow, and succeed. Through teamwork and continuous development, our educators help shape confident learners and responsible citizens.",
    teachers: [
        {
            name: "Ram Sharma",
            designation: "Principal",
            experience: 12,
            tag: "leadership",
            some_words: "Committed to building a strong foundation for every learner.",
            image: one
        },
        {
            name: "Sita Adhikari",
            designation: "Vice Principal",
            experience: 10,
            tag: "leadership",
            some_words: "Focused on student growth and academic excellence.",
            image: two
        },

        // --- Science Group ---
        {
            name: "Anita Thapa",
            designation: "Science Teacher",
            experience: 7,
            tag: "science",
            some_words: "Encouraging curiosity and scientific thinking.",
            image: three
        },
        {
            name: "Amit Chaudhary",
            designation: "Science Teacher",
            experience: 5,
            tag: "science",
            some_words: "Learning through experiments and observation.",
            image: four
        },
        {
            name: "Bikash Karki",
            designation: "Mathematics Teacher",
            experience: 8,
            tag: "science",
            some_words: "Making numbers simple and enjoyable for students.",
            image: five
        },
        {
            name: "Kiran Joshi",
            designation: "Mathematics Teacher",
            experience: 4,
            tag: "science",
            some_words: "Helping students gain confidence in problem solving.",
            image: six
        },
        {
            name: "Deepak Shrestha",
            designation: "Computer Teacher",
            experience: 5,
            tag: "science",
            some_words: "Preparing students for the digital future.",
            image: seven
        },

        // --- Social Group ---
        {
            name: "Sunita KC",
            designation: "Social Studies / Civics Teacher",
            experience: 6,
            tag: "social",
            some_words: "Teaching responsibility and civic awareness.",
            image: eight
        },
        {
            name: "Rekha Basnet",
            designation: "Health & Moral Education Teacher",
            experience: 8,
            tag: "social",
            some_words: "Guiding students toward healthy and ethical living.",
            image: nine
        },
        {
            name: "Suresh Tamang",
            designation: "Social Studies Teacher",
            experience: 6,
            tag: "social",
            some_words: "Connecting classroom learning with real life.",
            image: ten
        },

        // --- Language Group ---
        {
            name: "Ramesh Poudel",
            designation: "English Teacher",
            experience: 9,
            tag: "language",
            some_words: "Building strong communication and confidence.",
            image: eleven
        },
        {
            name: "Manju Pandey",
            designation: "Nepali Language Teacher",
            experience: 9,
            tag: "language",
            some_words: "Preserving language and cultural values.",
            image: twelve
        },

        // --- Other Group ---
        {
            name: "Nirmala Gurung",
            designation: "Pre-Primary Teacher",
            experience: 11,
            tag: "other",
            some_words: "Nurturing young minds with care and creativity.",
            image: thirteen
        },
        {
            name: "Santosh Rai",
            designation: "Physical Education Teacher",
            experience: 7,
            tag: "other",
            some_words: "Promoting health, teamwork, and discipline.",
            image: fourteen
        },
        {
            name: "Puja Bhandari",
            designation: "Arts & Craft Teacher",
            experience: 6,
            tag: "other",
            some_words: "Encouraging creativity and self-expression.",
            image: fifteen
        },
        {
            name: "Prakash Dahal",
            designation: "Music Teacher",
            experience: 5,
            tag: "other",
            some_words: "Inspiring rhythm, confidence, and creativity.",
            image: sixteen
        },
        {
            name: "Kalpana Shahi",
            designation: "Library & Reading Coordinator",
            experience: 7,
            tag: "other",
            some_words: "Developing reading habits and curiosity.",
            image: seventeen
        },
        {
            name: "Meena Khatri",
            designation: "Class Teacher (Grade 5)",
            experience: 9,
            tag: "other",
            some_words: "Supporting students academically and emotionally.",
            image: eighteen
        },
    ],
    tagTitles: {
        leadership: "Academic Leadership",
        science: "Science & Technology Department",
        social: "Social Studies & Moral Education",
        language: "Language Department",
        other: "Co-Curricular & Primary Section",
    }


}

export const boardMember = {
    label: "Advisory Members",
    description: "Shikshadeep Academy's advisory members provide strategic guidance, uphold our mission, and ensure the highest standards in education and student development.",
    members: [
        {
            names: "Bishnu Bahadur Basnet",
            some_words: "Dedicated to fostering excellence and building a brighter future for every student.",
            image: defaultImage,
        },
        {
            names: "Yubraj Kaphle",
            some_words: "Committed to creating an inclusive environment where all students can thrive.",
            image: defaultImage,
        },
        {
            names: "Rup Narayan",
            some_words: "Supporting innovation and quality education that shapes responsible global citizens.",
            image: defaultImage,
        },
    ]
}

export const values_data = {
    label: "Our Core Values",
    description: "Our values are the foundation of our school community. They guide our actions, decisions, and interactions, creating a supportive environment where every student can thrive.",
    values: [
        {
            title: "Respect",
            description: "We foster a culture of mutual respect where every individual is valued, heard, and treated with dignity regardless of their background or differences.",
            image: culture
        },
        {
            title: "Integrity",
            description: "We believe in honesty and strong moral principles. We teach students to be accountable for their actions and to always stand up for what is right.",
            image: mission
        },
        {
            title: "Excellence",
            description: "We encourage a pursuit of excellence in all endeavors. We challenge students to set high standards for themselves and to strive for their personal best.",
            image: facilities
        },
        {
            title: "Compassion",
            description: "We cultivate empathy and kindness. We encourage students to understand others' perspectives and to contribute positively to the well-being of the community.",
            image: schoolimage
        },
        {
            title: "Collaboration",
            description: "We emphasize the power of teamwork. By working together, students learn to solving problems effectively and to appreciate diverse viewpoints.",
            image: board
        },
        {
            title: "Responsibility",
            description: "We empower students to take ownership of their learning and their role in the community, fostering a sense of duty towards themselves and the world.",
            image: election
        }
    ]
}

export const facilities_data = {
    label: "Our Facilities & Programs",
    description: "Shikshadeep Academy provides state-of-the-art facilities and a wide range of programs designed to support holistic student development, from academic excellence to social responsibility.",
    items: [
        {
            title: "Advanced Computer Labs",
            description: "Our high-tech computer labs are equipped with the latest hardware and software, providing students with hands-on experience in coding, digital design, and research.",
            image: facilities
        },
        {
            title: "Modern Science Labs",
            description: "We offer fully equipped physics, chemistry, and biology labs where students engage in practical experiments to deepen their understanding of scientific concepts.",
            image: five
        },
        {
            title: "Digital Learning Tools",
            description: "Classrooms are enhanced with interactive smart boards and digital projection systems, making learning more engaging, visual, and effective for all students.",
            image: seven
        },
        {
            title: "Educational Tours",
            description: "We organize regular field trips and educational tours to museums, historical sites, and industries, allowing students to connect classroom learning with the real world.",
            image: schoolimage
        },
        {
            title: "Social Awareness Programs",
            description: "Students participate in yearly campaigns focusing on health, hygiene, traffic safety, and environmental protection, fostering a strong sense of civic duty.",
            image: election
        },
        {
            title: "Community Service",
            description: "We guide students in social works like tree plantation drives and charity events, teaching them the importance of giving back to nature and society.",
            image: culture
        }
    ]
}