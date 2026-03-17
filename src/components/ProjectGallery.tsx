import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Import project images
import snowClearing from "@/assets/projects/snow-clearing.webp";
import stonePath from "@/assets/projects/stone-path.webp";
import stoneWalkway from "@/assets/projects/stone-walkway.webp";
import landscapeFeature from "@/assets/projects/landscape-feature.webp";
import rockBed from "@/assets/projects/rock-bed.jpg";
import flowerBed from "@/assets/projects/flower-bed.jpg";
import stonePathPool from "@/assets/projects/stone-path-pool.jpg";
import mulchHostas from "@/assets/projects/mulch-hostas.jpg";

import mulchWalkway from "@/assets/projects/mulch-walkway.jpg";
import gravelLandscaping from "@/assets/projects/gravel-landscaping.jpg";

const projects = [
  {
    id: 1,
    image: stonePathPool,
    title: "Poolside Stone Path & Garden",
    category: "Outdoor Projects",
    description: "Natural flagstone walkway with dark mulch beds, perennial plantings, and decorative garden trellises alongside a pool area.",
  },
  {
    id: 2,
    image: mulchHostas,
    title: "Mulch Bed & Hosta Planting",
    category: "Landscaping",
    description: "Curved mulch bed with lush hostas, rock accents, and clean steel edging for a polished, low-maintenance look.",
  },
  {
    id: 4,
    image: snowClearing,
    title: "Winter Property Care",
    category: "Snow Services",
    description: "Thorough snow clearing with attention to driveways, walkways, and safety—captured during an evening plowing session.",
  },
  {
    id: 5,
    image: stonePath,
    title: "Natural Stone Pathway",
    category: "Outdoor Projects",
    description: "Custom flagstone pathway with mulch borders, winding through lush garden landscaping.",
  },
  {
    id: 6,
    image: stoneWalkway,
    title: "Stone Walkway & Garden Bed",
    category: "Outdoor Projects",
    description: "Decorative stone walkway with curved edges, complemented by hostas and flowering plants.",
  },
  {
    id: 7,
    image: landscapeFeature,
    title: "Landscape Enhancement",
    category: "Outdoor Projects",
    description: "Clean stone edging with white rock bed, creating a low-maintenance, attractive border around mature evergreens.",
  },
  {
    id: 8,
    image: rockBed,
    title: "Rock Bed & Brick Edging",
    category: "Outdoor Projects",
    description: "White rock bed with brick border edging, solar path lights, and hydrangea plantings around a front porch.",
  },
  {
    id: 9,
    image: flowerBed,
    title: "Flower Bed & Stone Wall",
    category: "Landscaping",
    description: "Tiered stone retaining wall with vibrant purple petunias, rock accents, and solar lighting along the walkway.",
  },
  {
    id: 10,
    image: mulchWalkway,
    title: "Mulch Bed & Walkway",
    category: "Landscaping",
    description: "Fresh cedar mulch beds with flowering plants along a walkway and front porch area.",
  },
  {
    id: 11,
    image: gravelLandscaping,
    title: "Gravel & Shrub Landscaping",
    category: "Landscaping",
    description: "Clean gravel bed with flowering shrubs, decorative pots, and low-maintenance ground cover.",
  },
];

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-12 sm:py-20 md:py-28 hero-gradient text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Real Projects, Real Results
          </h2>
          <p className="text-base sm:text-lg text-primary-foreground/80 px-2">
            See the quality and attention to detail that goes into every project. 
            From snow removal to outdoor improvements, every job is completed with care.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-8 sm:mb-12">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden cursor-pointer group bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 rounded-xl"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-xs text-secondary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-heading font-bold text-primary-foreground mt-1 text-sm sm:text-base">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-5 sm:p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-primary-foreground mb-2 sm:mb-3">
              Custom Outdoor Projects Available
            </h3>
            <p className="text-sm sm:text-base text-primary-foreground/70 mb-3 sm:mb-4">
              In addition to regular lawn care and snow services, we also complete basic, 
              functional outdoor improvement projects—stone work, landscape features, 
              brush cleanup, and similar enhancements. These custom projects are 
              available by request and discussed after initial contact.
            </p>
            <p className="text-xs sm:text-sm text-primary-foreground/70">
              Interested in a custom outdoor project? Call{" "}
              <a href="tel:612-461-4022" className="text-secondary hover:underline font-medium">
                612-461-4022
              </a>{" "}
              to discuss your ideas.
            </p>
          </div>
        </div>

        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden">
            <VisuallyHidden>
              <DialogTitle>{selectedProject?.title}</DialogTitle>
            </VisuallyHidden>
            {selectedProject && (
              <div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4 sm:p-6">
                  <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-1 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectGallery;
