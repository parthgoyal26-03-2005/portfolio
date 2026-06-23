export const SITE = {
  name: "PARTH GOYAL",
  tagline: "Information Technology student and full-stack developer",
  email: "pg962359@gmail.com",
  location: "India, New Delhi",
  year: new Date().getFullYear(),
  github: "parthgoyal26-03-2005",
  leetcode: "draftpunk", // set your LeetCode username here to enable live stats
} as const;

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://github.com/parthgoyal26-03-2005", label: "GitHub" },
  { href: "https://www.linkedin.com/in/parth-goyal-280925291/", label: "LinkedIn" },
  { href: "https://x.com/draftpunk6996", label: "Twitter" },
  { href: `mailto:${SITE.email}`, label: "Email" },
] as const;

export const HERO_STACK = [
  {
    icon: "terminal" as const,
    title: "Frontend",
    subtitle: "React, Next.js, TypeScript",
    accent: "primary" as const,
  },
  {
    icon: "database" as const,
    title: "Backend",
    subtitle: "Node, Express, DRF",
    accent: "secondary" as const,
  },
  {
    icon: "cloud" as const,
    title: "APIs & Tools",
    subtitle: "REST, Postman, Vercel",
    accent: "primary" as const,
  },
  {
    icon: "token" as const,
    title: "AI Systems",
    subtitle: "RAG, LangChain, Ollama",
    accent: "tertiary" as const,
  },
] as const;

export const CORE_STACK = [
  { icon: "database" as const, label: "MERN", accent: "primary" as const },
  { icon: "cube" as const, label: "WebSockets", accent: "secondary" as const },
  { icon: "sparkles" as const, label: "LangChain", accent: "primary" as const },
  { icon: "code" as const, label: "Next.js", accent: "secondary" as const },
] as const;

export const SKILL_CHIPS = [
  "ReactJS",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "SCSS",
  "Node.js",
  "Express.js",
  "Django REST Framework",
  "WebSockets",
  "Python",
  "C++",
  "MongoDB",
  "PostgreSQL",
  "Prisma ORM",
  "Qdrant",
  "LangChain",
  "Ollama",
  "RAG Pipelines",
  "Git",
  "GitHub",
  "Postman",
  "Vercel",
  "REST APIs",
] as const;

export const EXPERIENCE = [
  {
    period: "June 2025 - August 2025",
    role: "Software Development Intern",
    company: "PayMeIndia (AstroSutra Project)",
    description:
      "Modernized the AstroSutra frontend by architecting 3 core modules and 15+ reusable Next.js components, reducing future development time by 20%. Built 12+ REST API endpoints with Django REST Framework for authentication, business logic, and secure transaction workflows.",
    tags: ["Next.js", "Django REST Framework", "REST APIs"],
    accent: "primary" as const,
  },
  {
    period: "2023 - 2027",
    role: "B.Tech in Information Technology",
    company: "Bharati Vidyapeeth's College of Engineering (BVCOE), New Delhi",
    description:
      "Pursuing a Bachelor of Technology in Information Technology with a GPA of 9.12/10.0.",
    tags: ["Information Technology", "GPA 9.12/10"],
    accent: "secondary" as const,
  },
  {
    period: "Leadership",
    role: "Technical Head",
    company: "College Tech Society",
    description:
      "Mentored a team of 10+ junior developers to rebuild the society's official website, improving mobile accessibility scores by 30%.",
    tags: ["Mentorship", "Frontend", "Accessibility"],
    accent: "muted" as const,
  },
] as const;

export type Project = (typeof PROJECTS)[number];

export const PROJECTS = [
  {
    id: "darkcomms",
    title: "DarkComms",
    description:
      "Real-time chat application using WebSockets with instant messaging and support for multiple active chatrooms. WebSocket delivery reduced latency by 180ms compared with traditional HTTP polling.",
    tags: ["ReactJS", "WebSockets", "Express.js", "Tailwind CSS", "Clerk Auth"],
    href: "https://dark-comms.vercel.app/",
    github: "https://github.com/parthgoyal26-03-2005/DarkComms",
    image: "/homepageui.png",
    span: "lg" as const,
    year: "2025",
    status: "Live" as const,
    previewUrl: "DarkComms - Live/GitHub",
    accent: "primary" as const,
  },
  {
    id: "melody",
    title: "Melody",
    description:
      "Spotify-inspired music player interface with responsive layouts, interactive playback controls, seek controls, volume adjustment, progress tracking, and playlist interaction.",
    tags: ["ReactJS", "Tailwind CSS", "State Management"],
    href: "https://melody-song-app.vercel.app/",
    github: "https://github.com/parthgoyal26-03-2005/melody-song-app-",
    image: "/melody.png",
    span: "md" as const,
    year: "2025",
    status: "Live" as const,
    previewUrl: "Melody - Live/GitHub",
    accent: "secondary" as const,
  },
  {
    id: "planora",
    title: "Planora",
    description:
      "Kanban-style task management application with dynamic boards, task organization, and drag-and-drop workflows. Designed REST APIs and integrated MongoDB for task management, authentication, and real-time state updates.",
    tags: ["ReactJS", "MongoDB", "Express.js", "Node.js", "Tailwind"],
    href: "https://planora-one.vercel.app/",
    github: "https://github.com/parthgoyal26-03-2005/planora-app",
    image: "/planora.png",
    span: "sm" as const,
    year: "2025",
    status: "Live" as const,
    previewUrl: "Planora - Live/GitHub",
    accent: "secondary" as const,
  }
  // {
  //   id: "rag-engine",
  //   title: "Retrieval-Augmented Generation Engine",
  //   description:
  //     "Document-based RAG pipeline for querying PDF knowledge bases with embeddings and vector search. Integrated Qdrant and local LLM models to generate context-aware responses from uploaded documents.",
  //   tags: ["Python", "LangChain", "Ollama", "Qdrant", "LLMs"],
  //   href: "https://github.com/parthgoyal26-03-2005",
  //   span: "cta" as const,
  //   year: "2026",
  //   status: "Open Source" as const,
  //   accent: "primary" as const,
  // },
] as const;

export const IMAGES = {
  heroOrb: "/parthgoyal.jpeg",
  portrait: "/parthjpeg.jpeg",
  } as const;
