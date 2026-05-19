import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/landing', label: 'Home' },
    { to: '#features', label: 'Features' },
    { to: '#about', label: 'About' },
    { to: '/library', label: 'Library' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/landing" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img className='w-24' src="/Jingga Merah Muda Imut Lucu Restoran Jepang Logo.png" alt="" />
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div> */}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">            
            <Link href="/latihan">
              <Button className="rounded-xl">
                Mulai
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          {/* <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                <Button variant="outline" className="w-full rounded-xl" onClick={() => setIsMenuOpen(false)} asChild>
                  <Link href="/auth">Login</Link>
                </Button>
                <Button className="w-full rounded-xl" onClick={() => setIsMenuOpen(false)} asChild>
                  <Link href="/auth">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
