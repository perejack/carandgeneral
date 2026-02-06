import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_URL } from "@/data/products";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-black text-lg">C&G</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg leading-none block">
                  Car & General
                </span>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              East Africa's leading distributor of automotive, power, construction, and industrial products. Power for better living.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/#categories" className="hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/category/motorcycles" className="hover:text-primary transition-colors">Motorcycles</Link></li>
              <li><Link to="/category/generators" className="hover:text-primary transition-colors">Generators</Link></li>
              <li><Link to="/category/construction-equipment" className="hover:text-primary transition-colors">Construction Equipment</Link></li>
              <li><Link to="/category/tractors" className="hover:text-primary transition-colors">Tractors & Implements</Link></li>
              <li><Link to="/category/water-pumps" className="hover:text-primary transition-colors">Water Pumps</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-primary transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@carandgeneral.com" className="hover:text-primary transition-colors">info@carandgeneral.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/40">
          <p>&copy; {new Date().getFullYear()} Car & General. All rights reserved.</p>
          <p>Power for better living</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
