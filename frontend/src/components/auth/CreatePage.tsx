import React from "react";
import {FormRegister} from "src/components/auth/FormRegister";
import { Link } from 'react-router-dom';

const CreatePage = () => {

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">Criar Nova Conta</h2>
                <FormRegister />
                <p className="mt-4 text-sm text-center text-gray-600">
                    Já possui uma conta ?{" "}
                    <Link  to="/login" className="text-blue-500 hover:underline">
                        Acesse
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default CreatePage