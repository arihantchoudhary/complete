
import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import HotelSelector from './HotelSelector';

interface DashboardHeaderProps {
  className?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className={cn("bg-white border-b sticky top-0 z-10", className)}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="py-4">
                  <h2 className="text-xl font-bold text-logistics-blue-DEFAULT mb-4">Taj Hotels AI</h2>
                  <nav className="space-y-1">
                    <a href="#" className="block px-3 py-2 rounded-md bg-logistics-blue-light/10 text-logistics-blue-DEFAULT">Dashboard</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Inventory</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Housekeeping</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Maintenance</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Reports</a>
                    <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Settings</a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <h1 className="text-xl font-bold text-logistics-blue-DEFAULT">
            Taj Hotels AI
          </h1>
        </div>
        
        {/* Add Hotel Selector */}
        <div className="hidden md:block">
          <HotelSelector />
        </div>
        
        <div className="flex-1 max-w-sm mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Search rooms, orders..." 
              className="pl-9 bg-gray-50 border-gray-200" 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-logistics-danger-DEFAULT"></span>
          </Button>
          <div className="h-8 w-8 rounded-full bg-logistics-blue-DEFAULT text-white flex items-center justify-center text-sm font-medium">
            AS
          </div>
        </div>
      </div>
      
      {/* Mobile view hotel selector */}
      <div className="md:hidden border-t p-2">
        <HotelSelector />
      </div>
    </header>
  );
};

export default DashboardHeader;
