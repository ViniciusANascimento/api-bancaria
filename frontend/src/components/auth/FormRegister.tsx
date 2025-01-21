import axios from "axios";
import { cpf as CPF } from 'cpf-cnpj-validator';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonConnect } from "src/components/auth/components/button";
import { InputAccess } from "src/components/auth/components/inputAccess";
import { LabelAccess } from "src/components/auth/components/labelAccess";

export const FormRegister = (props: any) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "", cpf: "", name: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password,cpf , name} = formData;


        if (!email || !password || !cpf || !name) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }
        if( !CPF.isValid(cpf) ){
            setError("Por favor, insira um CPF válido");
            return;
        }

        setError("");
        const response = await axios.post("http://localhost:3001/clients", {email, password, cpf, name})
        const {token} = response.data;
        sessionStorage.setItem("token", token);
        alert("Cadastro realizado com sucesso");
        setTimeout(() =>{
            navigate("/home")
        }, 1000)
        navigate("/home")

    };


    return(
        <form onSubmit={handleSubmit} className="mt-6">
            {error && (
                <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
            )}
            <div className="mb-4">
                <LabelAccess name="E-mail"/>
                <InputAccess
                    name="email"
                    value={formData.email}
                    handleChange={handleChange}
                    placeholder="Digite o e-mail"
                />
            </div>
            <div className="mb-4">
                <LabelAccess name="Senha"/>
                <InputAccess
                    name="password"
                    value={formData.password}
                    handleChange={handleChange}
                    placeholder="Digite sua senha"
                />
            </div>
            <div className="mb-4">
                <LabelAccess name="CPF"/>
                <InputAccess
                    name="cpf"
                    value={formData.cpf}
                    handleChange={handleChange}
                    placeholder="Digite o CPF"
                />
            </div>
            <div className="mb-4">
                <LabelAccess name="Nome"/>
                <InputAccess
                    name="name"
                    value={formData.name}
                    handleChange={handleChange}
                    placeholder="Digite o Nome"
                />
            </div>
            <ButtonConnect name="Entrar"/>
        </form>
    )
}