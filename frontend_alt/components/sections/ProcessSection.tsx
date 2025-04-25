import { Link, Search, Gauge, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Container from '../ui/Container';

const steps = [
  {
    number: '01',
    icon: Link,
    title: 'Connect Your Supply Chain Data',
    description: 'Easily integrate with your existing systems to create a unified view of your supply chain network.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Identify Risk Factors',
    description: 'Our AI analyzes your routes against real-time geopolitical, economic, and climate data to identify potential disruptions.',
  },
  {
    number: '03',
    icon: Gauge,
    title: 'Generate Risk Scores',
    description: 'Receive custom risk assessment scores for each route and shipment, with detailed breakdown of contributing factors.',
  },
  {
    number: '04',
    icon: Check,
    title: 'Take Proactive Action',
    description: 'Get actionable recommendations to optimize routes, adjust timelines, or implement contingency plans before disruptions occur.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      <Container>
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How <span className="text-primary-500">City AI</span> Works
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Horizontal connecting lines (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20" />

          {/* Vertical connecting lines (mobile/tablet) */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500/20 via-accent-500/20 to-primary-500/20" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-dark-700 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-500">{step.number}</span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary-500" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-dark-600 dark:text-dark-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 