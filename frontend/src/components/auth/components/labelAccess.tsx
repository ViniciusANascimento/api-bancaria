import React from "react"

export const LabelAccess = (props: any) => {
    return(
        <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-600">
        {props.name}
        </label>
    )
}