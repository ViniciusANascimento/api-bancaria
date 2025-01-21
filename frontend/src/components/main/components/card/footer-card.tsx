import React from "react";

interface CardProps {
    status: string;
}

export const FooterCardPix: React.FC<CardProps> = ({ status }) => {
    const statusColor =
        status === "PAGO"
            ? "text-green-500"
            : status === "ATRASADO"
                ? "text-red-500"
                : status === "PENDENTE"
                    ? "text-yellow-500"
                    : "text-gray-500";

    return (
        <div className="border-t px-4 py-2 text-center">
            <p className="text-sm font-medium text-gray-600">Situação:</p>
            <p className={`text-lg font-bold ${statusColor}`}>{status}</p>
        </div>
    );
};
