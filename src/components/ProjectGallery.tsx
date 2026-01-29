import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Import project images
import stoneWork from "@/assets/projects/stone-work.jpg";
import gravelPath from "@/assets/projects/gravel-path.jpg";
import landscapeFeature from "@/assets/projects/landscape-feature.jpg";
import snowClearing from "@/assets/projects/snow-clearing.jpg";

const projects = [
  {
    id: 1,
    image: stoneWork,
    title: "Stone & Gravel Pathway",
    category: "Outdoor Projects",
    description: "Custom stone work and gravel pathway installation with clean edges and proper drainage.",
  },
  {
    id: 2,
    image: gravelPath,
    title: "Gravel Landscape Area",
    category: "Outdoor Projects",
    description: "Functional gravel area with defined borders for a clean, low-maintenance outdoor space.",
  },
  {
    id: 3,
    image: landscapeFeature,
    title: "Landscape Enhancement",
    category: "Outdoor Projects",
    description: "Simple landscape feature installation with attention to detail and clean finishing.",
  },
  {
    id: 4,
    image: snowClearing,
    title: "Winter Property Care",
    category: "Snow Services",
    description: "Thorough snow clearing with attention to walkways, edges, and safety.",
  },
];

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Our Work
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Projects, Real Results
          </h2>
          <p className="text-lg text-muted-foreground">
            See the quality and attention to detail that goes into every project. 
            From snow removal to outdoor improvements, every job is completed with care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="font-heading font-bold text-primary-foreground mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-heading text-xl font-bold text-foreground mb-3">
              Custom Outdoor Projects Available
            </h3>
            <p className="text-muted-foreground mb-4">
              In addition to regular lawn care and snow services, I also complete basic, 
              functional outdoor improvement projects—stone work, gravel areas, simple 
              landscape features, and similar enhancements. These custom projects are 
              available by request and discussed after initial contact.
            </p>
            <p className="text-sm text-muted-foreground">
              Interested in a custom outdoor project? Call{" "}
              <a href="tel:612-298-5590" className="text-secondary hover:underline font-medium">
                612-298-5590
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
                <div className="p-6">
                  <span className="text-xs text-secondary font-medium uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-foreground mt-1 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground">
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
