import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from './Button';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    onIncrease,
    onDecrease,
    min = 1
}) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-md"
                onClick={onDecrease}
                disabled={quantity <= min}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium text-slate-700">{quantity}</span>
            <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 rounded-md"
                onClick={onIncrease}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};
