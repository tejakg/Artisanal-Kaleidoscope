/**
 * Database type definitions for Supabase
 * These types are auto-generated based on your database schema
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          price: number | null;
          price_min: number | null;
          price_max: number | null;
          images: string[];
          materials: string[];
          craftsmanship: string;
          customizable: boolean;
          is_featured: boolean;
          is_best_seller: boolean;
          tags: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description: string;
          price?: number | null;
          price_min?: number | null;
          price_max?: number | null;
          images: string[];
          materials: string[];
          craftsmanship: string;
          customizable?: boolean;
          is_featured?: boolean;
          is_best_seller?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string;
          price?: number | null;
          price_min?: number | null;
          price_max?: number | null;
          images?: string[];
          materials?: string[];
          craftsmanship?: string;
          customizable?: boolean;
          is_featured?: boolean;
          is_best_seller?: boolean;
          tags?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolio: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image: string;
          category: string;
          tags: string[] | null;
          order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image: string;
          category: string;
          tags?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image?: string;
          category?: string;
          tags?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
      };
      tutorials: {
        Row: {
          id: string;
          title: string;
          description: string;
          youtube_url: string;
          video_id: string;
          playlist: string | null;
          duration: string | null;
          tags: string[] | null;
          order: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          youtube_url: string;
          video_id: string;
          playlist?: string | null;
          duration?: string | null;
          tags?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          youtube_url?: string;
          video_id?: string;
          playlist?: string | null;
          duration?: string | null;
          tags?: string[] | null;
          order?: number | null;
          created_at?: string;
        };
      };
    };
  };
}
