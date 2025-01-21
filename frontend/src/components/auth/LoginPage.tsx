import React from "react";
import { Link } from "react-router-dom";
import { FormSubmit } from "src/components/auth/FormSubmit";

const LoginPage = () => {
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <FormSubmit />
                <p className="mt-4 text-sm text-center text-gray-600">
                    Não tem uma conta?{" "}
                    <Link to={"/signin"} className="text-blue-500 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage