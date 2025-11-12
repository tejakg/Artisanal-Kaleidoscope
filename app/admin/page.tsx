'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Camera, Youtube, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    portfolio: 0,
    tutorials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsRes, portfolioRes, tutorialsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/portfolio'),
        fetch('/api/tutorials'),
      ]);

      const [products, portfolio, tutorials] = await Promise.all([
        productsRes.json(),
        portfolioRes.json(),
        tutorialsRes.json(),
      ]);

      setStats({
        products: products.products?.length || 0,
        portfolio: portfolio.items?.length || 0,
        tutorials: tutorials.tutorials?.length || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: ShoppingBag,
      color: 'bg-primary-500',
      link: '/admin/products',
    },
    {
      title: 'Portfolio Items',
      value: stats.portfolio,
      icon: Camera,
      color: 'bg-silk-teal',
      link: '/admin/portfolio',
    },
    {
      title: 'Tutorials',
      value: stats.tutorials,
      icon: Youtube,
      color: 'bg-red-500',
      link: '/admin/tutorials',
    },
    {
      title: 'Total Items',
      value: stats.products + stats.portfolio + stats.tutorials,
      icon: TrendingUp,
      color: 'bg-silk-gold',
      link: '#',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
          Dashboard
        </h1>
        <p className="text-neutral-600">
          Welcome to the Artisanal Kaleidoscope admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <Card hover className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {loading && <div className="spinner w-5 h-5" />}
              </div>
              <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-neutral-900">
                {loading ? '-' : stat.value}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/products/new">
            <Card hover className="p-6 text-center group">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-1">Add Product</h3>
              <p className="text-sm text-neutral-600">Create a new product listing</p>
            </Card>
          </Link>
          <Link href="/admin/portfolio/new">
            <Card hover className="p-6 text-center group">
              <Camera className="w-12 h-12 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-1">Add Portfolio Item</h3>
              <p className="text-sm text-neutral-600">Upload portfolio photo</p>
            </Card>
          </Link>
          <Link href="/admin/tutorials/new">
            <Card hover className="p-6 text-center group">
              <Youtube className="w-12 h-12 mx-auto mb-3 text-primary-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-1">Add Tutorial</h3>
              <p className="text-sm text-neutral-600">Link a new YouTube video</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-gradient-warm">
        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
          Getting Started
        </h3>
        <ul className="space-y-2 text-neutral-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">1.</span>
            <span>Add products with images, descriptions, and pricing to your collections</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">2.</span>
            <span>Upload portfolio photos to showcase your finished work</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">3.</span>
            <span>Link YouTube tutorials to help customers learn about your craft</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">4.</span>
            <span>All changes are immediately visible on the public website</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
