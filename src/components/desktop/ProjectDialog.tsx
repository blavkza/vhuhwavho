import React, { useState } from "react";
import {
  Globe,
  Database,
  Code,
  X,
  ExternalLink,
  Lock,
  User,
  ChevronLeft,
  ChevronRight,
  Star,
  Image as ImageIcon,
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

interface ProjectDialogProps {
  project: Project;
  onClose?: () => void;
}

export const ProjectDialog = ({ project, onClose }: ProjectDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const getProjectIcon = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Biz: <Database size={24} className="text-white" />,
      Auto: <Code size={24} className="text-white" />,
      AI: <Code size={24} className="text-white" />,
      Portfolio: <Code size={24} className="text-white" />,
      School: <Database size={24} className="text-white" />,
      Tsholofelo: <Globe size={24} className="text-white" />,
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (title.includes(key)) return icon;
    }
    return <Code size={24} className="text-white" />;
  };

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

    return (
      <div
        className={`w-full h-full ${project.imageColor} flex flex-col items-center justify-center`}
      >
        <ImageIcon size={48} className="text-white/50 mb-2" />
        <span className="text-white/70 text-sm">{image.alt}</span>
        {showCaption && image.caption && (
          <span className="text-white/50 text-xs mt-1">{image.caption}</span>
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-white dark:bg-gray-900 overflow-y-auto">
      {/* Header */}

      {/* Content */}
      <div className="p-2 space-y-6">
        {/* Project Image Slider */}
        <div className="relative h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          {project.images.length > 0 ? (
            <>
              {/* Current Image */}
              {renderProjectImage(project.images[currentImageIndex], true)}

              {/* Navigation Arrows */}
              {project.images.length > 1 && (
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
                    {project.images.map((_, index) => (
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
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <ImageIcon size={64} className="text-gray-400 mb-4" />
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        {/* Thumbnail Preview */}
        {project.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {project.images.map((image, index) => (
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
            {project.fullDescription}
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
              {project.features?.map((feature, index) => (
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
              {project.technologies.map((tech, index) => (
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
        {project.loginDetails && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Lock size={18} /> Demo Access
            </h3>
            <div className="space-y-3">
              {project.loginDetails.username && (
                <div className="flex items-center gap-3">
                  <User size={16} className="text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Username</div>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                      {project.loginDetails.username}
                    </div>
                  </div>
                </div>
              )}
              {project.loginDetails.password && (
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Password</div>
                    <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                      {project.loginDetails.password}
                    </div>
                  </div>
                </div>
              )}
              {project.loginDetails.note && (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {project.loginDetails.note}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Challenges & Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Challenges Faced
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
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
          {project.lessons && project.lessons.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {project.lessons.map((lesson, index) => (
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
          {project.liveUrl && (
            <button
              onClick={() => window.open(project.liveUrl, "_blank")}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors"
            >
              <ExternalLink size={18} />
              Visit Live Demo
            </button>
          )}
          {project.githubUrl && (
            <button
              onClick={() => window.open(project.githubUrl, "_blank")}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors"
            >
              <Code size={18} />
              View Source Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
