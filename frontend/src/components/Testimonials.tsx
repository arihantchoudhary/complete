
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    content: "This platform has revolutionized how I find and select courses. It's so intuitive and provides all the information I need in one place.",
    author: "Alex Johnson",
    role: "Computer Science Major",
    avatar: "AJ"
  },
  {
    content: "As a transfer student, I was struggling to figure out which classes to take. This tool made the entire process so much easier!",
    author: "Sam Peterson",
    role: "Economics Major",
    avatar: "SP"
  },
  {
    content: "The schedule planner is a game-changer. I can visualize different combinations and find what works best for my lifestyle.",
    author: "Taylor Reed",
    role: "Biology Major",
    avatar: "TR"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 stagger-animate">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">What Students Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our platform has helped thousands of students optimize their academic journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-animate">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-white hover:shadow-md transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <p className="italic text-muted-foreground mb-6">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
