
import { Button } from "@/components/ui/button";
import { GlobeVisualization } from "@/components/GlobeVisualization";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onDemoClick: () => void;
}

export function HeroSection({ onDemoClick }: HeroSectionProps) {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-primary/5">
      <div className="container px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI-Powered Supply Chain & Logistics
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              At LogiTrade, we use AI to predict potential supply chain disruptors that result in global logistic cost savings
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onDemoClick} className="text-lg px-8 py-6">
                Book a Demo
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link to="/dashboard">
                  Explore Dashboard
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex gap-8">
            <div className="relative h-[450px] md:h-[600px] w-full rounded-3xl overflow-hidden glass-card">
              <div className="absolute inset-0">
                <GlobeVisualization height={600} />
              </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center gap-8">
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <p className="text-3xl font-bold text-primary mb-2 font-mono">$23M</p>
                <p className="text-muted-foreground">Client Savings</p>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <p className="text-3xl font-bold text-primary mb-2 font-mono">200+</p>
                <p className="text-muted-foreground">Countries Covered</p>
              </div>
              <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <p className="text-3xl font-bold text-primary mb-2 font-mono">5,000</p>
                <p className="text-muted-foreground">Trade Routes Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
