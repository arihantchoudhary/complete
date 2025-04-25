import { motion } from 'framer-motion';
import { useTheme } from '../../utils/theme';

interface Milestone {
  date: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming';
  riskLevel?: 'high' | 'medium' | 'low';
  description: string;
}

const milestones: Milestone[] = [
  {
    date: '2024-03-15',
    location: 'Singapore',
    status: 'completed',
    description: 'Origin loading completed',
  },
  {
    date: '2024-03-20',
    location: 'Malacca Strait',
    status: 'completed',
    riskLevel: 'low',
    description: 'Transit through strait',
  },
  {
    date: '2024-03-25',
    location: 'Red Sea',
    status: 'current',
    riskLevel: 'high',
    description: 'High risk area - active monitoring',
  },
  {
    date: '2024-03-30',
    location: 'Suez Canal',
    status: 'upcoming',
    riskLevel: 'medium',
    description: 'Expected transit',
  },
  {
    date: '2024-04-05',
    location: 'Rotterdam',
    status: 'upcoming',
    description: 'Estimated arrival',
  },
];

const getRiskColor = (riskLevel?: string) => {
  switch (riskLevel) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-transparent';
  }
};

export default function ShipmentTimeline() {
  const { isDarkMode } = useTheme();
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const progress = (completedMilestones / milestones.length) * 100;

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-dark-200 dark:bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full bg-primary-600"
        />
      </div>

      {/* Milestones */}
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-16"
          >
            {/* Date and location */}
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${
                milestone.status === 'completed' ? 'bg-primary-600' :
                milestone.status === 'current' ? 'bg-primary-400 animate-pulse' :
                'bg-dark-300 dark:bg-dark-600'
              }`} />
              <div>
                <div className="font-medium text-dark-900 dark:text-dark-100">
                  {milestone.location}
                </div>
                <div className="text-sm text-dark-600 dark:text-dark-400">
                  {new Date(milestone.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Risk indicator */}
            {milestone.riskLevel && (
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getRiskColor(milestone.riskLevel)}`} />
                <span className="text-sm text-dark-600 dark:text-dark-400">
                  {milestone.riskLevel.charAt(0).toUpperCase() + milestone.riskLevel.slice(1)} Risk
                </span>
              </div>
            )}

            {/* Description */}
            <div className="mt-1 text-sm text-dark-700 dark:text-dark-300">
              {milestone.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 