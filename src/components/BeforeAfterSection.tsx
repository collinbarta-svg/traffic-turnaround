import leafBefore from "@/assets/before-after/leaf-before.jpg";
import leafAfter from "@/assets/before-after/leaf-after.jpg";

const BeforeAfterSection = () => {
  return (
    <section className="py-12 sm:py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-secondary/20 text-secondary text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Recent Work
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            See the Difference
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/60 px-2">
            Real results from real properties we service.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-primary-foreground text-center mb-2">
            Fall Leaf Cleanup
          </h3>
          <p className="text-sm text-primary-foreground/50 text-center mb-6">
            Yard covered in fallen leaves cleared to a clean, tidy lawn ready for winter.
          </p>

          {/* Side by side images */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {/* Before */}
            <div className="relative rounded-xl overflow-hidden border border-primary-foreground/10 shadow-lg">
              <div className="aspect-[3/4]">
                <img
                  src={leafBefore}
                  alt="Before - Fall leaf cleanup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-primary/80 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-bold text-primary-foreground uppercase tracking-wider">
                Before
              </div>
            </div>

            {/* After */}
            <div className="relative rounded-xl overflow-hidden border border-secondary/20 shadow-lg ring-1 ring-secondary/10">
              <div className="aspect-[3/4]">
                <img
                  src={leafAfter}
                  alt="After - Fall leaf cleanup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-secondary/80 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-bold text-secondary-foreground uppercase tracking-wider">
                After
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
