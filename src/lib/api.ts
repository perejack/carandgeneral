import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  image_url: string | null;
  image_path: string | null;
  display_order: number;
}

export interface Product {
  id: string;
  name: string;
  category_id: string | null;
  category_slug: string;
  category_name: string;
  price: string;
  description: string;
  features: string[];
  image_url: string | null;
  image_path: string | null;
  badge: string | null;
  is_featured: boolean;
  featured_order: number | null;
  display_order: number;
}

// Categories API
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data as Category[];
};

export const getCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data as Category;
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
};

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Products API
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data.map(p => ({ ...p, features: Array.isArray(p.features) ? p.features : [] })) as Product[];
};

export const getProductsByCategory = async (categorySlug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_slug', categorySlug)
    .order('display_order');
  
  if (error) throw error;
  return data.map(p => ({ ...p, features: Array.isArray(p.features) ? p.features : [] })) as Product[];
};

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('featured_order', { ascending: true, nullsFirst: false });
  
  if (error) throw error;
  return data.map(p => ({ ...p, features: Array.isArray(p.features) ? p.features : [] })) as Product[];
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return { ...data, features: Array.isArray(data.features) ? data.features : [] } as Product;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return { ...data, features: Array.isArray(data.features) ? data.features : [] } as Product;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return { ...data, features: Array.isArray(data.features) ? data.features : [] } as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Image upload API
export const uploadImage = async (file: File, bucket: 'product-images' | 'category-images', path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return { path: data.path, publicUrl };
};

export const deleteImage = async (bucket: 'product-images' | 'category-images', path: string) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) throw error;
};
