import React from "react";
import { Link } from "react-router-dom";

interface SideBarProps {
    onSearch: () => void;
    onOpenModal: () => void;
    onLogout: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSearch, onOpenModal, onLogout }) => {
    return (
        <nav className="flex-1">
            <ul className="space-y-2 p-4">
                {/* Botão de Consulta */}
                <li>
                    <button
                        onClick={onSearch}
                        className="flex items-center p-2 w-full text-left rounded-md hover:bg-gray-700"
                    >
                        <span>Consultar Pix</span>
                    </button>
                </li>

                {/* Botão de Registro */}
                <li>
                    <button
                        onClick={onOpenModal}
                        className="flex items-center p-2 w-full text-left rounded-md hover:bg-gray-700"
                    >
                        <span>Registrar Pix</span>
                    </button>
                </li>

                {/* Botão de Sair */}
                <li>
                    <Link to="/login" onClick={onLogout} className="block">
                        <button className="flex items-center p-2 w-full text-left rounded-md hover:bg-gray-700">
                            <span>Sair</span>
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;
