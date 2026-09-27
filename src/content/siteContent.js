export const defaultServices = [
  {
    id: "frontend-development",
    slug: "frontend-development",
    title: "Front End Development",
    summary: "Responsive, accessible interfaces that turn product ideas into clear digital experiences.",
    audience: "Teams and organizations that need a modern public website or web application.",
    description: "I build responsive React interfaces with careful attention to accessibility, performance, and maintainable component architecture.",
    deliverables: ["Responsive interface", "Reusable component system", "Accessibility review", "Deployment support"],
    technologies: ["React", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend-development",
    slug: "backend-development",
    title: "Back End Development",
    summary: "Reliable application data, authentication, storage, and APIs for useful web products.",
    audience: "Products that need secure data storage, user access, or content management.",
    description: "I connect interfaces to practical back-end services, with protected data access and clear loading and error states.",
    deliverables: ["Database model", "Authentication flow", "API integration", "Admin workflow"],
    technologies: ["Supabase", "Node.js", "REST APIs", "PostgreSQL"],
  },
  {
    id: "devops-digital-services",
    slug: "devops-digital-services",
    title: "DevOps and Digital Services",
    summary: "Deployment, domain, workflow, and operational support that keeps digital services dependable.",
    audience: "Small teams that need help moving from a working build to a maintainable live service.",
    description: "I help prepare applications for deployment, configure environments, document workflows, and improve operational reliability.",
    deliverables: ["Deployment setup", "Environment configuration", "Technical documentation", "Maintenance plan"],
    technologies: ["Vercel", "GitHub", "Linux", "CI workflows"],
  },
];

export const defaultArticles = [
  {
    id: "building-a-portfolio-as-a-working-system",
    slug: "building-a-portfolio-as-a-working-system",
    title: "Your Website Is More Than a Pretty Poster",
    category: "Simple Ideas",
    excerpt: "A good website should welcome people, answer their questions, and help them take the next step—even while you are sleeping.",
    author: "Agegnehu Yelib Tesfa",
    published_at: "2026-09-25",
    reading_time: 3,
    cover_image: "/insight-useful-website.webp",
    body: [
      { heading: "Imagine a helpful receptionist", text: "Your website is often the first person a visitor meets. It should quickly say who you are, what you do, and where to go next. If people need a treasure map to find your work, the design is not helping them." },
      { heading: "Pretty is good. Useful is better.", text: "Animations and colors can create a great first impression, but the website also needs to do a job. Projects should open, buttons should lead somewhere useful, and contact messages should reach a real person." },
      { heading: "The simple takeaway", text: "The best website is not the one with the most effects. It is the one that makes visitors think, “I understand this person, I trust their work, and I know what to do next.”" },
    ],
  },
  {
    id: "what-i-learned-connecting-react-and-supabase",
    slug: "what-i-learned-connecting-react-and-supabase",
    title: "What Building a Website Taught Me About Trust",
    category: "Lessons Learned",
    excerpt: "A website is like a small shop: the door should open, private rooms need locks, and visitors should never be left wondering what happened.",
    author: "Agegnehu Yelib Tesfa",
    published_at: "2026-09-24",
    reading_time: 3,
    cover_image: "/insight-digital-trust.webp",
    body: [
      { heading: "A hidden door still needs a lock", text: "Removing an admin button from the screen does not make private information safe. That is like hiding your house key under the mat and hoping nobody looks there. Real protection must work behind the scenes." },
      { heading: "Never leave people staring at a silent screen", text: "Sometimes the internet is slow or something goes wrong. A friendly “Still working…” or “Please try again” message is much better than making visitors wonder whether they broke the website." },
      { heading: "Good organization is a superpower", text: "Clear names and tidy information may not sound exciting, but they make a website easier to update and grow. It is the digital version of knowing exactly where you left your keys—surprisingly amazing." },
    ],
  },
];

export const processStages = [
  ["Understanding the problem", "We clarify the audience, goals, constraints, and definition of success.", "Context, priorities, and existing material.", "A shared problem statement."],
  ["Planning", "We define scope, information architecture, milestones, and technical approach.", "Feedback on priorities and timing.", "A practical delivery plan."],
  ["Design", "We shape content hierarchy, interface patterns, responsive behavior, and accessibility.", "Brand assets and focused review.", "Approved interface direction."],
  ["Development", "I build the interface, data flows, and content-management features in tested increments.", "Timely decisions and content.", "A working implementation."],
  ["Review", "We test the main journeys, fix defects, and check content on mobile and desktop.", "Acceptance feedback.", "A release-ready build."],
  ["Launch", "The approved build is deployed with production settings, metadata, and domain checks.", "Final approval and account access.", "A live, documented service."],
  ["Support and iteration", "We monitor issues, document improvements, and prioritize the next useful changes.", "Real-world feedback.", "A maintainable improvement plan."],
];

export const faqItems = [
  ["What kind of work can you help with?", "I focus on front-end development, back-end integration, content-managed websites, deployment, and practical digital-service support."],
  ["Can you work with an existing project?", "Yes. I can review an existing codebase, identify the highest-impact improvements, and work within its current stack when that is the safest approach."],
  ["How do projects begin?", "We begin with the problem, intended audience, available content, timeline, and a clear definition of what a successful delivery means."],
  ["Do you provide support after launch?", "Support can include deployment checks, documentation, fixes, and an agreed iteration plan."],
  ["Are all portfolio projects client projects?", "No. Each case study should state whether it is personal, educational, open-source, or client work and explain my exact contribution."],
];
