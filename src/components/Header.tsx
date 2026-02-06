import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { PHONE_NUMBER } from "@/data/products";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-topbar py-2">
        <div className="container flex items-center justify-end gap-2 text-sm font-medium">
          <Phone className="h-4 w-4" />
          <a href={`tel:${PHONE_NUMBER}`} className="hover:underline">
            Call Us: {PHONE_NUMBER}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card/95 backdrop-blur-md border-b shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-black text-lg">C&G</span>
            </div>
            <div>
              <span className="font-heading font-bold text-lg leading-none block">
                Car <span className="text-primary">&</span> General
              </span>
              <span className="text-xs text-muted-foreground italic">Power for better living</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 font-heading font-semibold text-sm uppercase tracking-wide">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/#categories" className="hover:text-primary transition-colors">Products</Link>
            </li>
            <li>
              <Link to="/#about" className="hover:text-primary transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/#contact" className="hover:text-primary transition-colors">Contact</Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t animate-fade-in">
            <ul className="container py-4 space-y-3 font-heading font-semibold text-sm uppercase tracking-wide">
              <li>
                <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/#categories" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary">Products</Link>
              </li>
              <li>
                <Link to="/#about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="/#contact" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
