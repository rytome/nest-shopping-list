
import './App.css';

import { Menu } from 'antd';

import { Layout } from 'antd';

import RouterPage from './routes';

import {PlusCircleOutlined, UnorderedListOutlined, HomeOutlined} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';



const { Header, Footer, Sider, Content } = Layout;

function App() {

  let history = useHistory()

  return (
    <div className="main">
      <Layout className='main__content'>
        <Header className='header'>Lista de Compras</Header>
          <Layout>
            <Sider className='menu'>
              <Menu className='menu__section'>
                <Menu.Item key={1} icon={<PlusCircleOutlined />} onClick={() => history.push('/adicionar')}>
                  Adicionar Produto
                </Menu.Item>
                <Menu.Item key={2} icon={<UnorderedListOutlined />} onClick={() => history.push('/produtos')}>
                  Listar Produtos
                </Menu.Item>
                <Menu.Item key={3} icon={<HomeOutlined />} onClick={() => history.push('/')}>
                  Home
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
              <RouterPage>

              </RouterPage>
            </Content>
          </Layout>
        <Footer className='footer'>Todos os direitos reservados</Footer>
    </Layout>
    </div>
  );
}

export default App;
