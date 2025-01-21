import React from "react";

interface CardProps {
    reg: string;
}

export const HeaderCardPix: React.FC<CardProps> = ({ reg }) => {
    return (
        <div className="border-b px-4 py-2 text-center">
            <p className="text-sm font-medium text-gray-600">Cod.</p>
            <p className="text-xl font-bold text-gray-800">{reg}</p>
        </div>
    );
};
