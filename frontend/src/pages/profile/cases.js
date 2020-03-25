import React from 'react';
import {FiTrash2 } from 'react-icons/fi'


export default function Cases({props, handleDeleteIncident}) {
    return (
        <li>
            <strong>CASO:</strong>
            <p>{props.title}</p>

            <strong>Descrição</strong>
            <p>{props.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(props.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(props.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        </li>
    )
}