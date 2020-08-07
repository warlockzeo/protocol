import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ListUsers = ({
  users,
  onAdd,
  onEdit,
  onBlock,
  onUnblock,
  onChangePassword,
}) => {
  const keyFields = Object.keys(users[0]).filter(
    (field) => field !== 'id' && field !== 'status',
  ); //recupera nome das propriedades
  const thead = keyFields.map((campo, index) => (
    <th key={index}>{campo.toUpperCase()}</th>
  ));

  const tbody = users.map((user) => {
    return (
      <tr
        key={user.id}
        className={user.status === 'blocked' ? 'table-danger' : ''}
      >
        <td>{user.nome}</td>
        <td>{user.login}</td>
        <td className='text-right'>
          {user.status === 'active' ? (
            <>
              <Button
                size='sm'
                variant='primary'
                className='buttonMargim'
                onClick={() => onEdit(user.id)}
              >
                Editar
              </Button>
              <Button
                size='sm'
                variant='danger'
                className='buttonMargim'
                onClick={() => onBlock(user.id)}
              >
                Bloquear
              </Button>
              <Button
                size='sm'
                variant='secondary'
                className='buttonMargim'
                onClick={(id) => onChangePassword()}
              >
                Mudar senha
              </Button>
            </>
          ) : (
            <Button
              size='sm'
              variant='warning'
              className='buttonMargim'
              onClick={() => onUnblock(user.id)}
            >
              Desbloquear
            </Button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>Usuários</h1>
      <Table hover responsive>
        <thead>
          <tr>
            {thead}
            <th colSpan={2} className='text-right'>
              <Button
                size='sm'
                variant='success'
                className='buttonMargim'
                onClick={() => onAdd()}
              >
                Novo Usuário
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </>
  );
};

export default ListUsers;
