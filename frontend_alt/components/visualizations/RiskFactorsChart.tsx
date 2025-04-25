import { motion } from 'framer-motion';
import { useTheme } from '../../utils/theme';

interface RiskFactor {
  name: string;
  percentage: number;
  color: string;
}

const riskFactors: RiskFactor[] = [
  {
    name: 'Geopolitical',
    percentage: 35,
    color: '#EF4444', // Red
  },
  {
    name: 'Weather',
    percentage: 25,
    color: '#F59E0B', // Yellow
  },
  {
    name: 'Port Congestion',
    percentage: 20,
    color: '#3B82F6', // Blue
  },
  {
    name: 'Tariffs',
    percentage: 15,
    color: '#8B5CF6', // Purple
  },
  {
    name: 'Other',
    percentage: 5,
    color: '#6B7280', // Gray
  },
];

export default function RiskFactorsChart() {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-4">
      {riskFactors.map((factor, index) => (
        <div key={factor.name} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-dark-700 dark:text-dark-300">{factor.name}</span>
            <span className="font-medium text-dark-900 dark:text-dark-100">
              {factor.percentage}%
            </span>
          </div>
          <div className="h-4 bg-dark-100 dark:bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${factor.percentage}%` }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${factor.color}80, ${factor.color})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 