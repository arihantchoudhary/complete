import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import SlideIn from '../animations/SlideIn';
import Container from '../ui/Container';

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={targetRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800"
    >
      {/* Background Visualization */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-accent-500/5 to-transparent" />
        <div className="absolute inset-0">
          {/* Supply Chain Routes */}
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated gradient */}
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-500)" stopOpacity="0.3">
                  <animate
                    attributeName="offset"
                    values="0;1;0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="var(--accent-500)" stopOpacity="0.3">
                  <animate
                    attributeName="offset"
                    values="1;0;1"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>

            {/* Supply chain routes */}
            <path
              d="M200,200 L400,300 L600,200 L800,300"
              stroke="url(#route-gradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M200,400 L400,500 L600,400 L800,500"
              stroke="url(#route-gradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <path
              d="M200,600 L400,700 L600,600 L800,700"
              stroke="url(#route-gradient)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: '2s' }}
            />

            {/* Data nodes */}
            {[200, 400, 600, 800].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={200 + i * 200}
                r="8"
                fill="var(--primary-500)"
                className="animate-ping"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Predict Supply Chain Disruptions{' '}
                <span className="text-primary-500">Before They Happen</span>
              </h1>
            </FadeIn>

            <SlideIn delay={0.4} direction="right">
              <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl">
                City AI tackles the $1.5 trillion annual cost of reactive logistics with AI-powered risk prediction
              </p>
            </SlideIn>

            <div className="flex flex-col sm:flex-row gap-4">
              <FadeIn delay={0.6}>
                <button
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="btn-primary"
                >
                  Request Demo
                </button>
              </FadeIn>
              <FadeIn delay={0.8}>
                <button
                  onClick={(e) => handleScroll(e, '#solution')}
                  className="btn-secondary"
                >
                  Learn More
                </button>
              </FadeIn>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Placeholder for hero image or illustration */}
              <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
} 