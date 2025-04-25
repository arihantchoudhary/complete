import { motion } from 'framer-motion';
import { useTheme } from '../../../utils/theme';

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  color: string;
}

const nodes: Node[] = [
  { id: 'n1', x: 20, y: 20, size: 8, color: 'primary' },
  { id: 'n2', x: 80, y: 30, size: 6, color: 'accent' },
  { id: 'n3', x: 40, y: 60, size: 7, color: 'primary' },
  { id: 'n4', x: 70, y: 70, size: 5, color: 'accent' },
  { id: 'n5', x: 30, y: 90, size: 6, color: 'primary' },
  { id: 'n6', x: 60, y: 50, size: 8, color: 'accent' },
];

const connections: Connection[] = [
  { from: 'n1', to: 'n2', color: 'primary' },
  { from: 'n2', to: 'n3', color: 'accent' },
  { from: 'n3', to: 'n4', color: 'primary' },
  { from: 'n4', to: 'n5', color: 'accent' },
  { from: 'n5', to: 'n6', color: 'primary' },
  { from: 'n6', to: 'n1', color: 'accent' },
  { from: 'n1', to: 'n4', color: 'primary' },
  { from: 'n2', to: 'n5', color: 'accent' },
  { from: 'n3', to: 'n6', color: 'primary' },
];

export default function NetworkIllustration() {
  const { isDarkMode } = useTheme();

  const getColor = (type: string) => {
    if (isDarkMode) {
      return type === 'primary' ? 'var(--primary-400)' : 'var(--accent-400)';
    }
    return type === 'primary' ? 'var(--primary-600)' : 'var(--accent-600)';
  };

  return (
    <div className="w-full h-full relative">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDarkMode ? 'var(--dark-800)' : 'var(--dark-50)'} />
            <stop offset="100%" stopColor={isDarkMode ? 'var(--dark-900)' : 'var(--dark-100)'} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#bg-gradient)" />

        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`${conn.from}-${conn.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={getColor(conn.color)}
              strokeWidth="0.5"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size / 2}
            fill={getColor(node.color)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </svg>
    </div>
  );
} 