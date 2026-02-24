import React from 'react';
import { Calendar, Package, ChevronDown, ChevronUp } from 'lucide-react';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    created_at: string;
    total_price: number;
    status: string;
    order_items: OrderItem[];
}

interface OrderCardProps {
    order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6 shadow-sm hover:border-slate-300 transition-colors">
            <div
                className="p-6 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</p>
                            <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{order.id}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-grow md:ml-12">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                            <div className="flex items-center gap-1.5 text-sm text-slate-700">
                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                {formatDate(order.created_at)}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total</p>
                            <p className="text-sm font-bold text-slate-900">${order.total_price.toFixed(2)}</p>
                        </div>
                        <div className="md:block hidden">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</p>
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end">
                        <div className="md:hidden">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-400 group-hover:text-slate-900 transition-colors">
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-6 animate-in slide-in-from-top-2 duration-300">
                    <h4 className="text-sm font-bold text-slate-900 mb-4">Items in this order</h4>
                    <div className="space-y-4">
                        {(order.order_items || []).map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {item.quantity}x
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                                        <p className="text-xs text-slate-500">${item.price.toFixed(2)} each</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
                        <p className="text-sm font-medium text-slate-600">Total Paid</p>
                        <p className="text-lg font-bold text-slate-900">${order.total_price.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};
