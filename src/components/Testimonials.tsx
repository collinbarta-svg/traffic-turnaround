import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Maple Grove, MN",
    text: "James has been plowing our driveway for 3 winters now. Always on time, even during the worst storms. Couldn't ask for better service!",
    rating: 5,
  },
  {
    name: "Tom & Linda K.",
    location: "Rogers, MN",
    text: "We use West Metro for both lawn care and snow plowing. Our yard has never looked better. James is reliable, professional, and fairly priced.",
    rating: 5,
  },
  {
    name: "Mike R.",
    location: "Saint Michael, MN",
    text: "Finally found a contractor who shows up when he says he will. The spring cleanup they did was incredible. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 section-gradient">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it — hear from homeowners who trust us with their properties.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card p-6 md:p-8 rounded-xl card-elevated"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
              <div>
                <div className="font-heading font-bold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
