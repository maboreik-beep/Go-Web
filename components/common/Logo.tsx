import React from 'react';

export const Logo: React.FC<{ className?: string, isDarkBg?: boolean }> = ({ className, isDarkBg=true }) => {
    const textColor = isDarkBg ? 'text-white' : 'text-black';
    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <div className={`flex flex-col items-start ${textColor} font-sans uppercase`}>
                <span className="text-sm font-semibold tracking-wider">NOW</span>
                <span className="text-5xl font-bold -my-2 tracking-tighter">GO</span>
                <span className="text-5xl font-bold -my-2 tracking-tighter">ONLINE</span>
                <span className="text-sm font-light lowercase mt-1 tracking-normal">www.goonline.cloud</span>
            </div>
            <div className="w-0 h-0 
                border-t-[36px] border-t-transparent
                border-b-[36px] border-b-transparent
                border-l-[54px] border-l-primary self-center mt-1">
            </div>
        </div>
    );
};