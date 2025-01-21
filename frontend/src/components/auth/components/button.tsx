import React from "react"
interface ButtonProps {
    name: string;
}

export const ButtonConnect = ({name}: ButtonProps) =>
{
    return(
        <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
            {name}
        </button>
    )
}
