import React from "react";
import Card from "../Card";

interface PixListProps {
    cardsData: any[];
    onCardClick: (reg: string, status: string) => void;
}

const PixList: React.FC<PixListProps> = ({ cardsData, onCardClick }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {cardsData.length > 0 ? (
                cardsData.map((data, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <Card
                            reg={data.id}
                            cpf={data.clientCPF}
                            data={data.created_at}
                            value={data.value}
                            status={data.status}
                            onButtonClick={onCardClick}
                        />
                    </div>
                ))
            ) : (
                <p>Nenhum Pix encontrado.</p>
            )}
        </div>
    );
};

export default PixList;
