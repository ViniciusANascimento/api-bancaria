import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonConnect } from "src/components/auth/components/button";
import { InputAccess } from "src/components/auth/components/inputAccess";
import { LabelAccess } from "src/components/auth/components/labelAccess";
import jwtAuth from "src/interceptors/jwtAuth";

export const FormSubmit = (props: any) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {email, password} = formData;

        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Por favor, insira um e-mail válido.");
            return;
        }

        setError("");
        try {
            const response = await jwtAuth.post("/login", {email, password})
            const {token} = response.data;
            sessionStorage.setItem("token", token);
            alert("Login realizado com sucesso");
            setTimeout(() =>{
                navigate("/home")
            }, 1000)
            navigate("/home")
        } catch (error) {
            alert(error.message)
        }

    };

    return (
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
            <ButtonConnect name="Entrar"/>
        </form>
    )
}