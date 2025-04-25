import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';

export default function Home() {
  return (
    <Layout>
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Welcome to City AI</h1>
          <p className="text-xl mb-8">
            We're building something amazing. Stay tuned for updates!
          </p>
        </div>
      </main>
    </Layout>
  );
} 