import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { getProducts, getCategories, createProduct, updateProduct, deleteProduct, uploadImage, deleteImage, type Product, type Category } from '@/lib/api';
import { toast } from 'sonner';

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    category_slug: '',
    category_name: '',
    price: '',
    description: '',
    features: [] as string[],
    image_url: '',
    image_path: '',
    badge: '',
    is_featured: false,
    featured_order: 0,
    display_order: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setFormData(prev => ({
        ...prev,
        category_id: categoryId,
        category_slug: category.slug,
        category_name: category.name,
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const path = `products/${Date.now()}-${file.name}`;
      const { publicUrl, path: imagePath } = await uploadImage(file, 'product-images', path);
      setFormData(prev => ({ ...prev, image_url: publicUrl, image_path: imagePath }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleFeaturesChange = (value: string) => {
    const features = value.split('\n').filter(f => f.trim());
    setFormData(prev => ({ ...prev, features }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        category_id: formData.category_id || null,
      };
      
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await createProduct(productData);
        toast.success('Product created successfully');
      }
      setDialogOpen(false);
      loadData();
      resetForm();
    } catch (error) {
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to create product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id || '',
      category_slug: product.category_slug,
      category_name: product.category_name,
      price: product.price,
      description: product.description,
      features: product.features,
      image_url: product.image_url || '',
      image_path: product.image_path || '',
      badge: product.badge || '',
      is_featured: product.is_featured,
      featured_order: product.featured_order || 0,
      display_order: product.display_order,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, imagePath: string | null) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      if (imagePath) {
        await deleteImage('product-images', imagePath);
      }
      await deleteProduct(id);
      toast.success('Product deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category_id: '',
      category_slug: '',
      category_name: '',
      price: '',
      description: '',
      features: [],
      image_url: '',
      image_path: '',
      badge: '',
      is_featured: false,
      featured_order: 0,
      display_order: 0,
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Products</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100vw-2rem)] md:max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden w-[95vw]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category_id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="KES 100,000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features.join('\n')}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  rows={5}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Best Seller, New, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
                />
                <Label htmlFor="is_featured">Featured Product</Label>
              </div>

              {formData.is_featured && (
                <div>
                  <Label htmlFor="featured_order">Featured Order</Label>
                  <Input
                    id="featured_order"
                    type="number"
                    value={formData.featured_order}
                    onChange={(e) => setFormData({ ...formData, featured_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              )}

              <div>
                <Label>Product Image</Label>
                <div className="space-y-2">
                  {formData.image_url && (
                    <div className="relative w-full h-32 md:h-48 rounded-lg overflow-hidden border">
                      <img src={formData.image_url} alt="Product" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={uploading}
                      className="w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-32 md:h-48 object-cover" />
            ) : (
              <div className="w-full h-32 md:h-48 bg-gray-100 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
              </div>
            )}
            <div className="p-3 md:p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
                {product.badge && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full self-start">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-sm md:text-base font-semibold text-primary mb-2">{product.price}</p>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(product)} className="flex-1">
                  <Pencil className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(product.id, product.image_path)}
                >
                  <Trash2 className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
