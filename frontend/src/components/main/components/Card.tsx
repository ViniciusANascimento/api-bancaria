import React from "react";
import { FooterCardPix } from "src/components/main/components/card/footer-card";
import { HeaderCardPix } from "src/components/main/components/card/header-card";
import { MainCardPix } from "src/components/main/components/card/main-card";

interface CardProps {
    reg: string;
    cpf: string;
    data: string;
    value: string;
    status: string;
    onButtonClick: (reg: string, status: string) => void;
}

const Card: React.FC<CardProps> = ({ reg, cpf, data, value, status, onButtonClick }) => {
    return (
        <div className="border rounded-md shadow-md w-64 bg-white">
            <HeaderCardPix reg={reg} />
            <MainCardPix cpf={cpf} data={data} value={value} />
            <FooterCardPix status={status} />
            <div className="px-4 py-2 text-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => onButtonClick(reg, status)} 
                >
                Pagar
            </button>
      </div>
        </div>
    );
};

export default Card;
