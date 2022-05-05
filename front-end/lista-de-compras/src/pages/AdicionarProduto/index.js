import './styles.css'

import React, {useState} from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

import { message, Form, Input, Button, InputNumber } from 'antd'

export default function AdicionarProduto(){

    const [disabled, setDisabled] = useState(false) 
    const history = useHistory()

    async function handleSubmit(produto){
        setDisabled(true)
        debugger;
        api.post('/item', produto)
            .then((response) => {
                if (response.status == 201){
                    message.success('Produto adicionado com sucesso!')
                    history.push('/produtos')
                }
            })
            .catch((err) => {
                message.error('Aconteceu um erro ao adicionar o produto' + err.response.data.message)
                setDisabled(false)
            })
    }

    return(
        <div className='produto__container'>
            <h1>
                Adicionar produto
            </h1>
            <br/>
            <div className='produto__form'>
                <Form 
                name='submitProduto'
                labelCol={{span:8}}
                wrapperCol={{span: 16}}
                onFinish={handleSubmit}
                autoComplete="off"
                >
                    <Form.Item 
                    label= 'Nome do item'
                    name='name'
                    rules={[{required: true, message: "O nome do item não pode ser vazio!"}]}
                    >
                
                        <Input placeholder="Nome"/>
                    </Form.Item>

                    <Form.Item 
                    label= 'Descrição'
                    name='description'
                    rules={[{required: true, message: "A descrição do item não pode ser vazia!"}]}
                    >
                        <Input placeholder="Descrição"/>
                    </Form.Item>

                    <Form.Item 
                    label= 'Quantidade'
                    name='quantity'
                    rules={[{required: true, message: "Insira a quantidade"}]}
                    >
                        <InputNumber placeholder="Quantidade" min={1} max={10000} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' disabled={disabled}>
                            Adicionar
                        </Button>
                    </Form.Item>
                </Form>
            </div>


        </div>
    )
}

