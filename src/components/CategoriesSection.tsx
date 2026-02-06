import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

const CategoriesSection = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <section id="categories" className="py-20 bg-section-alt">
        <div className="container">
          <div className="text-center mb-14">
            <span className="text-primary font-heading font-bold text-sm uppercase tracking-widest">Our Range</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-4">
              Product Categories
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
    <section id="categories" className="py-20 bg-section-alt">
      <div className="container">
        <div className="text-center mb-14">
          <span className="text-primary font-heading font-bold text-sm uppercase tracking-widest">Our Range</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black mt-2 mb-4">
            Product Categories
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From motorcycles to industrial machinery — explore our comprehensive range of quality products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories?.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="category-card group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={cat.image_url || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop'}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-heading font-bold text-primary-foreground text-sm leading-tight">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-accent text-xs mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    View Products <ArrowRight className="h-3 w-3" />
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

export default CategoriesSection;
