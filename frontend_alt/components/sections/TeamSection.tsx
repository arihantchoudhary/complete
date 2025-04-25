import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Container from '../ui/Container';

const expertiseAreas = [
  {
    title: 'Large Language Model Research',
    description: 'Advanced AI research and development for supply chain intelligence.',
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Expertise in global logistics and operational efficiency.',
  },
  {
    title: 'Risk Modeling & Prediction',
    description: 'Sophisticated risk assessment and predictive analytics.',
  },
  {
    title: 'Enterprise AI Integration',
    description: 'Seamless integration with existing enterprise systems.',
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-100 to-dark-50 dark:from-dark-800 dark:to-dark-900">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built by Experts in{' '}
              <span className="text-primary-500">AI and Logistics</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Our team combines deep expertise in artificial intelligence, supply chain management, and global logistics.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-[url('/placeholder-team.jpg')] bg-cover bg-center" />
            </div>
            <div className="space-y-4">
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Founded by a team from UC Berkeley, Stanford, and Microsoft with firsthand logistics experience.
              </p>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Leadership with backgrounds in AI research, global trade operations, and enterprise software development.
              </p>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Passionate about transforming reactive supply chains into proactive, resilient networks.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="aspect-video bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-[url('/placeholder-research.jpg')] bg-cover bg-center" />
            </div>
            <div className="space-y-4">
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Our research team combines academic excellence with practical industry experience.
              </p>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Continuous innovation in AI and machine learning for supply chain optimization.
              </p>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Dedicated to pushing the boundaries of what's possible in supply chain intelligence.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-dark-700 rounded-2xl shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-500">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p className="text-dark-600 dark:text-dark-300">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
} 