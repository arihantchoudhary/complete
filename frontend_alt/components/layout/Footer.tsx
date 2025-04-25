import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Solution', href: '#solution' },
      { name: 'Features', href: '#features' },
      { name: 'Team', href: '#team' },
      { name: 'Demo', href: '#demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Help Center', href: '/help' },
      { name: 'Status', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/cityai' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/cityai' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/cityai' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@cityai.com' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-dark-900 dark:text-dark-50 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-200 dark:border-dark-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-600 dark:text-dark-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <div className="text-sm text-dark-600 dark:text-dark-300">
              © {new Date().getFullYear()} City AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 