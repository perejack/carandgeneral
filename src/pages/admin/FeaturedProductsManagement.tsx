import { useState, useEffect } from 'react';
import { Star, GripVertical, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts, updateProduct } from '@/lib/api';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category_name: string;
  price: string;
  image_url: string | null;
  badge: string | null;
  is_featured: boolean;
  featured_order: number | null;
}

const FeaturedProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.filter(p => p.is_featured)
    .sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
  
  const availableProducts = products.filter(p => !p.is_featured);

  const toggleFeatured = async (productId: string, isFeatured: boolean) => {
    try {
      const featuredOrder = isFeatured 
        ? (Math.max(...featuredProducts.map(p => p.featured_order || 0), 0) + 1)
        : null;
      
      await updateProduct(productId, {
        is_featured: isFeatured,
        featured_order: featuredOrder,
      });
      
      loadProducts();
      toast.success(isFeatured ? 'Product added to featured' : 'Product removed from featured');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    
    const newOrder = [...featuredProducts];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    await updateOrder(newOrder);
  };

  const handleMoveDown = async (index: number) => {
    if (index === featuredProducts.length - 1) return;
    
    const newOrder = [...featuredProducts];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    await updateOrder(newOrder);
  };

  const updateOrder = async (newOrder: Product[]) => {
    setSaving(true);
    try {
      await Promise.all(
        newOrder.map((product, index) =>
          updateProduct(product.id, { featured_order: index + 1 })
        )
      );
      loadProducts();
      toast.success('Featured products order updated');
    } catch (error) {
      toast.error('Failed to update order');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Featured Products</h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Manage products that appear on the homepage featured section
          </p>
        </div>
        <Button variant="outline" onClick={loadProducts} className="w-full sm:w-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {/* Featured Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base md:text-lg flex items-center gap-2">
              <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-yellow-500" />
              Featured Products ({featuredProducts.length})
            </h3>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white border rounded-lg">
              <Star className="h-8 w-8 md:h-12 md:w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm md:text-base">No featured products yet</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                Add products from the available list below
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-3 md:p-4 flex items-center gap-2 md:gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || saving}
                    >
                      ↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === featuredProducts.length - 1 || saving}
                    >
                      ↓
                    </Button>
                  </div>

                  <GripVertical className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />

                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base truncate">{product.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{product.category_name}</p>
                    <p className="font-bold text-primary text-sm md:text-base">{product.price}</p>
                  </div>

                  {product.badge && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      {product.badge}
                    </span>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(product.id, false)}
                    disabled={saving}
                    className="shrink-0"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Products */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base md:text-lg">Available Products ({availableProducts.length})</h3>

          {availableProducts.length === 0 ? (
            <div className="text-center py-8 md:py-12 bg-white border rounded-lg">
              <p className="text-gray-500 text-sm md:text-base">All products are featured</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] md:max-h-[500px] overflow-y-auto">
              {availableProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-3 md:p-4 flex items-center gap-2 md:gap-3 hover:border-primary transition-colors"
                >
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded flex items-center justify-center">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-200 rounded" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base truncate">{product.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{product.category_name}</p>
                    <p className="font-bold text-primary text-sm md:text-base">{product.price}</p>
                  </div>

                  {product.badge && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {product.badge}
                    </span>
                  )}

                  <Button
                    onClick={() => toggleFeatured(product.id, true)}
                    disabled={saving}
                    size="sm"
                    className="shrink-0"
                  >
                    <Star className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="hidden sm:inline">Add to Featured</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
        <p className="text-xs md:text-sm text-blue-800">
          <strong>Tip:</strong> Featured products appear on the homepage in the order specified above.
          Use the arrow buttons to reorder them. Maximum 6 featured products recommended.
        </p>
      </div>
    </div>
  );
};

export default FeaturedProductsManagement;
