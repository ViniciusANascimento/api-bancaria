import React, { useState } from "react";
import jwtAuth from "src/interceptors/jwtAuth";
import Modal from "./components/menus/modal-register-pix";
import PixList from "./components/menus/pix-card"; // Componente para exibição dos cards
import SideBar from "./components/menus/sideBar-menu"; // Componente de barra lateral

export const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardValue, setCardValue] = useState("");
    const [cardsData, setCardsData] = useState([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCardClick = async (reg: string, status: string) => {
        if(status !== "PENDENTE"){
            alert("Este Pix já foi pago.");
            return
        }
        try{
        const response = await jwtAuth.patch("clients/pix", {"pixCode": reg, "status":"PAGO"});
        alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
      };

    const handleSaveValue = async (newValue: string) => {
        try {
            const regex = /(?:R\$)?(\d+(?:,\d{2})?)/;
            const match = regex.exec(newValue);
            let value;
            if (match) {
                value = match[1].replace(',', '.');
            } else {
                alert("Por favor, insira um valor válido");
                return;
            }
            const response = await jwtAuth.post("/clients/pix", { value });
            alert(response.data.message);
            setCardValue(newValue);
        } catch (error) {
            alert("Erro ao registrar Pix.");
            console.error(error);
        } finally {
            handleCloseModal();
        }
    };

    const handleMenuSearch = async () => {
        try {
            const response = await jwtAuth.get("/clients/pix");
            setCardsData(response.data.pixList);
        } catch (error) {
            alert("Erro ao consultar Pix.");
            console.error(error);
        }
    };

    const handleMenuExit = () => {
        sessionStorage.removeItem("token");
    };

    return (
        <div className="flex h-screen">
            {/* Barra lateral */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <SideBar
                    onSearch={handleMenuSearch}
                    onOpenModal={handleOpenModal}
                    onLogout={handleMenuExit}
                />
            </aside>
            
            {/* Conteúdo principal com cards */}
            <main className="flex-1 p-6 pt-16 overflow-auto bg-gray-100">
    <PixList cardsData={cardsData } onCardClick={handleCardClick} />
    <Modal
        isOpen={isModalOpen}
        cardValue={cardValue}
        setCardValue={setCardValue}
        onSave={handleSaveValue}
        onClose={handleCloseModal}
    />
</main>

        </div>
    );
};

export default MainPage;
