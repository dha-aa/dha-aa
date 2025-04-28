import { Briefcase, Github, Twitter, ExternalLink } from "lucide-react";
import { AuthorCardProps } from "@/lib/types";


export function AuthorCard({ about }: AuthorCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{about.author}</h1>
        <p className="text-gray-600 mt-1">{about.bio}</p>
        <div className="flex items-center mt-3 text-blue-600">
          <Briefcase className="w-4 h-4 mr-2" />
          <span>{about.workingon}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {about.githublink && (
          <a href={about.githublink} target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
        )}
        {about.xlink && (
          <a href={about.xlink} target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
        )}
        {about.docks && about.docks !== "#" && (
          <a href={about.docks} target="_blank" rel="noopener noreferrer">
            <ExternalLink />
          </a>
        )}
      </div>
    </div>
  );
}
