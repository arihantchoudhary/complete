import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';

interface FounderProfileProps {
  name: string;
  role: string;
  image: string;
  education: string;
  experience: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export default function FounderProfile({
  name,
  role,
  image,
  education,
  experience,
  expertise,
  social,
}: FounderProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden"
    >
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-dark-50 mb-1">{name}</h3>
        <p className="text-primary-400 mb-4">{role}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-1">Education</h4>
            <p className="text-dark-50">{education}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-1">Experience</h4>
            <p className="text-dark-50">{experience}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-dark-300 mb-1">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-dark-700 text-dark-50 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4">
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-primary-400 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          )}
          {social.twitter && (
            <a
              href={social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-primary-400 transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-primary-400 transition-colors"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
} 