import React from 'react';
import Styled from 'styled-components';
import jwt from 'jwt-decode';
import { logout } from '../../utils/JWTAuth.js';

import Menu from '../Menu';

const HeaderTag = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
`;

const Logo = Styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
`;

const Titulo = Styled.h1`
  color: #ff0000;
  font-weight: bolder;
  font-size: 1.8em;
`;

const SubTitulo = Styled.h2`
  color: #0000ff;
  font-size: 1.5em;
`;

const tokenJwt = localStorage.getItem('access_token');
const user = tokenJwt && jwt(tokenJwt).data;

function Header() {
  return (
    <HeaderTag>
      <Logo src='/assets/images/logo-pmtn.jpg' alt='logomarca' />
      <div>
        <Titulo>PROTOCOLO CENTRAL</Titulo>
        <SubTitulo>
          Usuário: <strong>{user && user.nome}</strong>
        </SubTitulo>
      </div>
      <Menu logout={logout} />
    </HeaderTag>
  );
}
export default Header;
