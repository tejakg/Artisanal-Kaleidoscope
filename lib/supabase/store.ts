import { supabaseAdmin } from './client';
import type { Database } from './types';
import type { Product, PortfolioItem, Tutorial } from '@/types';

/**
 * Product operations using Supabase
 */
export const productsDB = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabaseAdmin()
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformProductFromDB);
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabaseAdmin()
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data ? transformProductFromDB(data) : null;
  },

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const dbProduct = transformProductToDB(product);

    const { data, error } = await supabaseAdmin()
      .from('products')
      .insert(dbProduct)
      .select()
      .single();

    if (error) throw error;

    return transformProductFromDB(data);
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const dbUpdates = transformProductToDB(updates);

    const { data, error } = await (supabaseAdmin() as any)
      .from('products')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return transformProductFromDB(data);
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin()
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST116') return false; // Not found
      throw error;
    }

    return true;
  },
};

/**
 * Portfolio operations using Supabase
 */
export const portfolioDB = {
  async getAll(): Promise<PortfolioItem[]> {
    const { data, error } = await supabaseAdmin()
      .from('portfolio')
      .select('*')
      .order('order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformPortfolioFromDB);
  },

  async getById(id: string): Promise<PortfolioItem | null> {
    const { data, error } = await supabaseAdmin()
      .from('portfolio')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data ? transformPortfolioFromDB(data) : null;
  },

  async create(item: Omit<PortfolioItem, 'id'>): Promise<PortfolioItem> {
    const dbItem = transformPortfolioToDB(item);

    const { data, error } = await supabaseAdmin()
      .from('portfolio')
      .insert(dbItem)
      .select()
      .single();

    if (error) throw error;

    return transformPortfolioFromDB(data);
  },

  async update(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem | null> {
    const dbUpdates = transformPortfolioToDB(updates);

    const { data, error } = await (supabaseAdmin() as any)
      .from('portfolio')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return transformPortfolioFromDB(data);
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin()
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  },
};

/**
 * Tutorial operations using Supabase
 */
export const tutorialsDB = {
  async getAll(): Promise<Tutorial[]> {
    const { data, error } = await supabaseAdmin()
      .from('tutorials')
      .select('*')
      .order('order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(transformTutorialFromDB);
  },

  async getById(id: string): Promise<Tutorial | null> {
    const { data, error } = await supabaseAdmin()
      .from('tutorials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data ? transformTutorialFromDB(data) : null;
  },

  async create(tutorial: Omit<Tutorial, 'id'>): Promise<Tutorial> {
    const dbTutorial = transformTutorialToDB(tutorial);

    const { data, error } = await supabaseAdmin()
      .from('tutorials')
      .insert(dbTutorial)
      .select()
      .single();

    if (error) throw error;

    return transformTutorialFromDB(data);
  },

  async update(id: string, updates: Partial<Tutorial>): Promise<Tutorial | null> {
    const dbUpdates = transformTutorialToDB(updates);

    const { data, error } = await (supabaseAdmin() as any)
      .from('tutorials')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return transformTutorialFromDB(data);
  },

  async delete(id: string): Promise<boolean> {
    const { error } = await supabaseAdmin()
      .from('tutorials')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  },
};

// Transform functions to map between DB schema and app types

function transformProductFromDB(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category,
    description: dbProduct.description,
    price: dbProduct.price || undefined,
    priceRange: (dbProduct.price_min && dbProduct.price_max)
      ? { min: dbProduct.price_min, max: dbProduct.price_max }
      : undefined,
    images: dbProduct.images || [],
    materials: dbProduct.materials || [],
    craftsmanship: dbProduct.craftsmanship,
    customizable: dbProduct.customizable,
    isFeatured: dbProduct.is_featured,
    isBestSeller: dbProduct.is_best_seller,
    tags: dbProduct.tags || undefined,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}

function transformProductToDB(product: any): any {
  const result: any = {};

  if (product.name !== undefined) result.name = product.name;
  if (product.category !== undefined) result.category = product.category;
  if (product.description !== undefined) result.description = product.description;
  if (product.price !== undefined) result.price = product.price || null;
  if (product.priceRange !== undefined) {
    result.price_min = product.priceRange?.min || null;
    result.price_max = product.priceRange?.max || null;
  }
  if (product.images !== undefined) result.images = product.images || [];
  if (product.materials !== undefined) result.materials = product.materials || [];
  if (product.craftsmanship !== undefined) result.craftsmanship = product.craftsmanship;
  if (product.customizable !== undefined) result.customizable = product.customizable;
  if (product.isFeatured !== undefined) result.is_featured = product.isFeatured;
  if (product.isBestSeller !== undefined) result.is_best_seller = product.isBestSeller;
  if (product.tags !== undefined) result.tags = product.tags || null;

  return result;
}

function transformPortfolioFromDB(dbItem: any): PortfolioItem {
  return {
    id: dbItem.id,
    title: dbItem.title,
    description: dbItem.description || undefined,
    image: dbItem.image,
    category: dbItem.category,
    tags: dbItem.tags || undefined,
    order: dbItem.order || undefined,
  };
}

function transformPortfolioToDB(item: any): any {
  return {
    title: item.title,
    description: item.description || null,
    image: item.image,
    category: item.category,
    tags: item.tags || null,
    order: item.order || null,
  };
}

function transformTutorialFromDB(dbTutorial: any): Tutorial {
  return {
    id: dbTutorial.id,
    title: dbTutorial.title,
    description: dbTutorial.description,
    youtubeUrl: dbTutorial.youtube_url,
    videoId: dbTutorial.video_id,
    playlist: dbTutorial.playlist || undefined,
    duration: dbTutorial.duration || undefined,
    tags: dbTutorial.tags || undefined,
    order: dbTutorial.order || undefined,
  };
}

function transformTutorialToDB(tutorial: any): any {
  return {
    title: tutorial.title,
    description: tutorial.description,
    youtube_url: tutorial.youtubeUrl,
    video_id: tutorial.videoId,
    playlist: tutorial.playlist || null,
    duration: tutorial.duration || null,
    tags: tutorial.tags || null,
    order: tutorial.order || null,
  };
}
