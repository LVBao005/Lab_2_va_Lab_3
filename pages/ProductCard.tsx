
import React, { useState } from 'react';
import { Product } from '../types';
import { Button } from '../components/Button';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from '../components/QuantitySelector';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1); // Reset after adding
    };
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
                <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-900">
                            ${product.price.toFixed(2)}
                        </span>
                        <QuantitySelector
                            quantity={quantity}
                            onIncrease={() => setQuantity(q => q + 1)}
                            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                        />
                    </div>
                    <Button variant="primary" size="md" className="w-full" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};
