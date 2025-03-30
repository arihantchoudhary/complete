
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add actual search logic here
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8 stagger-animate">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Find Your Perfect Course</h2>
          <p className="text-muted-foreground">
            Enter a class name, website, or department to get started.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-xl mx-auto gap-2 animate-fade-in-up">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="e.g., CS 101 or cs.university.edu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-full border-slate-200 shadow-sm focus:ring-2 focus:ring-primary/30"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <Button type="submit" size="lg" className="h-12 rounded-full shadow-sm px-6 btn-slide-effect">
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SearchBox;
