import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

export const Cart: React.FC = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    const isUUID = (id: string) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    };

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsCheckingOut(true);
        try {
            // 1. Create the order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    total_price: totalPrice,
                    status: 'completed'
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create order items
            const orderItems = cart.map(item => {
                // Determine if this is a real product from the database
                const isRealProduct = isUUID(item.id);

                // Construct the base entry
                const entry: any = {
                    order_id: orderData.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                };

                // ONLY include product_id if it's a valid UUID
                // If it's mock data (like '1', '2'), we omit it completely
                if (isRealProduct) {
                    entry.product_id = item.id;
                }

                return entry;
            });

            console.log('Sending order items to Supabase:', orderItems);

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)
                .select();

            if (itemsError) throw itemsError;

            alert('Your order has been processed successfully! Thank you for shopping with Nexus.');
            clearCart();
            navigate('/orders');
        } catch (error: any) {
            console.error('Error creating order:', error);

            // Specifically handle Foreign Key violations
            if (error.message?.includes('violates foreign key constraint')) {
                alert('Checkout failed: One or more items in your cart are no longer available or have invalid IDs. Please CLEAR YOUR CART and try adding products again.');
            } else {
                alert('Failed to place order: ' + error.message);
            }
        } finally {
            setIsCheckingOut(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                        <ShoppingBag className="h-10 w-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
                    <p className="text-slate-500 max-w-sm">
                        Looks like you haven't added any premium gear to your cart yet.
                    </p>
                    <Link to="/">
                        <Button variant="primary" className="mt-4">
                            Return to Shop
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-8">
                <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Cart</h1>
            </div>

            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
                <section className="lg:col-span-7">
                    <div className="border-t border-slate-200">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center px-4 py-4 bg-slate-50 rounded-lg">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearCart}
                            className="text-slate-500 hover:text-red-500 hover:bg-red-50"
                        >
                            Clear Cart
                        </Button>
                        <Link to="/" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Continue Shopping
                        </Link>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="mt-16 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 lg:col-span-5 lg:mt-0 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">Subtotal</p>
                            <p className="text-sm font-medium text-slate-900">${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">Shipping</p>
                            <p className="text-sm font-medium text-green-600">Free</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                            <p className="text-base font-bold text-slate-900">Total</p>
                            <p className="text-base font-bold text-slate-900">${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        className="mt-8 w-full py-4 text-base shadow-lg shadow-slate-200"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : 'Checkout Now'}
                    </Button>

                    <p className="mt-4 text-center text-xs text-slate-400">
                        Secure checkout powered by Nexus Pay
                    </p>
                </section>
            </div>
        </div>
    );
};
