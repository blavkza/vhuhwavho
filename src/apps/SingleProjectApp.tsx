// /apps/SingleProjectApp.tsx
"use client";

import React from "react";
import { FinderLayout } from "@/components/layout/FinderLayout";
import { Folder } from "lucide-react";
import { ProjectDialog } from "@/components/desktop/ProjectDialog";

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

interface SingleProjectAppProps {
  project: Project;
}

export const SingleProjectApp = ({ project }: SingleProjectAppProps) => {
  const sidebarItems = [
    {
      id: "project",
      label: "Project Details",
      icon: Folder,
      active: true,
      onClick: () => {},
    },
  ];

  return (
    <FinderLayout title={project.title} sidebarItems={sidebarItems}>
      <ProjectDialog project={project} />
    </FinderLayout>
  );
};
