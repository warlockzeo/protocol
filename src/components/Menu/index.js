import React, { useState } from 'react';

import './styles.css';

const links = [
  { titulo: 'Início', link: '/home' },
  { titulo: 'Novo', link: '/novoprotocolo' },
  { titulo: 'Busca', link: '/busca' },
  { titulo: 'Relatório', link: '/relatorio' },
  { titulo: 'Usuários', link: '/usuarios' },
];

const linksCode = links.map((link, i) => (
  <li key={i} className='menu__link'>
    <a href={link.link}>{link.titulo}</a>
  </li>
));

const Menu = ({ logout }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuIsOpen((menuIsOpen) => !menuIsOpen);
  };

  const menuCss = menuIsOpen && 'menuShow';
  return (
    <>
      <button className='menu__button' onClick={toggleMenu}>
        Menu
      </button>
      <ul className={`menu ${menuCss}`}>
        {linksCode}
        <li className='menu__link logout' onClick={logout}>
          Logout
        </li>
      </ul>
    </>
  );
};

export default Menu;
