import React from "react";

interface CardProps {
    cpf: string;
    data: string;
    value: string;
}

export const MainCardPix: React.FC<CardProps> = ({ cpf, data, value }) => {
    return (
        <div className="px-4 py-2 space-y-2">
            <div>
                <p className="text-sm font-medium text-gray-600">Cod. CPF</p>
                <p className="text-lg font-bold text-gray-800">{cpf}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">Data:</p>
                <p className="text-lg font-bold text-gray-800">{data}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">Valor:</p>
                <p className="text-lg font-bold text-gray-800">R$ {value}</p>
            </div>
        </div>
    );
};
