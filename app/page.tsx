"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { projects,contributions,about} from "../data/projects"
import {
  Github,
  BookOpen,
  Twitter,
  ExternalLink
} from "lucide-react";
import Sociallinks from "@/components/custom/socail-link";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"projects" | "contribute" | null>(null);

  // Function to render content based on active tab
  const renderContent = () => {
    if (activeTab === "projects") {
      return (
        <div className="space-y-4">
          <h2 className="text-green-400 font-medium text-lg">Projects</h2>
          {projects.map((project) => (
            <div key={project.name} className="group">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">{project.name}</h3>
                <a 
                  href={project.link} 
                  target="_blank"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-green-400"
                  aria-label={`Link to ${project.name}`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="text-xs text-neutral-500 mt-1">{project.tech}</p>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "contribute") {
      return (
        <div className="space-y-4">
          <h2 className="text-green-400 font-medium text-lg">Contributions</h2>
          {contributions.map((contrib) => (
            <div key={contrib.name} className="group">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">{contrib.name}</h3>
                <a 
                  href={contrib.link} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-green-400"
                  aria-label={`Link to ${contrib.name}`}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <p className="text-xs text-neutral-500 mt-1">{contrib.org}</p>
            </div>
          ))}
        </div>
      );
    } else {
      // Default view with bio
      return (
        <div className="space-y-4">
          <h2 className="text-green-400 font-medium text-lg">About</h2>
          <p className="text-sm text-neutral-300">
          {about.bio}
          </p>
          <p className="text-sm text-neutral-300">
           {about.workingon}
          </p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black text-white min-h-screen">
      <div className="w-full max-w-md space-y-6 p-6 border-[0.5px] border-neutral-800 rounded-lg">
        {/* Top section with navigation on right */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium" onClick={() => {setActiveTab(null)}}>{about.author}</h1>
          
          {/* Right-aligned navigation */}
          <div className="flex space-x-4 text-sm">
            <button
              className={`text-sm transition-colors ${
                activeTab === "projects" 
                  ? "text-green-400" 
                  : "text-neutral-500 hover:text-green-300"
              }`}
              onClick={() => setActiveTab(prev => prev === "projects" ? null : "projects")}
            >
              Projects
            </button>
            <button
              className={`text-sm transition-colors ${
                activeTab === "contribute" 
                  ? "text-green-400" 
                  : "text-neutral-500 hover:text-green-300"
              }`}
              onClick={() => setActiveTab(prev => prev === "contribute" ? null : "contribute")}
            >
              Contributions
            </button>
          </div>
        </div>

        <Separator className="bg-neutral-800" />

        {/* Dynamic Content Section */}
        <div className="min-h-32">
          {renderContent()}
        </div>
        {/* Social Links */}
        <Sociallinks/>
      </div>
    </div>
  );
}