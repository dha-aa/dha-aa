"use client";
import React, { useEffect, useState } from "react";
import {
  Github,
  ExternalLink,
  Twitter,
  Briefcase,
  GitPullRequest,
  User,
} from "lucide-react";
import { fetchPortfolioData } from "@/data/get";

export default function PortfolioUI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolioData = await fetchPortfolioData();
        if (portfolioData.error) {
          setError(portfolioData.error);
        } else {
          setData(portfolioData);
        }
      } catch (err) {
        setError("Failed to load portfolio data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-gray-800">{error}</p>
          <p className="text-gray-600 mb-6">Could not load your portfolio.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition shadow-sm"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* About Section */}
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{data.about.author}</h1>
              <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full" />
            </div>
            <div className="flex items-center space-x-4">
              {data.about.githublink && (
                <a
                  href={data.about.githublink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
              )}
              {data.about.xlink && (
                <a
                  href={data.about.xlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
              )}
              {data.about.docks && data.about.docks !== "#" && (
                <a
                  href={data.about.docks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black"
                  aria-label="Docs"
                >
                  <ExternalLink size={24} />
                </a>
              )}
            </div>
          </div>

          <div className="flex mt-6">
            <User className="text-blue-600 mr-3 mt-1" size={20} />
            <p className="text-gray-700">{data.about.bio}</p>
          </div>

          <div className="flex items-center mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
            <Briefcase className="text-blue-600 mr-3" size={20} />
            <p className="text-gray-800 font-medium">{data.about.workingon}</p>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <Github className="text-blue-600 mr-3" size={22} />
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-50 border hover:border-blue-500 rounded-lg p-4 transition-shadow hover:shadow"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">{project.name}</h3>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Project GitHub"
                  >
                    <Github size={18} />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.tech}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contributions */}
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <div className="flex items-center mb-6">
            <GitPullRequest className="text-blue-600 mr-3" size={22} />
            <h2 className="text-2xl font-bold text-gray-800">Contributions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {data.contributions.map((contribution, index) => (
              <div
                key={index}
                className="bg-gray-50 border hover:border-blue-500 rounded-lg p-4 transition-shadow hover:shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{contribution.name}</h3>
                    <p className="text-blue-600 text-sm mt-1">{contribution.org}</p>
                  </div>
                  <a
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Contribution Link"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 pt-6 text-sm">
          © {new Date().getFullYear()} {data.about.author}
        </footer>
      </div>
    </div>
  );
}
