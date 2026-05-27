import { Sparkles } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="relative z-40 bg-secondary text-secondary-foreground">
      <div className="container py-2.5 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="font-bold text-sm sm:text-base">
              Father's Day Special — 20% OFF all lawn care services through June!
            </span>
          </div>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="text-xs sm:text-sm font-medium">
            Bundle Dethatching + Aeration and save 25%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
