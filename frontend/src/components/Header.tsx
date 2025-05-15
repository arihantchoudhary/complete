import { useCallback, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onDemoClick?: () => void;
}

export function Header({ onDemoClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const checkScrollPosition = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDemoClick = (e: React.MouseEvent) => {
    if (onDemoClick) {
      e.preventDefault();
      closeMobileMenu();
      onDemoClick();
    }
  };

  return (
    <header
      className={`sticky top-0 z-[60] w-full transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center px-4 relative">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="hidden font-bold sm:inline-block">LogiTrade</span>
          </Link>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          <div className={`${isMobileMenuOpen ? 'hidden md:block' : 'block'}`}>
            {isHomePage ? (
              <Button asChild size="sm">
                <a href="#contact" onClick={handleDemoClick}>Book a Demo</a>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to="/#contact">Book a Demo</Link>
              </Button>
            )}
          </div>
          
          {!isHomePage && (
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          )}
          
          <button
            className="rounded-md p-2 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 animate-in fade-in slide-in-from-top-2 bg-background/95 backdrop-blur-sm border-b p-4 md:hidden shadow-lg">
            <nav className="flex flex-col gap-3">
              {isHomePage ? (
                <>
                  <a 
                    href="#features" 
                    className="flex items-center rounded-md px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Features
                  </a>
                  <a 
                    href="#contact" 
                    className="flex items-center rounded-md px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    onClick={(e) => {
                      closeMobileMenu();
                      handleDemoClick(e);
                    }}
                  >
                    Contact
                  </a>
                </>
              ) : (
                <>
                  <Link 
                    to="/#features" 
                    className="flex items-center rounded-md px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/#contact" 
                    className="flex items-center rounded-md px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </Link>
                </>
              )}
              <Link 
                to="/dashboard" 
                className="flex items-center rounded-md px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
