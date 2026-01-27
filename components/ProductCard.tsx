
import React from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
            {product.category}
          </span>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
          <Button variant="primary" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
