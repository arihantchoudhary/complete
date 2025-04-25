import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Container from '../ui/Container';

const industries = [
  'Retail',
  'Manufacturing',
  'Logistics',
  'Technology',
  'Healthcare',
  'Automotive',
  'Energy',
  'Other',
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.industry) newErrors.industry = 'Industry is required';

    if (Object.keys(newErrors).length === 0) {
      // In a real application, you would handle the form submission here
      setIsSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        industry: '',
        message: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your{' '}
              <span className="text-primary-500">Supply Chain?</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300">
              Get early access to our AI-powered risk prediction platform
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="p-8 bg-white dark:bg-dark-700 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-dark-600 dark:text-dark-300">
                  We've received your request and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-accent-500' : 'border-dark-200 dark:border-dark-600'
                    } bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-accent-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.company ? 'border-accent-500' : 'border-dark-200 dark:border-dark-600'
                    } bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-accent-500">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-accent-500' : 'border-dark-200 dark:border-dark-600'
                    } bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-accent-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-600 bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-2">
                    Industry <span className="text-accent-500">*</span>
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.industry ? 'border-accent-500' : 'border-dark-200 dark:border-dark-600'
                    } bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  >
                    <option value="">Select an industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-accent-500">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-dark-200 dark:border-dark-600 bg-white dark:bg-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
                >
                  Request Demo
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="p-8 bg-white dark:bg-dark-700 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">
                Join leading companies taking a proactive approach to supply chain risk
              </h3>
              <div className="space-y-4">
                <p className="text-dark-600 dark:text-dark-300">
                  Limited spots available for our beta program
                </p>
                <p className="text-dark-600 dark:text-dark-300">
                  Personalized onboarding and integration support included
                </p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl">
              <h4 className="text-lg font-semibold mb-4">What's Included:</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3" />
                  <span className="text-dark-600 dark:text-dark-300">
                    Early access to our AI-powered risk prediction platform
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3" />
                  <span className="text-dark-600 dark:text-dark-300">
                    Dedicated support team for integration and onboarding
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 mr-3" />
                  <span className="text-dark-600 dark:text-dark-300">
                    Regular updates and feature previews
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 