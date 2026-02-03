import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartIcon: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <Link to="/cart" className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors group">
            <ShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white group-hover:bg-blue-700">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </Link>
    );
};
