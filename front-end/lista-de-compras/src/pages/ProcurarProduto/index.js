import './styles.css'
import React, { useState } from 'react'
import api from '../../services/api'

import { useHistory, useLocation } from 'react-router-dom'

import { message, Input, Button, Spin, Card } from 'antd'

export default function ProcurarProduto(){
    const [produtos, setProdutos] = useState([])
    const history = useHistory()
    const location = useLocation()

    const [produtoSearch, setProdutoSearch] = useState()
    const [loading, setLoading] = useState(false)
    const [frameResultado, setFrameResultado] = useState(true)

    async function handleSubmitSearch(){
        setLoading(true)
        setFrameResultado(true)
        console.log(produtoSearch)
        api.get(`/item?query=${produtoSearch}`)
        .then((response) => {
            if(response.status ==200){
                setLoading(false)
                setFrameResultado(false)
                setProdutos(response.data)
               
            }
        })
        .catch((err) => {
            message.error('Acontece um erro inesperado: ' + err.response.data.message, 5)
            setLoading(false)
        })
    }

    return(
        <div className='produto__container'>
            <h1>Procurar Produto</h1>
            <br/>
            <Spin spinning={loading} size="large" tip="Carregando...">
                <div className='produto__edit'>
                    <div className='produto__campo'>
                        <span className='produto__label'>Palavra-chave:</span>
                        <Input onChange={(e) => {
                            setProdutoSearch(e.target.value)
                        }} placeholder="Digite a palavra-chave"/>
                        
                    </div>

                    <Button type='primary' className='procurar__btn' onClick={()=> handleSubmitSearch()}>Procurar</Button> 
                </div>
            


                <div className='produto__container' hidden={frameResultado}>
                    <h1>Resutado</h1>
                        <div className="produto__card__container">
                            {produtos.map(produto => (
                                <Card key={produto.id} title={produto.name} bordered={false} style={{width: 300}}>
                                    <p><b>Descrição:</b> {produto.description}</p>
                                    <p><b>Quantidade:</b> {produto.quantity}</p>
                                    <Button onClick={() => history.push(`/detalhes/${produto.id}`)}>Detalhes</Button>
                                </Card>
                            ))}
                        </div>
                </div>
            </Spin>
        </div>
    )
}