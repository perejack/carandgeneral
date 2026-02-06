import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ArrowLeft, Phone, MessageCircle, CheckCircle2, Shield, Truck } from "lucide-react";

const PHONE_NUMBER = "+254780951610";
const WHATSAPP_URL = `https://wa.me/254780951610`;

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-black mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in ordering the *${product.name}* (${product.price}). Please share more details.`
  );

  return (
    <div className="min-h-screen">
      <Header />

      <section className="py-10">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category_slug}`} className="hover:text-primary transition-colors">
              {product.category_name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-muted">
              <img
                src={product.image_url || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{product.category_name}</span>
              <h1 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-4">
                {product.name}
              </h1>
              <p className="font-heading font-black text-3xl text-primary mb-6">
                {product.price}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-lg mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-8">
                <a
                  href={`${WHATSAPP_URL}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-whatsapp text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold text-base uppercase tracking-wider hover:brightness-110 transition-all hover-lift"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold text-base uppercase tracking-wider hover:brightness-110 transition-all hover-lift"
                >
                  <Phone className="h-5 w-5" />
                  Call to Order: {PHONE_NUMBER}
                </a>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold">Genuine Product</p>
                    <p className="text-xs text-muted-foreground">Factory warranty</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold">Delivery Available</p>
                    <p className="text-xs text-muted-foreground">Nationwide shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ProductDetails;
