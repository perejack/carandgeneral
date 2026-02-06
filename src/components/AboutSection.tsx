import { CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-section-alt">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-6">
              Your Trusted Partner <br />
              <span className="text-primary">Since 1936</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Car & General is East Africa's leading distributor of automotive, power generation, 
              construction, agricultural, and industrial engineering products. With decades of experience, 
              we provide quality products backed by exceptional after-sales service.
            </p>
            <ul className="space-y-3">
              {[
                "Authorized dealer for top global brands",
                "Nationwide network of service centers",
                "Genuine spare parts & accessories",
                "Expert technical support & training",
                "Flexible financing options available",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=450&fit=crop"
                alt="Car & General headquarters"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
              <p className="font-heading font-black text-3xl">85+</p>
              <p className="text-sm opacity-90">Years of Trust</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
