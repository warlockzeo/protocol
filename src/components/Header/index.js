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
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 980;
  background-color: #ffffff;
`;

const Logo = Styled.img`
  width: 100px;
  height: auto;
  margin-right: 20px;
`;

const Titulo = Styled.h1`
  color: #ff0000;
  border: none;
  padding: 0;
  font-weight: bolder;
  font-size: 1.8em;
`;

const SubTitulo = Styled.h2`
  color: #0000ff;
  font-size: 1.5em;
`;

const tokenJwt = sessionStorage.getItem('access_token');
const user = tokenJwt && jwt(tokenJwt).data;

const Header = () => {
  return (
    <HeaderTag>
      <Logo src='/assets/images/logo-pmtn.jpg' alt='logomarca' />
      <div>
        <Titulo>PROTOCOLO CENTRAL</Titulo>
        <SubTitulo>
          Usuário: <strong>{user?.nome}</strong>
        </SubTitulo>
      </div>
      <Menu logout={logout} />
    </HeaderTag>
  );
};
export default Header;
