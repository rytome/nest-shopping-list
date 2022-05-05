import React, { useEffect, useState } from "react";
import api from '../../services/api'
import { useParams, useHistory } from "react-router-dom";
import './styles.css'
import { Button, Card, message, Modal, Spin } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

export default function DetalhesProduto(){
    const [produto, setProduto] = useState([])
    const history = useHistory()
    const [loading, setLoading] = useState(true)

    let {id} = useParams();

    const { confirm } = Modal;

    function showConfirm(produto) {
    confirm({
        title: 'Deseja realmente excluir?',
        icon: <ExclamationCircleOutlined />,
        content: `Produto: ${produto.name}`,
        onOk() {
            handleDelete(produto.id)
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
    }

    function handleDelete(id){
        setLoading(true)
        api.delete(`/item/${id}`)
        .then((response) => {
            if (response.status == 200)
                setLoading(false)
                message.success("O produto foi excluído com sucesso!")
                history.push('/produtos')
        })
        .catch((err) => {
            setLoading(false)
            message.error("Aconteceu um erro inesperado")

        })
    }

    useEffect(() => {
        api.get(`/item/${id}`)
        .then((response) => {
            setProduto(response.data)
            setLoading(false)
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado")

        })
    },[])

    return(
        <div className="produto__container">
            <h1>Detalhes do produto</h1>    
            <br/>
            <div className="produto__card__container">
                <Spin spinning={loading} size="large" tip="Carregando...">
                    <Card key={produto.id} title={produto.name} bordered={false}>
                        <p><b>Id:</b> {produto.id}</p>
                        <p><b>Descrição:</b> {produto.description}</p>
                        <p><b>Quantidade:</b> {produto.quantity}</p>
                        <p><b>Última Atualização:</b> {produto.updatedAt}</p>
                        <hr/>
                        <div className="produto__card__actions">
                        <Button type="primary" sucecess icon={<EditOutlined/>} onClick={() => history.push(`/editar/${produto.id}`, produto) }>Editar</Button>
                        <Button type="primary" danger onClick={() => showConfirm(produto) }>Excluir</Button>
                        </div>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}