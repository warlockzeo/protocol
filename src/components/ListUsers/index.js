import React from 'react';
import { Table, Button } from 'react-bootstrap';
import jwt from 'jwt-decode';

const tokenJwt = sessionStorage.getItem('access_token');
const actualUser = tokenJwt && jwt(tokenJwt).data;

const ListUsers = ({
  users,
  onAdd,
  onEdit,
  onBlock,
  onUnblock,
  onChangePassword,
}) => {
  if (users.length) {
    const keyFields = Object.keys(users[0]).filter(
      (field) => field !== 'id' && field !== 'nivel',
    ); //recupera nome das propriedades
    const thead = keyFields.map((campo, index) => (
      <th key={index}>{campo.toUpperCase()}</th>
    ));

    const tbody = users.map((user) => {
      return (
        <tr
          key={user.id}
          className={
            user.nivel === '0'
              ? 'table-danger'
              : user.nivel === '10'
              ? 'table-success'
              : ''
          }
        >
          <td>{user.login}</td>
          <td>{user.nome}</td>
          <td className='text-right'>
            {user.nivel !== '0' ? (
              <>
                {user.nivel !== '100' && (
                  <Button
                    size='sm'
                    variant='primary'
                    className='buttonMargim'
                    onClick={() => onEdit(user.id)}
                  >
                    Editar
                  </Button>
                )}
                {user.nivel !== '10' && user.nivel !== '100' && (
                  <Button
                    size='sm'
                    variant='danger'
                    className='buttonMargim'
                    onClick={() => onBlock(user.id)}
                  >
                    Bloquear
                  </Button>
                )}

                {((user.nivel === '100' && user.id === actualUser.reg) ||
                  user.nivel !== '100') && (
                  <Button
                    size='sm'
                    variant='secondary'
                    className='buttonMargim'
                    onClick={() => onChangePassword(user.id)}
                  >
                    Mudar senha
                  </Button>
                )}
              </>
            ) : (
              user.nivel === '0' && (
                <Button
                  size='sm'
                  variant='warning'
                  className='buttonMargim'
                  onClick={() => onUnblock(user.id)}
                >
                  Desbloquear
                </Button>
              )
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
  }
  return (
    <>
      <h1>Nenhum usuário cadastrado</h1>;
      <Button
        size='sm'
        variant='success'
        className='buttonMargim'
        onClick={() => onAdd()}
      >
        Novo Usuário
      </Button>
    </>
  );
};

export default ListUsers;
