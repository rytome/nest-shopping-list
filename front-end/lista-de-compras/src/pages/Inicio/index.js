import { useHistory } from 'react-router-dom'
import './styles.css'

import Logo from '../assets/logo.png'
import { Button } from 'antd'

export default function Inicio(){

    const history = useHistory()

    async function listarProdutos(){
        history.push('/produtos')
    }

    return(
        <div className='inicio__container'>
            <section >
                <img src={Logo} alt='logo' className='center'/>
                <br/>

                <Button className='center' onClick={listarProdutos}>Ver Produtos</Button>
            </section>
        </div>
    )
}