import React from 'react';
import Styled from 'styled-components';

import Menu from '../Menu';

const HeaderTag = Styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
`;

function Header() {
  return (
    <HeaderTag>
      <Menu />
    </HeaderTag>
  );
}
export default Header;
