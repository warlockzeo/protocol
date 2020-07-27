import React from 'react';
import { Table } from 'react-bootstrap';

// import { Container } from './styles';

const users = [
  { id: 2, nome: 'marcos', login: 'mark' },
  { id: 5, nome: 'joao', login: 'john' },
];

const handleDelete = (id) => {
  console.log(`delete ${id}`);
};
const handleEdit = (id) => {
  console.log(`edit ${id}`);
};

const keyFields = Object.keys(users[0]).filter((field) => field !== 'id');
const thead = keyFields.map((campo, index) => <td key={index}>{campo}</td>);

const tbody = users.map((user) => {
  return (
    <tr key={user.id}>
      <td>{user.nome}</td>
      <td>{user.login}</td>
      <td className='text-right'>
        <button onClick={() => handleEdit(user.id)}>edit</button>
        <button onClick={() => handleDelete(user.id)}>delete</button>
      </td>
    </tr>
  );
});

const Usuarios = () => {
  return (
    <>
      <h1>Usuários</h1>
      <Table striped hover responsive>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </>
  );
};

export default Usuarios;
