import { Globe, Shield, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import StaggerChildren from '../animations/StaggerChildren';
import Container from '../ui/Container';

const features = [
  {
    icon: Globe,
    title: 'Interactive Trade Route Mapping',
    description: 'Create and customize entire trade routes across land, sea, and air with an intuitive, map-first UI and built-in risk modeling.',
  },
  {
    icon: Shield,
    title: 'Real-time Risk Prediction',
    description: 'Leverage AI analysis of geopolitical, climate, and economic data to identify potential disruptions weeks before they impact your operations.',
  },
  {
    icon: BarChart,
    title: 'Collaborative Contingency Planning',
    description: 'Simulate disruptions, visualize cross-border risks, and coordinate contingency strategies with your team and partners.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-100 to-dark-50 dark:from-dark-800 dark:to-dark-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Supply Chain with{' '}
            <span className="text-primary-500">Predictive Intelligence</span>
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            City AI combines real-time data analysis with AI-powered predictions to give you unprecedented visibility into supply chain risks.
          </p>
        </div>

        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-2xl bg-white dark:bg-dark-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-dark-600 dark:text-dark-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerChildren>
      </Container>
    </section>
  );
} 