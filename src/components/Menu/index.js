import React from 'react';

// import { Container } from './styles';

const links = [
  { titulo: 'Início', link: '/' },
  { titulo: 'Novo', link: '/novoprotocolo' },
  { titulo: 'Buscar', link: '/buscar' },
  { titulo: 'Relatórios', link: '/relatorios' },
  { titulo: 'Usuários', link: '/usuarios' },
];

const linksCode = links.map((link, i) => (
  <li key={i}>
    <a href={link.link}>{link.titulo}</a>
  </li>
));
const Menu = () => {
  return (
    <div>
      <ul>{linksCode}</ul>
    </div>
  );
};

export default Menu;
