import React from "react";

export default function Song({ nombre, id }) {
    return (
        <div className="song">
            <h4> <span>{id}</span> {nombre} <span>-</span> </h4>
        </div>
    )
}