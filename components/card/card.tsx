import {
    Github,
    ExternalLink,
    Twitter,
    Briefcase,
    GitPullRequest,
    Award,
  } from "lucide-react";
  import { motion } from "framer-motion";
 import { CardProps } from "@/lib/types";
  
export default function Card({ title, icon: Icon, innercard }: CardProps) {
  return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
          <Icon className="mr-2" /> {title}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {innercard.map((innercard, index) => (
            <motion.div
              key={index}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{innercard.name}</h3>
                <a href={innercard.link} target="_blank" rel="noopener noreferrer">
                   <ExternalLink className="w-4 h-4 text-blue-600" />
                </a>
              </div>
              <p className="text-sm text-gray-600 mt-2">{innercard.discripation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  