import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-semibold mb-6 animate-fade-in">
            🔥 Trusted Dealer Since 1936
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Power for
            <br />
            <span className="text-accent">Better Living</span>
          </h1>
          <p className="text-primary-foreground/85 text-lg mb-8 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Your one-stop destination for motorcycles, generators, construction equipment, 
            agricultural machinery, and industrial products.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/#categories"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all hover-lift"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/254780951610?text=${encodeURIComponent("Hello! I'm interested in your products. Please share more details.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all hover-lift"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {[
            { icon: ShieldCheck, label: "Genuine Products", sub: "Factory warranty" },
            { icon: Truck, label: "Nationwide Delivery", sub: "Fast & reliable" },
            { icon: Headphones, label: "24/7 Support", sub: "Always here for you" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 border border-primary-foreground/15">
              <Icon className="h-8 w-8 text-accent flex-shrink-0" />
              <div>
                <p className="text-primary-foreground font-heading font-bold text-sm">{label}</p>
                <p className="text-primary-foreground/70 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
