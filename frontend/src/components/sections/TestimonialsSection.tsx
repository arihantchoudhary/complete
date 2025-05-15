const testimonials = [
  {
    quote: "LogiTrade's predictive alerts saved us millions by helping us reroute shipments before a major port closure.",
    author: "Sarah Chen",
    title: "Supply Chain Director, Global Retail Corp"
  },
  {
    quote: "The risk intelligence provided by LogiTrade gives our team unprecedented visibility into potential disruptions.",
    author: "Michael Rodriguez",
    title: "Logistics Manager, International Shipping LLC"
  },
  {
    quote: "As a government trade authority, we rely on LogiTrade to monitor critical supply chains for our nation's essential goods.",
    author: "Dr. James Wilson",
    title: "Deputy Director, National Trade Commission"
  }
];

const clientLogos = [
  "US Customs", "JAFZA", "STV Logistics", "Taj"
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Trusted by Leaders in Global Trade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-lg border">
              <p className="text-lg mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
          {clientLogos.map((logo) => (
            <div key={logo} className="text-xl font-bold text-muted-foreground">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
