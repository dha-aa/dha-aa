"use client";

import React, { useEffect, useState } from "react";
import {
  Github,
  GitPullRequest,
  Award,
  Code2,
  Brain,
} from "lucide-react";
import { fetchPortfolioData } from "@/data/get";
import Card from "@/components/card/card";
import { AuthorCard } from "@/components/card/aboutcard";

// Types
type PortfolioItem = {
  title: string;
  icon?: string;
  innercard: any[];
};

type PortfolioData = {
  about: {
    author: string;
    bio: string;
    workingon: string;
    githublink?: string;
    xlink?: string;
    docks?: string;
  };
  data: PortfolioItem[];
};

export default function PortfolioUI() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
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
        <div className="text-center space-y-4">
          <p className="text-red-500 text-xl font-semibold">⚠️ {error}</p>
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

  // Icon list for each section
  const icons = [Github, GitPullRequest, Award, Code2, Brain];

  return (
    <main className="px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* About Section */}
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <AuthorCard about={data.about} />
        </section>

        {/* Dynamic Sections with Icons */}
        {data.data.map((section, index) => (
          <Card
            key={index}
            title={section.title}
            icon={icons[index % icons.length]} // cycle icons if needed
            innercard={section.innercard}
          />
        ))}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} {data.about.author}
        </footer>
      </div>
    </main>
  );
}
