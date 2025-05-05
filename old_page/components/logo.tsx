"use client";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 flex items-center justify-between">
          {/* Four vertical bars with increasing heights */}
          <div className="h-4 w-1.5 bg-gradient-to-b from-primary to-primary/80 rounded-full" />
          <div className="h-5 w-1.5 bg-gradient-to-b from-primary to-primary/80 rounded-full" />
          <div className="h-6 w-1.5 bg-gradient-to-b from-primary to-primary/80 rounded-full" />
          <div className="h-8 w-1.5 bg-gradient-to-b from-primary to-primary/80 rounded-full" />
          {/* Diagonal line through the bars */}
          <div
            className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/80 to-primary rounded-full"
            style={{ transform: "rotate(-15deg) translateY(-50%)" }}
          />
        </div>
      </div>
      <span className="text-xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
        City AI
      </span>
    </div>
  );
}
