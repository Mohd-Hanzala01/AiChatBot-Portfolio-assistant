// Portfolio Knowledge Base - Customize this with your actual details
export interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    github: string;
  };
  about: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe"
  },
  about: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. I love solving complex problems and creating user-friendly solutions.",
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", 
    "Docker", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "Git"
  ],
  experience: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      duration: "2022 - Present",
      description: "Lead development of microservices architecture serving 100K+ users. Built React applications and Node.js APIs."
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Developed MVP from scratch using React and Express.js. Implemented user authentication and payment systems."
    },
    {
      company: "Digital Agency",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      description: "Created responsive websites and web applications for various clients using modern frontend technologies."
    }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "https://github.com/johndoe/ecommerce"
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      link: "https://github.com/johndoe/taskmanager"
    },
    {
      name: "Weather Dashboard",
      description: "Interactive weather dashboard with data visualization",
      technologies: ["React", "D3.js", "Weather API", "Tailwind CSS"],
      link: "https://github.com/johndoe/weather-dashboard"
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      year: "2019"
    }
  ]
};

// Q&A Knowledge Base - Add more questions and answers here
export const qnaDatabase = [
  // Personal Information
  {
    keywords: ["name", "who are you", "introduce"],
    response: `Hi! I'm ${portfolioData.personalInfo.name}, a ${portfolioData.personalInfo.title} based in ${portfolioData.personalInfo.location}.`
  },
  {
    keywords: ["contact", "email", "phone", "reach"],
    response: `You can reach me at ${portfolioData.personalInfo.email} or call me at ${portfolioData.personalInfo.phone}. You can also check out my website at ${portfolioData.personalInfo.website}.`
  },
  
  // About & Background
  {
    keywords: ["about", "background", "tell me about"],
    response: portfolioData.about
  },
  
  // Skills
  {
    keywords: ["skills", "technologies", "tech stack", "programming"],
    response: `My technical skills include: ${portfolioData.skills.join(", ")}. I'm always learning new technologies to stay current with industry trends.`
  },
  
  // Experience
  {
    keywords: ["experience", "work", "job", "career"],
    response: `I have ${portfolioData.experience.length} years of professional experience. Currently, I'm working as a ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company}, where ${portfolioData.experience[0].description.toLowerCase()}`
  },
  
  // Projects
  {
    keywords: ["projects", "portfolio", "work samples", "github"],
    response: `I've worked on several exciting projects including: ${portfolioData.projects.map(p => p.name).join(", ")}. My most recent project is ${portfolioData.projects[0].name}, which is ${portfolioData.projects[0].description.toLowerCase()}.`
  },
  
  // Education
  {
    keywords: ["education", "degree", "university", "study"],
    response: `I graduated with a ${portfolioData.education[0].degree} from ${portfolioData.education[0].institution} in ${portfolioData.education[0].year}.`
  },
  
  // Availability
  {
    keywords: ["available", "hire", "freelance", "opportunities"],
    response: "I'm always open to discussing new opportunities and interesting projects. Feel free to reach out to me to discuss how we can work together!"
  },
  
  // Default responses
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: `Hello! I'm ${portfolioData.personalInfo.name}'s AI assistant. I can tell you about my background, skills, experience, and projects. What would you like to know?`
  }
];