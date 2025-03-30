
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClassWebsiteInput from '@/components/ClassWebsiteInput';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ClassWebsiteInput />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
