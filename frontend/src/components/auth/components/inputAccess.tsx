import React, {ChangeEvent} from "react"

interface InputAccessProps{
    name: string;
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const InputAccess = (
    {value, name, handleChange, placeholder} : InputAccessProps
) => {
    return(
        <input
            type={name}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder={placeholder}
            aria-label={placeholder}
        />
    )
}