import React, { useState, useMemo } from "react";
import {
  Image as ImageIcon,
  Clock,
  Map,
  Users,
  Heart,
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

interface Photo {
  id: string;
  url: string;
  date: string;
  location?: string;
  people?: string[];
  isFavorite: boolean;
  title?: string;
  featured?: boolean;
  project?: string;
}

const getProjectPhotos = (): Photo[] => {
  const projects = [
    {
      name: "Biz Flow",
      images: [
        { url: "/projects/biz-flow-1.png", caption: "Main Dashboard" },
        { url: "/projects/biz-flow-2.png", caption: "Attendence Management" },
        { url: "/projects/biz-flow-3.png", caption: "Point Of Sale" },
      ],
      date: "Dec 15, 2024",
      location: "Business Management System",
      featured: true,
    },
    {
      name: "Auto Engage",
      images: [
        { url: "/projects/auto-engage-1.png", caption: "Landing Page" },
        { url: "/projects/auto-engage-2.png", caption: "Analytics Dashboard" },
        {
          url: "/projects/auto-engage-3.png",
          caption: "Email Marketing Configuration",
        },
      ],
      date: "Nov 20, 2024",
      location: "AI Chatbot Platform",
      featured: true,
    },
    {
      name: "Rethynk AI",
      images: [
        { url: "/projects/rethynk-1.png", caption: "AI Generator Interface" },
        { url: "/projects/rethynk-2.png", caption: "Prompt Interface" },
        { url: "/projects/rethynk-3.png", caption: "Generated Code Preview" },
      ],
      date: "Jan 10, 2025",
      location: "AI Website Generator",
    },
    {
      name: "Portfolio OS",
      images: [
        { url: "/projects/portfolio-1.png", caption: "Desktop View" },
        { url: "/projects/portfolio-2.png", caption: "Projects Application" },
        { url: "/projects/portfolio-3.png", caption: "Contact Application" },
      ],
      date: "Feb 1, 2025",
      location: "Interactive Portfolio",
    },
    {
      name: "First School",
      images: [
        { url: "/projects/school-1.png", caption: "Admin Dashboard" },
        { url: "/projects/school-2.png", caption: "Subject Assets" },
        { url: "/projects/school-3.png", caption: "Student Records" },
      ],
      date: "Oct 5, 2024",
      location: "School Management System",
    },
    {
      name: "Tsholofelo",
      images: [
        { url: "/projects/tsholofelo-1.png", caption: "Homepage" },
        { url: "/projects/tsholofelo-2.png", caption: "Services Page" },
        { url: "/projects/tsholofelo-3.png", caption: "Gallary Page" },
      ],
      date: "Sep 12, 2024",
      location: "Funeral Services Website",
    },
  ];

  const photos: Photo[] = [];
  let idCounter = 1;

  projects.forEach((project) => {
    project.images.forEach((image, index) => {
      photos.push({
        id: `${idCounter}`,
        url: image.url,
        date: project.date,
        location: project.location,
        title: `${project.name} - ${image.caption}`,
        project: project.name,
        isFavorite: project.featured === true || index === 0,
        featured: project.featured === true && index === 0,
      });
      idCounter++;
    });
  });

  return photos;
};

const MOCK_PHOTOS: Photo[] = getProjectPhotos();

export const GalleryApp = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sidebarItems = [
    { id: "library", label: "Library", icon: ImageIcon },
    { id: "memories", label: "Memories", icon: Clock },
    { id: "projects", label: "Projects", icon: Map },
    { id: "favorites", label: "Favorites", icon: Heart },
  ];

  const filteredPhotos = useMemo(() => {
    switch (activeTab) {
      case "favorites":
        return photos.filter((p) => p.isFavorite);
      case "projects":
        return photos.filter((p) => p.project);
      case "memories":
        return photos.filter((p) => p.featured);
      case "library":
      default:
        return photos;
    }
  }, [activeTab, photos]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPhotos(
      photos.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const navigatePhoto = (direction: "next" | "prev") => {
    if (!selectedPhotoId) return;
    const currentIndex = filteredPhotos.findIndex(
      (p) => p.id === selectedPhotoId
    );
    if (currentIndex === -1) return;

    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = filteredPhotos.length - 1;
    if (newIndex >= filteredPhotos.length) newIndex = 0;

    setSelectedPhotoId(filteredPhotos[newIndex].id);
  };

  const getUniqueProjects = () => {
    const projects = new Set<string>();
    photos.forEach((photo) => {
      if (photo.project) projects.add(photo.project);
    });
    return Array.from(projects);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "memories":
        const featuredPhotos = photos.filter((p) => p.featured);
        return (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPhotos.slice(0, 2).map((photo, index) => (
              <div
                key={photo.id}
                className="aspect-video relative rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={photo.url}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">
                    {photo.project}
                  </h3>
                  <p className="text-gray-300">{photo.date}</p>
                  <p className="text-gray-400 text-sm">{photo.title}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Heart
                    size={14}
                    className={
                      photo.isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        const projects = getUniqueProjects();
        return (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((projectName) => {
              const projectPhotos = photos.filter(
                (p) => p.project === projectName
              );
              const mainPhoto = projectPhotos[0];

              return (
                <div
                  key={projectName}
                  className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer border border-white/10"
                  onClick={() => setSelectedPhotoId(mainPhoto.id)}
                >
                  <img
                    src={mainPhoto.url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {projectName}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {mainPhoto.location}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {projectPhotos.length} images
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(e, mainPhoto.id);
                      }}
                      className="p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
                    >
                      <Heart
                        size={16}
                        className={
                          mainPhoto.isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "library":
      case "favorites":
      default:
        return (
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-[200px]">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`relative group overflow-hidden rounded-md cursor-pointer ${
                  photo.featured ? "col-span-2 row-span-2" : "aspect-square"
                }`}
                onClick={() => setSelectedPhotoId(photo.id)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2">
                    <p className="text-white text-sm font-medium truncate">
                      {photo.project}
                    </p>
                    <p className="text-gray-300 text-xs truncate">
                      {photo.title}
                    </p>
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => toggleFavorite(e, photo.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50"
                >
                  <Heart
                    size={16}
                    className={
                      photo.isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }
                  />
                </button>
              </div>
            ))}
          </div>
        );
    }
  };

  const selectedPhoto = photos.find((p) => p.id === selectedPhotoId);

  return (
    <div className="flex h-full w-full text-white overflow-hidden font-sans relative">
      {/* Sidebar */}
      <div className="w-48 flex flex-col pt-10 pb-4 px-2 border-r border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="px-3 mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Photos
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                size={18}
                className={
                  activeTab === item.id ? "text-blue-400" : "text-gray-400"
                }
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 px-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Stats
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Total Photos</span>
              <span className="text-xs text-white font-medium">
                {photos.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Favorites</span>
              <span className="text-xs text-white font-medium">
                {photos.filter((p) => p.isFavorite).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Projects</span>
              <span className="text-xs text-white font-medium">
                {getUniqueProjects().length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 flex items-center justify-between px-6 border-b border-white/5 bg-black/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg capitalize">
              {activeTab}
            </span>
            <span className="text-sm text-gray-400">
              {filteredPhotos.length} photos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
      </div>

      {/* Single Image Overlay */}
      {selectedPhoto && (
        <div className="absolute inset-0 bg-black/95 z-50 flex flex-col animate-fade-in">
          {/* Toolbar */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <button
              onClick={() => setSelectedPhotoId(null)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium opacity-70">
                {selectedPhoto.project}
              </span>
              <span className="text-sm opacity-70">{selectedPhoto.date}</span>
              {selectedPhoto.location && (
                <span className="text-sm opacity-50">
                  {selectedPhoto.location}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(e, selectedPhoto.id)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Heart
                  size={20}
                  className={
                    selectedPhoto.isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }
                />
              </button>
            </div>
          </div>

          {/* Main Image View */}
          <div className="flex-1 flex items-center justify-center p-4 relative group">
            {/* Nav Buttons */}
            <button
              onClick={() => navigatePhoto("prev")}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative max-w-full max-h-full">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-sm"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3">
                <h3 className="text-lg font-medium text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {selectedPhoto.project}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigatePhoto("next")}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Strip */}
          <div className="h-20 border-t border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center gap-2 px-4 overflow-x-auto">
            {filteredPhotos.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedPhotoId(p.id)}
                className={`h-14 aspect-square rounded-md overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                  selectedPhotoId === p.id
                    ? "ring-2 ring-blue-500 scale-110 z-10"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img src={p.url} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
