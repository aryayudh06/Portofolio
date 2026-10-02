export const site = {
  name: "Arya Yudha Kusuma Pranata",
  taglineLines: ["Building", "Intelligent Solutions, One", "Line at a Time."],
  welcome: "Welcome to my page",
};

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Me", href: "#about" },
  { label: "Portofolio", href: "#portfolio" },
];

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/aryayudh06", icon: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/arya-yudha-kusuma-pranata-02b9a219b/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aryayudha._/",
    icon: "instagram",
  },
  { name: "Email", href: "mailto:aryayudhakp@gmail.com", icon: "gmail" },
];

export const about = {
  title: "About Me",
  greeting: "Hi, I'm Arya Yudha Kusuma Pranata!",
  paragraphs: [
    "As a graduate of the Information Technology program at Universitas Brawijaya, I have strong interests and diverse experience in the field of information technology, particularly in data-related roles such as Data Engineer and Data Scientist, as well as in application development as a Fullstack Developer and Mobile Developer.",
    "Beyond academic experience, I have actively developed various software solutions through national-level competitions, which have strengthened my technical and problem-solving skills. I also gained professional experience as a Data Analyst Intern for three months at the Faculty of Computer Science Laboratory, where I was directly involved in data analysis and technology-based system development.",
    "I am highly motivated to continuously learn and improve my skills. Currently, I am independently working on personal projects to deepen my expertise, explore new technologies, and further enhance my practical experience in real-world problem solving..",
  ],
  image: "/img/Hero-Profile3.jpeg",
};

export const skills = [
  { label: "Front-End Dev", image: "/img/skills/React.png", alt: "react.js" },
  { label: "Machine Learning", image: "/img/skills/python.png", alt: "python" },
  { label: "Data Engineering", image: "/img/skills/mysql.png", alt: "mysql" },
  { label: "Back-End Dev", image: "/img/skills/Express.png", alt: "express.js"},
  { label: "Monitoring", image: "/img/skills/grafana.png", alt: "grafana" },
  { label: "Orchestration", image: "/img/skills/airflow.png", alt: "airflow" },
  { label: "Mobile Dev", image: "/img/skills/Kotlin.png", alt: "kotlin" },
  { label: "Visualization", image: "/img/skills/sap.png", alt: "sap" },
  {
    label: "Containerization & CICD",
    image: "/img/skills/docker.png",
    alt: "docker",
  },
  { label: "MLOps", image: "/img/skills/mlflow.png", alt: "mlflow" },
];

export const projects = [
  {
    title: "MeatGoals",
    image: "/img/projects/MeatGoals.png",
    tags: ["Mobile", "AI"],
    github: "https://github.com/aryayudh06/food-diet-app",
  },
  {
    title: "FamiliarFace",
    image: "/img/projects/familiarface.jpg",
    tags: ["Web", "AI"],
    github: "https://github.com/aryayudh06/FamiliarFaceWeb",
  },
  {
    title: "TopicModelling",
    image: "/img/projects/MlOPS.png",
    tags: ["AI", "DevOps"],
    github:
      "https://github.com/aryayudh06/TopicModelling-for-SemanticSholar-Literature",
  },
  {
    title: "DrHome",
    image: "/img/projects/drhome2.png",
    tags: ["Web"],
    github: "https://github.com/aryayudh06/DrHome",
  },
  {
    title: "Movie & Shows",
    image: "/img/projects/rdv.png",
    tags: ["Visualization", "Data/ML"],
    github: "https://github.com/aryayudh06/Movie-Show-Analysis",
  },
  {
    title: "Proctoring System",
    image: "/img/projects/proctring.png",
    tags: ["AI", "CI/CD"],
    github: "https://github.com/Suryy16/proctoring-system",
  },
];

// Resume timeline. Built only from the About text.
// Add real dates in `period` (e.g. "2021 - 2025"); empty strings are simply not shown.
// Reorder entries here if the sequence differs from reality.
export const resume = [
  {
    kind: "Education",
    title: "Information Technology",
    org: "Universitas Brawijaya",
    period: "",
    points: [
      "Graduated with a focus on data roles: Data Engineer and Data Scientist",
      "Also built toward Fullstack and Mobile Developer work",
    ],
  },
  {
    kind: "Competition",
    title: "National-level competitions",
    org: "",
    period: "",
    points: [
      "Developed software solutions for national competitions",
      "Sharpened technical and problem-solving skills",
    ],
  },
  {
    kind: "Experience",
    title: "Data Analyst Intern",
    org: "Faculty of Computer Science Laboratory",
    period: "3 months",
    points: [
      "Hands-on data analysis",
      "Technology-based system development",
    ],
  },
  {
    kind: "Now",
    title: "Independent projects",
    org: "Personal",
    period: "Ongoing",
    points: [
      "Deepening expertise and exploring new technologies",
      "Practising real-world problem solving",
    ],
  },
];
