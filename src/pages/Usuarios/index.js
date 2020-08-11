import React, { useState } from 'react';
import ListUsers from '../../components/ListUsers';
import FormBlockUser from '../../components/FormBlockUser';
import FormUnblockUser from '../../components/FormUnblockUser';
import FormAddEditUser from '../../components/FormAddEditUser';
import FormChangePassword from '../../components/FormChangePassword';

const initialUsers = [
  { id: 2, nome: 'marcos', login: 'mark', status: 'active' },
  { id: 5, nome: 'joao', login: 'john', status: 'blocked' },
];

const Usuarios = () => {
  const [users, setUsers] = useState(initialUsers);
  const [show, setShow] = useState('list');
  const [actualUser, setActualUser] = useState(null);

  const onBlock = (id) => {
    selectUser(id);
    setShow('block');
  };

  const onUnblock = (id) => {
    selectUser(id);
    setShow('unblock');
  };

  const onAdd = () => {
    setShow('addEdit');
  };

  const onEdit = (id) => {
    selectUser(id);
    setShow('addEdit');
  };

  const onChangePassword = (id) => {
    selectUser(id);
    setShow('password');
  };

  const resetUsersPage = () => {
    setActualUser(null);
    setShow('list');
  };

  const onCancel = () => {
    resetUsersPage();
  };

  const selectUser = (id) => {
    const selectedUser = users.filter((user) => user.id === id);
    setActualUser(selectedUser[0]);
  };

  const handleBlock = () => {
    const newUsers = users.map((user) => {
      const { id, nome, login } = user;
      if (id === actualUser.id) {
        return { status: 'blocked', id, nome, login };
      }
      return user;
    });
    setUsers(newUsers);
    resetUsersPage();
  };

  const handleUnblock = () => {
    const newUsers = users.map((user) => {
      const { id, nome, login } = user;
      if (id === actualUser.id) {
        return { status: 'active', id, nome, login };
      }
      return user;
    });
    setUsers(newUsers);
    resetUsersPage();
  };

  const handleEdit = ({ nome, login, status }) => {
    const newUsers = users.map((user) => {
      if (user?.id === actualUser?.id) {
        return { id: user.id, nome, login, status };
      }
      return user;
    });
    setUsers(newUsers);
    resetUsersPage();
  };

  const handleAdd = (data) => {
    console.log(data);
  };

  const handleChangePassword = (data) => {
    console.log(data);
  };

  return (
    <div className='container'>
      {show === 'list' && (
        <ListUsers
          users={users}
          onAdd={onAdd}
          onEdit={onEdit}
          onBlock={onBlock}
          onUnblock={onUnblock}
          onChangePassword={onChangePassword}
        />
      )}

      {show === 'block' && (
        <FormBlockUser
          onCancel={onCancel}
          handleBlock={handleBlock}
          user={actualUser}
        />
      )}

      {show === 'unblock' && (
        <FormUnblockUser
          onCancel={onCancel}
          handleUnblock={handleUnblock}
          user={actualUser}
        />
      )}

      {show === 'addEdit' && (
        <FormAddEditUser
          onCancel={onCancel}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          user={actualUser}
        />
      )}

      {show === 'password' && (
        <FormChangePassword
          onCancel={onCancel}
          handleChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
};

export default Usuarios;
