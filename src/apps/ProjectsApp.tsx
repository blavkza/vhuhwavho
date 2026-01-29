import React, { useState } from "react";
import { FinderLayout } from "@/components/layout/FinderLayout";
import {
  Folder,
  Star,
  Clock,
  Globe,
  Database,
  Code,
  Smartphone,
  ShoppingBag,
  Bot,
  Utensils,
  X,
  ExternalLink,
  Lock,
  User,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Circle,
} from "lucide-react";

interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: "featured" | "recent" | "all";
  githubUrl?: string;
  liveUrl?: string;
  status: "Completed" | "In Progress";
  imageColor: string;
  images: ProjectImage[];
  features?: string[];
  loginDetails?: {
    username?: string;
    password?: string;
    note?: string;
  };
  challenges?: string[];
  lessons?: string[];
}

export const ProjectsApp = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Biz Flow",
      description:
        "Full-stack business Management System with admin dashboard.",
      fullDescription:
        "A comprehensive business management system designed for small to medium enterprises. It includes inventory management, customer relationship management, invoicing, and analytics dashboards. The system helps businesses streamline operations and make data-driven decisions.",
      technologies: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma",
      ],
      category: "featured",
      githubUrl: "",
      liveUrl: "https://biz-flow-demo.vercel.app/",
      status: "Completed",
      imageColor: "bg-gradient-to-br from-orange-500 to-red-600",
      images: [
        {
          url: "/projects/biz-flow-1.png",
          alt: "Biz Flow Dashboard",
          caption: "Main Dashboard",
        },
        {
          url: "/projects/biz-flow-2.png",
          alt: "Inventory Management",
          caption: "Attendence Management",
        },
        {
          url: "/projects/biz-flow-3.png",
          alt: "Analytics",
          caption: "Point Of Sale",
        },
      ],
      features: [
        "Inventory management with real-time tracking",
        "Customer relationship management (CRM)",
        "Invoicing and payment processing",
        "Analytics dashboard with charts",
        "Role-based access control",
        "Task and projects Management",
      ],
      loginDetails: {
        username: "nekhofhe12",
        password: "Vhuhwavho@123",
        note: "Use these credentials to access the admin dashboard",
      },
      challenges: [
        "Implementing real-time inventory updates",
        "Handling concurrent transactions",
        "Optimizing database queries for large datasets",
      ],
      lessons: [
        "Learned about transaction management in PostgreSQL",
        "Implemented efficient caching strategies",
        "Mastered role-based access control patterns",
      ],
    },
    {
      id: 2,
      title: "Auto Engage",
      description:
        "AI-powered chat bot for website integration and email marketing.",
      fullDescription:
        "An intelligent chatbot platform that can be integrated into any website to engage visitors, capture leads, and provide instant customer support. Includes email marketing automation and analytics.",
      technologies: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "OpenAI API",
      ],
      category: "featured",
      githubUrl: "https://github.com/blavkza",
      liveUrl: "https://auto-engage.vercel.app/",
      status: "Completed",
      imageColor: "bg-gradient-to-br from-blue-500 to-purple-600",
      images: [
        {
          url: "/projects/auto-engage-1.png",
          alt: "Auto Engage Chat Interface",
          caption: "Landing Page",
        },
        {
          url: "/projects/auto-engage-2.png",
          alt: "Dashboard",
          caption: "Analytics Dashboard",
        },
        {
          url: "/projects/auto-engage-3.png",
          alt: "Settings",
          caption: "Email Marketing Configuration ",
        },
      ],
      features: [
        "AI-powered chatbot with natural language processing",
        "Easy website integration via script tag",
        "Email marketing automation",
        "Conversation analytics",
        "Lead capture forms",
      ],
      loginDetails: {
        username: "",
        password: "",
        note: " Create account to get access ",
      },
      challenges: [
        "Training AI model for specific business contexts",
        "Real-time chat synchronization",
        "Scalability for high traffic websites",
      ],
      lessons: [
        "Mastered OpenAI / gemini API integration",
        "Learned about real-time communication",
        "Implemented rate limiting and load balancing",
      ],
    },
    {
      id: 3,
      title: "Rethynk AI",
      description: "Website and web App AI generator.",
      fullDescription:
        "An AI-powered platform that generates complete websites and web applications based on user descriptions. The platform uses AI to create responsive designs, write code, and deploy applications automatically.",
      technologies: [
        "Next.js",
        "React Native",
        "Convex",
        "Google Auth",
        "OpenAI",
        "Vercel",
      ],
      category: "recent",
      githubUrl: "https://github.com/blavkza",
      liveUrl: "https://rethynk-ai.vercel.app/",
      status: "In Progress",
      imageColor: "bg-gradient-to-br from-green-500 to-teal-600",
      images: [
        {
          url: "/projects/rethynk-1.png",
          alt: "Rethynk AI Generator",
          caption: "AI Generator Interface",
        },
        {
          url: "/projects/rethynk-2.png",
          alt: "Code Preview",
          caption: "Prompt Intarface",
        },
        {
          url: "/projects/rethynk-3.png",
          alt: "Deployment",
          caption: "Generated Code Preview",
        },
      ],
      features: [
        "AI-powered website generation from descriptions",
        "Code generation in multiple languages",
        "Automatic deployment to Vercel",
        "Design customization options",
        "Preview mode before deployment",
        "Export generated code",
      ],
      loginDetails: {
        username: "",
        password: "",
        note: "Create Account to access ,Limited credits for AI generation",
      },
      challenges: [
        "Generating production-ready code",
        "Ensuring responsive design across devices",
        "Managing AI API costs and rate limits",
      ],
      lessons: [
        "Advanced prompt engineering techniques",
        "Code generation and validation",
        "Cloud deployment automation",
      ],
    },
    {
      id: 4,
      title: "Portfolio OS (This Site)",
      description:
        "Interactive macOS-style portfolio with draggable windows and animations.",
      fullDescription:
        "A creative portfolio website that mimics the macOS desktop experience. Features draggable windows, a functional dock, system animations, and interactive applications showcasing my work and skills.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Framer Motion",
        "Zustand",
        "Tailwind CSS",
        "Lucide Icons",
      ],
      category: "recent",
      githubUrl: "https://github.com/blavkza",
      status: "Completed",
      imageColor: "bg-gradient-to-br from-gray-800 to-gray-900",
      images: [
        {
          url: "/projects/portfolio-1.png",
          alt: "Portfolio Desktop",
          caption: "Desktop View",
        },
        {
          url: "/projects/portfolio-2.png",
          alt: "Projects Window",
          caption: "Projects Application",
        },
        {
          url: "/projects/portfolio-3.png",
          alt: "Contact Window",
          caption: "Contact Application",
        },
      ],
      features: [
        "Draggable and resizable windows",
        "Interactive dock with hover effects",
        "System-wide animations",
        "Multiple 'apps' showcasing projects",
        "Responsive design",
        "Dark/light theme support",
      ],
      challenges: [
        "Implementing smooth window dragging",
        "Managing z-index for multiple windows",
        "Creating realistic macOS UI elements",
      ],
      lessons: [
        "Advanced Framer Motion animations",
        "State management with Zustand",
        "Creating interactive UI components",
      ],
    },
    {
      id: 5,
      title: "First School",
      description: "School management system with student and parent access.",
      fullDescription:
        "A comprehensive school management system that handles student records, attendance, grades, and communication between teachers, students, and parents. Includes role-based dashboards and reporting tools.",
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "JWT",
      ],
      category: "all",
      githubUrl: "https://github.com/blavkza",
      liveUrl: "https://first-school.vercel.app/",
      status: "Completed",
      imageColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
      images: [
        {
          url: "/projects/school-1.png",
          alt: "First School Dashboard",
          caption: "Admin Dashboard",
        },
        {
          url: "/projects/school-2.png",
          alt: "Student Management",
          caption: "Subject Assets",
        },
        {
          url: "/projects/school-3.png",
          alt: "Gradebook",
          caption: "Student Records",
        },
      ],
      features: [
        "Student information management",
        "Attendance tracking system",
        "Gradebook ",
        "Parent , teacher , student portal",
        "Timetable management",
      ],
      loginDetails: {
        username: "vhuhwavho",
        password: "Vhuhwavho@123",
        note: "Access Admin dashboard with demo data , You can add other user type and login`",
      },
      challenges: [
        "Managing complex user roles and permissions",
        "Handling bulk data uploads",
        "Ensuring data privacy and security",
      ],
      lessons: [
        "Complex role-based access control",
        "Data modeling for educational systems",
        "Bulk operations optimization",
      ],
    },
    {
      id: 6,
      title: "Tsholofelo Funeral Website",
      description: "Real-time Business Website for a funeral services company.",
      fullDescription:
        "A professional website for Tsholofelo Funeral Services, providing information about services, pricing, and contact details. Includes an admin panel for managing content and service requests.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Sanity CMS",
        "EmailJS",
      ],
      category: "all",
      githubUrl: "https://github.com/blavkza",
      liveUrl: "https://www.tsholofelofuneralservices.co.za/",
      status: "Completed",
      imageColor: "bg-gradient-to-br from-cyan-500 to-blue-500",
      images: [
        {
          url: "/projects/tsholofelo-1.png",
          alt: "Tsholofelo Homepage",
          caption: "Homepage",
        },
        {
          url: "/projects/tsholofelo-2.png",
          alt: "Services Page",
          caption: "Services Page",
        },
        {
          url: "/projects/tsholofelo-3.png",
          alt: "Contact Page",
          caption: "Gallary Page",
        },
      ],
      features: [
        "Service information and pricing",
        "Online inquiry and contact forms",
        "Blog for announcements and articles",
        "Admin content management system",
        "Responsive design for all devices",
        "Fast loading and SEO optimized",
      ],
      loginDetails: {
        username: "admin@tsholofelo.com",
        password: "admin2024",
        note: "Content management system access",
      },
      challenges: [
        "Creating a respectful and professional design",
        "Implementing secure contact forms",
        "Optimizing for mobile users",
      ],
      lessons: [
        "Headless CMS integration",
        "Form validation and security",
        "Professional service website design",
      ],
    },
  ];

  const sidebarItems = [
    {
      id: "all",
      label: "All Projects",
      icon: Folder,
      active: activeTab === "all",
      onClick: () => setActiveTab("all"),
    },
    {
      id: "featured",
      label: "Featured",
      icon: Star,
      active: activeTab === "featured",
      onClick: () => setActiveTab("featured"),
    },
    {
      id: "recent",
      label: "Recent",
      icon: Clock,
      active: activeTab === "recent",
      onClick: () => setActiveTab("recent"),
    },
  ];

  const filteredProjects = projects.filter((project) =>
    activeTab === "all" ? true : project.category === activeTab
  );

  const getProjectIcon = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Biz: <Database size={24} className="text-white" />,
      Auto: <Bot size={24} className="text-white" />,
      AI: <Code size={24} className="text-white" />,
      Portfolio: <Code size={24} className="text-white" />,
      School: <Folder size={24} className="text-white" />,
      Tsholofelo: <Globe size={24} className="text-white" />,
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (title.includes(key)) return icon;
    }
    return <Code size={24} className="text-white" />;
  };

  const openProjectDialog = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Helper function to render project image or placeholder
  const renderProjectImage = (
    image: ProjectImage,
    showCaption: boolean = false
  ) => {
    if (image.url.startsWith("/")) {
      return (
        <div className="relative w-full h-full">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {showCaption && image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
              {image.caption}
            </div>
          )}
        </div>
      );
    }

    // Fallback placeholder with gradient
    return (
      <div
        className={`w-full h-full ${
          selectedProject?.imageColor ||
          "bg-gradient-to-br from-gray-800 to-gray-900"
        } flex flex-col items-center justify-center`}
      >
        <ImageIcon size={48} className="text-white/50 mb-2" />
        <span className="text-white/70 text-sm">{image.alt}</span>
        {showCaption && image.caption && (
          <span className="text-white/50 text-xs mt-1">{image.caption}</span>
        )}
        <span className="text-white/40 text-xs mt-2">
          (Add image in /projects folder)
        </span>
      </div>
    );
  };

  return (
    <>
      <FinderLayout title="My Projects" sidebarItems={sidebarItems}>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            A collection of my recent work and side projects. Click on any
            project to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl shadow-md"
              onClick={() => openProjectDialog(project)}
            >
              {/* Project Images Slider */}
              <div className="relative h-48 overflow-hidden">
                {project.images.length > 0 ? (
                  <>
                    {/* Main Image */}
                    <div className="w-full h-full">
                      {renderProjectImage(project.images[0])}
                    </div>

                    {/* Image Count Indicator */}
                    {project.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                        +{project.images.length - 1} more
                      </div>
                    )}

                    {/* Project Icon Overlay */}
                    <div className="absolute bottom-3 left-3">
                      <div
                        className={`w-10 h-10 rounded-full ${project.imageColor} flex items-center justify-center`}
                      >
                        {getProjectIcon(project.title)}
                      </div>
                    </div>
                  </>
                ) : (
                  // Fallback if no images
                  <div
                    className={`w-full h-full ${project.imageColor} flex items-center justify-center`}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {getProjectIcon(project.title)}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-gray-800/50 text-gray-300 px-2 py-1 rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Code size={12} /> Click to view {project.images.length}{" "}
                    images
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {projects.length}
              </div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {projects.filter((p) => p.status === "Completed").length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {projects.filter((p) => p.status === "In Progress").length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {projects.reduce((total, p) => total + p.images.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Images</div>
            </div>
          </div>
        </div>
      </FinderLayout>

      {/* Project Details Dialog */}
      {showDialog && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-white/20">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      selectedProject.status === "Completed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedProject.images.length} images
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedProject.category.charAt(0).toUpperCase() +
                      selectedProject.category.slice(1)}{" "}
                    Project
                  </span>
                </div>
              </div>
              <button
                onClick={closeDialog}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Project Image Slider */}
              <div className="relative h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                {selectedProject.images.length > 0 ? (
                  <>
                    {/* Current Image */}
                    {renderProjectImage(
                      selectedProject.images[currentImageIndex],
                      true
                    )}

                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                        >
                          <ChevronRight size={20} />
                        </button>

                        {/* Image Dots */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToImage(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "bg-white w-4"
                                  : "bg-white/50 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                          {currentImageIndex + 1} /{" "}
                          {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <ImageIcon size={64} className="text-gray-400 mb-4" />
                    <p className="text-gray-500">No images available</p>
                    <p className="text-gray-400 text-sm">
                      Add images to /projects folder
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnail Preview */}
              {selectedProject.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedProject.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Project Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Star size={18} /> Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Code size={18} /> Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-500/10 text-blue-500 dark:text-blue-400 px-3 py-1.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Login Details */}
              {selectedProject.loginDetails && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Lock size={18} /> Demo Access
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.loginDetails.username && (
                      <div className="flex items-center gap-3">
                        <User size={16} className="text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-500">Username</div>
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                            {selectedProject.loginDetails.username}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedProject.loginDetails.password && (
                      <div className="flex items-center gap-3">
                        <Lock size={16} className="text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-500">Password</div>
                          <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                            {selectedProject.loginDetails.password}
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedProject.loginDetails.note && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {selectedProject.loginDetails.note}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Challenges & Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedProject.challenges &&
                  selectedProject.challenges.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Challenges Faced
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map((challenge, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-300"
                          >
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {selectedProject.lessons &&
                  selectedProject.lessons.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Learnings
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.lessons.map((lesson, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 dark:text-gray-300"
                          >
                            • {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <button
                    onClick={() =>
                      window.open(selectedProject.liveUrl, "_blank")
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <ExternalLink size={18} />
                    Visit Live Demo
                  </button>
                )}
                {selectedProject.githubUrl && (
                  <button
                    onClick={() =>
                      window.open(selectedProject.githubUrl, "_blank")
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Code size={18} />
                    View Source Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Biz Flow",
    description: "Full-stack business Management System with admin dashboard.",
    fullDescription:
      "A comprehensive business management system designed for small to medium enterprises. It includes inventory management, customer relationship management, invoicing, and analytics dashboards. The system helps businesses streamline operations and make data-driven decisions.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Stripe",
    ],
    category: "featured",
    githubUrl: "",
    liveUrl: "https://biz-flow-demo.vercel.app/",
    status: "Completed",
    imageColor: "bg-gradient-to-br from-orange-500 to-red-600",
    images: [
      {
        url: "/projects/biz-flow-1.png",
        alt: "Biz Flow Dashboard",
        caption: "Main Dashboard",
      },
      {
        url: "/projects/biz-flow-2.png",
        alt: "Inventory Management",
        caption: "Attendence Management",
      },
      {
        url: "/projects/biz-flow-3.png",
        alt: "Analytics",
        caption: "Point Of Sale",
      },
    ],
    features: [
      "Inventory management with real-time tracking",
      "Customer relationship management (CRM)",
      "Invoicing and payment processing",
      "Analytics dashboard with charts",
      "Role-based access control",
      "Task and projects Management",
    ],
    loginDetails: {
      username: "nekhofhe12",
      password: "Vhuhwavho@123",
      note: "Use these credentials to access the admin dashboard",
    },
    challenges: [
      "Implementing real-time inventory updates",
      "Handling concurrent transactions",
      "Optimizing database queries for large datasets",
    ],
    lessons: [
      "Learned about transaction management in PostgreSQL",
      "Implemented efficient caching strategies",
      "Mastered role-based access control patterns",
    ],
  },
  {
    id: 2,
    title: "Auto Engage",
    description:
      "AI-powered chat bot for website integration and email marketing.",
    fullDescription:
      "An intelligent chatbot platform that can be integrated into any website to engage visitors, capture leads, and provide instant customer support. Includes email marketing automation and analytics.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "OpenAI API",
    ],
    category: "featured",
    githubUrl: "https://github.com/blavkza",
    liveUrl: "https://auto-engage.vercel.app/",
    status: "Completed",
    imageColor: "bg-gradient-to-br from-blue-500 to-purple-600",
    images: [
      {
        url: "/projects/auto-engage-1.png",
        alt: "Auto Engage Chat Interface",
        caption: "Landing Page",
      },
      {
        url: "/projects/auto-engage-2.png",
        alt: "Dashboard",
        caption: "Analytics Dashboard",
      },
      {
        url: "/projects/auto-engage-3.png",
        alt: "Settings",
        caption: "Email Marketing Configuration ",
      },
    ],
    features: [
      "AI-powered chatbot with natural language processing",
      "Easy website integration via script tag",
      "Email marketing automation",
      "Conversation analytics",
      "Lead capture forms",
    ],
    loginDetails: {
      username: "",
      password: "",
      note: " Create account to get access ",
    },
    challenges: [
      "Training AI model for specific business contexts",
      "Real-time chat synchronization",
      "Scalability for high traffic websites",
    ],
    lessons: [
      "Mastered OpenAI / gemini API integration",
      "Learned about real-time communication",
      "Implemented rate limiting and load balancing",
    ],
  },
  {
    id: 3,
    title: "Rethynk AI",
    description: "Website and web App AI generator.",
    fullDescription:
      "An AI-powered platform that generates complete websites and web applications based on user descriptions. The platform uses AI to create responsive designs, write code, and deploy applications automatically.",
    technologies: [
      "Next.js",
      "React Native",
      "Convex",
      "Google Auth",
      "OpenAI",
      "Vercel",
    ],
    category: "recent",
    githubUrl: "https://github.com/blavkza",
    liveUrl: "https://rethynk-ai.vercel.app/",
    status: "In Progress",
    imageColor: "bg-gradient-to-br from-green-500 to-teal-600",
    images: [
      {
        url: "/projects/rethynk-1.png",
        alt: "Rethynk AI Generator",
        caption: "AI Generator Interface",
      },
      {
        url: "/projects/rethynk-2.png",
        alt: "Code Preview",
        caption: "Prompt Intarface",
      },
      {
        url: "/projects/rethynk-3.png",
        alt: "Deployment",
        caption: "Generated Code Preview",
      },
    ],
    features: [
      "AI-powered website generation from descriptions",
      "Code generation in multiple languages",
      "Automatic deployment to Vercel",
      "Design customization options",
      "Preview mode before deployment",
      "Export generated code",
    ],
    loginDetails: {
      username: "",
      password: "",
      note: "Create Account to access ,Limited credits for AI generation",
    },
    challenges: [
      "Generating production-ready code",
      "Ensuring responsive design across devices",
      "Managing AI API costs and rate limits",
    ],
    lessons: [
      "Advanced prompt engineering techniques",
      "Code generation and validation",
      "Cloud deployment automation",
    ],
  },
  {
    id: 4,
    title: "Portfolio OS (This Site)",
    description:
      "Interactive macOS-style portfolio with draggable windows and animations.",
    fullDescription:
      "A creative portfolio website that mimics the macOS desktop experience. Features draggable windows, a functional dock, system animations, and interactive applications showcasing my work and skills.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Zustand",
      "Tailwind CSS",
      "Lucide Icons",
    ],
    category: "recent",
    githubUrl: "https://github.com/blavkza",
    status: "Completed",
    imageColor: "bg-gradient-to-br from-gray-800 to-gray-900",
    images: [
      {
        url: "/projects/portfolio-1.png",
        alt: "Portfolio Desktop",
        caption: "Desktop View",
      },
      {
        url: "/projects/portfolio-2.png",
        alt: "Projects Window",
        caption: "Projects Application",
      },
      {
        url: "/projects/portfolio-3.png",
        alt: "Contact Window",
        caption: "Contact Application",
      },
    ],
    features: [
      "Draggable and resizable windows",
      "Interactive dock with hover effects",
      "System-wide animations",
      "Multiple 'apps' showcasing projects",
      "Responsive design",
      "Dark/light theme support",
    ],
    challenges: [
      "Implementing smooth window dragging",
      "Managing z-index for multiple windows",
      "Creating realistic macOS UI elements",
    ],
    lessons: [
      "Advanced Framer Motion animations",
      "State management with Zustand",
      "Creating interactive UI components",
    ],
  },
  {
    id: 5,
    title: "First School",
    description: "School management system with student and parent access.",
    fullDescription:
      "A comprehensive school management system that handles student records, attendance, grades, and communication between teachers, students, and parents. Includes role-based dashboards and reporting tools.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Chart.js", "JWT"],
    category: "all",
    githubUrl: "https://github.com/blavkza",
    liveUrl: "https://first-school.vercel.app/",
    status: "Completed",
    imageColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
    images: [
      {
        url: "/projects/school-1.png",
        alt: "First School Dashboard",
        caption: "Admin Dashboard",
      },
      {
        url: "/projects/school-2.png",
        alt: "Student Management",
        caption: "Subject Assets",
      },
      {
        url: "/projects/school-3.png",
        alt: "Gradebook",
        caption: "Student Records",
      },
    ],
    features: [
      "Student information management",
      "Attendance tracking system",
      "Gradebook ",
      "Parent , teacher , student portal",
      "Timetable management",
    ],
    loginDetails: {
      username: "vhuhwavho",
      password: "Vhuhwavho@123",
      note: "Access Admin dashboard with demo data , You can add other user type and login`",
    },
    challenges: [
      "Managing complex user roles and permissions",
      "Handling bulk data uploads",
      "Ensuring data privacy and security",
    ],
    lessons: [
      "Complex role-based access control",
      "Data modeling for educational systems",
      "Bulk operations optimization",
    ],
  },
  {
    id: 6,
    title: "Tsholofelo Funeral Website",
    description: "Real-time Business Website for a funeral services company.",
    fullDescription:
      "A professional website for Tsholofelo Funeral Services, providing information about services, pricing, and contact details. Includes an admin panel for managing content and service requests.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Sanity CMS",
      "EmailJS",
    ],
    category: "all",
    githubUrl: "https://github.com/blavkza",
    liveUrl: "https://www.tsholofelofuneralservices.co.za/",
    status: "Completed",
    imageColor: "bg-gradient-to-br from-cyan-500 to-blue-500",
    images: [
      {
        url: "/projects/tsholofelo-1.png",
        alt: "Tsholofelo Homepage",
        caption: "Homepage",
      },
      {
        url: "/projects/tsholofelo-2.png",
        alt: "Services Page",
        caption: "Services Page",
      },
      {
        url: "/projects/tsholofelo-3.png",
        alt: "Contact Page",
        caption: "Gallary Page",
      },
    ],
    features: [
      "Service information and pricing",
      "Online inquiry and contact forms",
      "Blog for announcements and articles",
      "Admin content management system",
      "Responsive design for all devices",
      "Fast loading and SEO optimized",
    ],
    loginDetails: {
      username: "admin@tsholofelo.com",
      password: "admin2024",
      note: "Content management system access",
    },
    challenges: [
      "Creating a respectful and professional design",
      "Implementing secure contact forms",
      "Optimizing for mobile users",
    ],
    lessons: [
      "Headless CMS integration",
      "Form validation and security",
      "Professional service website design",
    ],
  },
];
