import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/lib/api";

const FeaturedProducts = () => {
  const { data: featured, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-widest">Top Picks</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-primary font-heading font-bold text-sm uppercase tracking-widest">Top Picks</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hand-picked products that our customers love. Quality guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured?.slice(0, 6).map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{product.category_name}</span>
                <h3 className="font-heading font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-lg text-primary">{product.price}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingBag className="h-4 w-4" /> View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
