import React from 'react';

interface AvatarProps {
    src?: string;
    fallback?: React.ReactNode;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, fallback, className = "" }) => {
    return (
        <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
            {src ? (
                <img src={src} className="aspect-square h-full w-full" alt="avatar" />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium">
                    {fallback}
                </div>
            )}
        </div>
    );
};
