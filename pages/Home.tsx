import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { supabase } from '../lib/supabase';
import { Loader2, PackageX } from 'lucide-react';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 text-white px-4">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Modern Tech for Your <span className="text-blue-400">Digital Life</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Discover premium gadgets and accessories designed to elevate your workspace and lifestyle. High-performance gear, curated just for you.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Featured Products</h2>
            <p className="mt-1 text-slate-500">Our hand-picked selection of top-performing tech gear.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
            <p className="mt-4 text-slate-500 font-medium">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <PackageX className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No products available</h3>
            <p className="text-slate-500 mt-2 max-w-sm text-center">
              We couldn't find any products in our store right now. Please check back later or refresh the page.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
