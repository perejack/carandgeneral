import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string;
          description: string | null;
          image_url: string | null;
          image_path: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string;
          description?: string | null;
          image_url?: string | null;
          image_path?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string;
          description?: string | null;
          image_url?: string | null;
          image_path?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          category_id: string | null;
          category_slug: string;
          category_name: string;
          price: string;
          description: string;
          features: any;
          image_url: string | null;
          image_path: string | null;
          badge: string | null;
          is_featured: boolean;
          featured_order: number | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category_id?: string | null;
          category_slug: string;
          category_name: string;
          price: string;
          description: string;
          features?: any;
          image_url?: string | null;
          image_path?: string | null;
          badge?: string | null;
          is_featured?: boolean;
          featured_order?: number | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category_id?: string | null;
          category_slug?: string;
          category_name?: string;
          price?: string;
          description?: string;
          features?: any;
          image_url?: string | null;
          image_path?: string | null;
          badge?: string | null;
          is_featured?: boolean;
          featured_order?: number | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
