import React, { useEffect, useState} from "react";
import api from '../../services/api';

import './styles.css'

import { Card } from 'antd';

export default function Produtos(){
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        api.get('/item')
            .then((response)=> {
                console.log(response);
                setProdutos(response.data)
        })
        .catch((err)=>{
            console.error("Aconteceu um erro inesperado" + err);
        });
    }, [])

    return(
        <div className="produto__container">
            <h1>Relação de todos os produtos</h1>
            <div className="produto__card__container">
                {produtos.map(produto => (
                    <Card key={produto.id} title={produto.name} bordered={false} style={{width: 300}}>
                        <p>Descrição: {produto.description}</p>
                        <p>Quantidade: {produto.quantity}</p>
                    </Card>
                ))}
            </div>

        </div>
    )
}