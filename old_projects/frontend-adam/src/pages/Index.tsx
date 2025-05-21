
import { useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const offset = isMobile ? 60 : 80; // Smaller offset on mobile
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  const scrollToFeatures = () => scrollToSection(featuresRef);
  const scrollToDemo = () => scrollToSection(demoRef);
  const scrollToContact = () => scrollToSection(contactRef);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onDemoClick={scrollToContact} />
      <div id="hero" ref={heroRef} className="scroll-mt-16">
        <HeroSection onDemoClick={scrollToContact} />
      </div>
      <div id="features" ref={featuresRef} className="scroll-mt-16">
        <FeaturesSection />
      </div>
      <StatsSection />
      <TestimonialsSection />
      <div id="contact" ref={contactRef} className="scroll-mt-16">
        <CTASection forwardedRef={demoRef} />
      </div>
      <Footer />
    </div>
  );
}
