import React from "react";

interface ModalProps {
    isOpen: boolean;
    cardValue: string;
    setCardValue: React.Dispatch<React.SetStateAction<string>>;
    onSave: (value: string) => void;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, cardValue, setCardValue, onSave, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-400">Insira o valor do PIX</h2>
                <input
                    type="text"
                    placeholder="Digite o valor"
                    className="w-full border px-4 py-2 mb-4 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={cardValue}
                    onChange={(e) => setCardValue(e.target.value)}
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(cardValue)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
