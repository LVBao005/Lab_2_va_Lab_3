
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';

export const Home: React.FC = () => {
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

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
