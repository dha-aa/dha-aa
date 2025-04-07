"use client";

import { Separator } from "@/components/ui/separator";
import { about } from "../../data/projects";
import { Github, BookOpen, Twitter } from "lucide-react";
import Link from "next/link";

export default function Social() {
  return (
    <div>
      <Separator className="my-4 bg-neutral-800" />

      <div className="flex items-center">
        {/* GitHub - External */}
        <a
          href={about.githublink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-neutral-500 hover:text-green-400 transition-colors"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>

        {/* Blog - Could be internal or external */}
        {about.docks.startsWith("/") ? (
          <Link
            href={about.docks}
            className="p-2 text-neutral-500 hover:text-green-400 transition-colors"
            aria-label="Blog"
          >
            <BookOpen size={18} />
          </Link>
        ) : (
          <a
            href={about.docks}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-500 hover:text-green-400 transition-colors"
            aria-label="Blog"
          >
            <BookOpen size={18} />
          </a>
        )}

        {/* Twitter - External */}
        <a
          href={about.xlink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-neutral-500 hover:text-green-400 transition-colors"
          aria-label="Twitter/X"
        >
          <Twitter size={18} />
        </a>
      </div>
    </div>
  );
}
