"use client";
import React, { useEffect, useState } from "react";
import {
  Github,
  ExternalLink,
  Twitter,
  Briefcase,
  GitPullRequest,
} from "lucide-react";
import { fetchPortfolioData } from "@/data/get";
import { motion } from "framer-motion";

// Define types for the fetched portfolio data
type PortfolioData = {
  about: {
    author: string;
    bio: string;
    workingon: string;
    githublink?: string;
    xlink?: string;
    docks?: string;
  };
  projects: {
    name: string;
    link: string;
    tech: string;
  }[];
  contributions: {
    name: string;
    org: string;
    link: string;
  }[];
};

export default function PortfolioUI() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolioData = await fetchPortfolioData();
        if (portfolioData.error) setError(portfolioData.error);
        else setData(portfolioData);
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold mb-2">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* About Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.about.author}</h1>
              <p className="text-gray-600 mt-1">{data.about.bio}</p>
              <div className="flex items-center mt-3 text-blue-600">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{data.about.workingon}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {data.about.githublink && (
                <a href={data.about.githublink} target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
              )}
              {data.about.xlink && (
                <a href={data.about.xlink} target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
              )}
              {data.about.docks && data.about.docks !== "#" && (
                <a href={data.about.docks} target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Github className="mr-2" /> Projects
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 text-blue-600" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.tech}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contributions Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <GitPullRequest className="mr-2" /> Contributions
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.contributions.map((contribution, index) => (
              <motion.div
                key={index}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-800 font-semibold">{contribution.name}</h3>
                    <p className="text-blue-600 text-sm">{contribution.org}</p>
                  </div>
                  <a href={contribution.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} {data.about.author}
        </footer>
      </div>
    </main>
  );
}
