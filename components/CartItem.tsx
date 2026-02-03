import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';
import { Button } from './Button';

interface CartItemProps {
    item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 py-6 border-b border-slate-100 last:border-0">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                    </div>
                    <p className="mt-1 sm:mt-0 text-base font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};
