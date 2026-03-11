import { useState, useRef, useCallback } from "react";

import overgrownBefore from "@/assets/before-after/overgrown-before.jpg";
import overgrownAfter from "@/assets/before-after/overgrown-after.jpg";
import springBefore from "@/assets/before-after/spring-before.jpg";
import springAfter from "@/assets/before-after/spring-after.jpg";
import mowingBefore from "@/assets/before-after/mowing-before.jpg";
import mowingAfter from "@/assets/before-after/mowing-after.jpg";

const comparisons = [
  {
    title: "Overgrown Yard Cleanup",
    description: "From neglected to pristine — complete debris removal, mowing, and edging.",
    before: overgrownBefore,
    after: overgrownAfter,
  },
  {
    title: "Spring Cleanup",
    description: "Dead grass, branches, and winter debris cleared for a fresh start.",
    before: springBefore,
    after: springAfter,
  },
  {
    title: "Lawn Mowing Transformation",
    description: "Regular professional mowing with crisp stripes and clean edges.",
    before: mowingBefore,
    after: mowingAfter,
  },
];

const BeforeAfterSlider = ({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => updatePosition(e.clientX)}
    >
      {/* After image (full) */}
      <img
        src={after}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth || "100%", maxWidth: "none" }}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground/90 backdrop-blur-sm border-2 border-primary-foreground flex items-center justify-center shadow-xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary">
            <path d="M6 10L3 7M3 7L6 4M3 7H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 10L17 7M17 7L14 4M17 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary/80 backdrop-blur-sm rounded-md text-xs font-semibold text-primary-foreground uppercase tracking-wider z-20">
        Before
      </div>
      <div className="absolute top-3 right-3 px-2.5 py-1 bg-secondary/80 backdrop-blur-sm rounded-md text-xs font-semibold text-secondary-foreground uppercase tracking-wider z-20">
        After
      </div>
    </div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/10 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Recent Work
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            See the Difference
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Drag the slider to compare before and after — real results from real properties we service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {comparisons.map((item) => (
            <div key={item.title} className="space-y-3">
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                title={item.title}
              />
              <div className="px-1">
                <h3 className="font-heading font-bold text-foreground text-base sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
