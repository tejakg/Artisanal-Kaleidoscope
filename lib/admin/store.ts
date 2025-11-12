import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data/admin');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Generic file-based storage for admin data
 * In production, replace with database
 */
export class FileStore<T extends { id: string }> {
  private filename: string;
  private filepath: string;

  constructor(filename: string) {
    this.filename = filename;
    this.filepath = path.join(DATA_DIR, filename);
    this.ensureFile();
  }

  private ensureFile() {
    if (!fs.existsSync(this.filepath)) {
      fs.writeFileSync(this.filepath, JSON.stringify([]), 'utf-8');
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const data = fs.readFileSync(this.filepath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getById(id: string): Promise<T | null> {
    const items = await this.getAll();
    return items.find((item) => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    const items = await this.getAll();
    items.push(item);
    fs.writeFileSync(this.filepath, JSON.stringify(items, null, 2), 'utf-8');
    return item;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const items = await this.getAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return null;

    items[index] = { ...items[index], ...updates };
    fs.writeFileSync(this.filepath, JSON.stringify(items, null, 2), 'utf-8');
    return items[index];
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.getAll();
    const filtered = items.filter((item) => item.id !== id);

    if (filtered.length === items.length) return false;

    fs.writeFileSync(this.filepath, JSON.stringify(filtered, null, 2), 'utf-8');
    return true;
  }
}

// Create store instances
export const productsStore = new FileStore('products.json');
export const portfolioStore = new FileStore('portfolio.json');
export const tutorialsStore = new FileStore('tutorials.json');
