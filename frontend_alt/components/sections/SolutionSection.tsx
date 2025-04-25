import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import SlideIn from '../animations/SlideIn';
import Container from '../ui/Container';

export default function SolutionSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section
      ref={targetRef}
      id="solution"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800"
    >
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/5 via-accent-500/5 to-transparent" />
      </motion.div>

      <Container>
        {/* Problem Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Supply Chains Need to Be{' '}
                <span className="text-primary-500">Proactive, Not Reactive</span>
              </h2>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                Traditional risk management methods cost businesses $1.5 trillion annually. Most companies rely on fragmented systems, manual monitoring, and reactive approaches to supply chain disruptions. External factors like geopolitical events and climate risks are often tracked separately, creating blind spots in your operations.
              </p>
            </div>
          </FadeIn>

          <SlideIn delay={0.4} direction="right">
            <div className="relative aspect-square">
              {/* Problem Visualization */}
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--dark-200)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="1000" height="1000" fill="url(#grid)" />

                {/* Fragmented supply chain */}
                <g className="animate-pulse">
                  {[200, 400, 600, 800].map((x, i) => (
                    <g key={i}>
                      <circle
                        cx={x}
                        cy={200 + i * 200}
                        r="15"
                        fill="var(--primary-500)"
                        opacity="0.2"
                      />
                      <circle
                        cx={x}
                        cy={200 + i * 200}
                        r="8"
                        fill="var(--primary-500)"
                        className="animate-ping"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      />
                    </g>
                  ))}
                </g>

                {/* Warning indicators */}
                <g className="animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <path
                    d="M500,500 L550,450 L600,500 L550,550 Z"
                    fill="var(--accent-500)"
                    opacity="0.8"
                  />
                  <text
                    x="550"
                    y="500"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    className="text-lg font-bold"
                  >
                    !
                  </text>
                </g>
              </svg>
            </div>
          </SlideIn>
        </div>

        {/* Solution Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SlideIn delay={0.6} direction="left" className="order-2 lg:order-1">
            <div className="relative aspect-square">
              {/* Solution Visualization */}
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connected network */}
                <defs>
                  <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-500)" />
                    <stop offset="100%" stopColor="var(--accent-500)" />
                  </linearGradient>
                </defs>

                {/* AI core */}
                <circle
                  cx="500"
                  cy="500"
                  r="100"
                  fill="url(#connection-gradient)"
                  className="animate-pulse"
                />

                {/* Connected nodes */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * Math.PI * 2) / 6;
                  const x = 500 + Math.cos(angle) * 300;
                  const y = 500 + Math.sin(angle) * 300;
                  return (
                    <g key={i}>
                      <line
                        x1="500"
                        y1="500"
                        x2={x}
                        y2={y}
                        stroke="url(#connection-gradient)"
                        strokeWidth="2"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="var(--primary-500)"
                        className="animate-ping"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </SlideIn>

          <FadeIn delay={0.8} className="order-1 lg:order-2">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-primary-500">AI-Powered</span> Risk Prediction & Mitigation
              </h2>
              <p className="text-lg text-dark-600 dark:text-dark-300">
                City AI transforms how businesses manage supply chain risks with predictive intelligence. Our platform leverages real-time data from geopolitical, economic, and climate sources to forecast disruptions before they happen. With interactive trade route mapping and risk scoring, we empower you to make proactive decisions that save millions in avoided delays and inefficiencies.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
} 