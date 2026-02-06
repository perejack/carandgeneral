import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ArrowLeft, ShoppingBag, Package } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug || ""),
    enabled: !!slug,
  });
  const { data: categoryProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['products-by-category', slug],
    queryFn: () => getProductsByCategory(slug || ""),
    enabled: !!slug,
  });

  if (categoryLoading || productsLoading) {
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

  if (!category) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-black mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Category Banner */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image_url || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=400&fit=crop'})` }}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-primary-foreground">
            {category.name}
          </h1>
          <p className="text-primary-foreground/80 mt-3 max-w-lg">{category.description}</p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-10 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">
                Products in {category.name}
              </h2>
            </div>
            <p className="text-muted-foreground ml-12 sm:ml-14">
              {categoryProducts?.length || 0} product{categoryProducts?.length !== 1 ? 's' : ''} available in this category
            </p>
          </div>
          
          {(!categoryProducts || categoryProducts.length === 0) ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No products available in this category yet.</p>
              <Link to="/" className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Browse other categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
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
                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
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
          )}
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default CategoryPage;
