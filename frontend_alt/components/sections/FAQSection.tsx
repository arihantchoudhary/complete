import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Container from '../ui/Container';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How quickly can City AI integrate with our existing systems?",
    answer: "City AI is designed for seamless integration with most enterprise supply chain systems. Our platform can be operational within 2-4 weeks, depending on your specific setup and data requirements."
  },
  {
    question: "What kind of ROI can we expect?",
    answer: "Companies using predictive supply chain platforms typically see 15-25% reduction in disruption-related costs and 8-12% improvement in on-time delivery performance. Your specific results will depend on your supply chain complexity and current risk exposure."
  },
  {
    question: "How does the AI learn our specific supply chain needs?",
    answer: "Our AI analyzes your historical shipping data, routes, and past disruptions alongside global risk factors. The system continuously improves as it processes more of your supply chain operations, becoming increasingly tailored to your specific business patterns."
  },
  {
    question: "What security measures protect our data?",
    answer: "City AI implements enterprise-grade security with end-to-end encryption, role-based access controls, and regular security audits. We comply with industry standards for data protection and never share your proprietary supply chain data."
  },
  {
    question: "Can City AI scale with our business growth?",
    answer: "Absolutely. Our platform is built on scalable cloud infrastructure that grows with your needs. Whether you're managing dozens or thousands of shipments, City AI can handle increasing volume without performance degradation."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <Container>
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-700 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-5 h-5 text-dark-500 dark:text-dark-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-dark-600 dark:text-dark-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
} 