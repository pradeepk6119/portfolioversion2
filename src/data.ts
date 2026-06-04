import { Skill, Project } from './types';

export const PERSONAL_BIO = {
  firstName: "Pradeep",
  lastName: "K",
  fullName: "Pradeep Prashanth",
  title: "Java Full Stack Developer Intern",
  subTitle: "Computer Science Engineering Student",
  location: "Bengaluru, Karnataka, India",
  email: "13pradeepk916@gmail.com",
  phone: "+91 90192 86059",
  bioParagraph: "Hello! I'm Pradeep Prashanth, a final-year Computer Science Engineering student and a Java Full Stack Developer Intern based in Bengaluru. I specialize in building robust applications using Core Java, SQL, and modern web technologies. Beyond traditional full-stack development, I have a strong passion for exploring Generative AI, machine learning, and IoT to build innovative, real-world solutions.",
  github: "https://github.com/PradeepK6119",
  linkedin: "https://www.linkedin.com/in/pradeepk6119?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
};

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5 & CSS3', category: 'frontend', level: 95, iconName: 'Html', description: 'Semantic elements, responsive layouts, Tailwind, and custom styling.' },
  { name: 'JavaScript', category: 'frontend', level: 88, iconName: 'Js', description: 'ES6+ features, dynamic DOM manipulations, and state handling.' },
  { name: 'Tailwind CSS', category: 'frontend', level: 92, iconName: 'Tailwind', description: 'Utility-first styling, custom extensions, and responsive breakpoints.' },
  { name: 'Bootstrap', category: 'frontend', level: 85, iconName: 'Bootstrap', description: 'Grid systems, pre-built components, and prototyping.' },
  
  // Backend & SQL
  { name: 'Core Java', category: 'backend', level: 93, iconName: 'Java', description: 'Object-Oriented Programming (OOP), Multithreading, Colections Framework.' },
  { name: 'SQL & Database Design', category: 'backend', level: 87, iconName: 'Sql', description: 'Relational query optimization, complex joins, and database structure.' },
  { name: 'MongoDB', category: 'backend', level: 82, iconName: 'MongoDB', description: 'NoSQL documentation, collections development, aggregation pipelines.' },
  
  // Focus AI & ML
  { name: 'Full Stack Development', category: 'focus_ai', level: 90, iconName: 'Fullstack', description: 'Bridging high-performance Java APIs with responsive interfaces.' },
  { name: 'AI Integration', category: 'focus_ai', level: 85, iconName: 'AI', description: 'Connecting LLMs, prompt engineering, and intelligent processing flows.' },
  { name: 'IoT Systems (ESP32)', category: 'focus_ai', level: 80, iconName: 'IoT', description: 'Hardware interfacing with sensors (ECG, SpO2) and microcontrollers.' },
  
  // Hobbies
  { name: 'Video Editing', category: 'hobbies', level: 85, iconName: 'Editing', description: 'Creative direction, cuts, transitions, sound styling, and effects.' },
  { name: 'Exploring Generative AI', category: 'hobbies', level: 90, iconName: 'Exploring', description: 'Experimenting with cutting-edge tools, APIs, and ML models.' },
];

export const PROJECTS: Project[] = [
  {
    id: 'cardio-risk',
    title: 'Real-Time Cardiovascular Risk Prediction',
    category: 'IoT & Machine Learning',
    tag: 'ESP32 & Python ML Model',
    description: 'A comprehensive smart medical framework designed to monitor heart metrics. Leverages sensor inputs and an ML predictor to trigger early warnings.',
    techStack: ['Python', 'ESP32', 'Machine Learning', 'ECG Sensor', 'SpO2 Sensor', 'BP Monitor'],
    features: [
      'ESP32 hardware interface reading ECG, ECG pulse waveforms, and blood-oxygen (SpO2) parameters.',
      'A machine learning classification algorithm trained on cardiovascular datasets to score potential risks.',
      'An emergency notification flow that issues alarm responses when patient vitals cross safe ranges.'
    ]
  },
  {
    id: 'food-court',
    title: 'Food Court Ordering Website',
    category: 'Web Development',
    tag: 'Responsive Full-Stack Experience',
    description: 'A sleek, visual customer interface for a bustling food mall. Speeds up selection with structured catalogs, real-time cart interactions, and search.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'State Management'],
    features: [
      'Interactive visual menus structured under categories with image placeholders and live filters.',
      'Sleek shopping cart side-drawer calculating taxes, customized modifiers, and discounts live in-client.',
      'Flawless fluid styling responding cleanly from 320px screens up to massive 4K visual bounds.'
    ]
  }
];
