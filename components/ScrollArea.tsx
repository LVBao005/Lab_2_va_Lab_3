import React from 'react';

interface ScrollAreaProps {
    children: React.ReactNode;
    className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className = "" }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="h-full w-full overflow-y-auto scroll-smooth py-4 px-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
                {children}
            </div>
        </div>
    );
};
