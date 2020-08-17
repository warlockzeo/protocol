import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ListUsers from '../../components/ListUsers';
import FormBlockUser from '../../components/FormBlockUser';
import FormUnblockUser from '../../components/FormUnblockUser';
import FormAddEditUser from '../../components/FormAddEditUser';
import FormChangePassword from '../../components/FormChangePassword';

const SERVER_URL = 'http://protocolo.v2.api';
const SIGNUP_ENDPOINT = `${SERVER_URL}/users`;

const Usuarios = () => {
  interface IUser {
    id?: number;
    name?: string;
    login?: string;
    nivel?: string;
  }
  const [users, setUsers] = useState([{ id: 0, nome: '', login: '' }]);
  const [show, setShow] = useState('list');
  const [actualUser, setActualUser] = useState<IUser>({});

  const onBlock = (id: number) => {
    selectUser(id);
    setShow('block');
  };

  const onUnblock = (id: number) => {
    selectUser(id);
    setShow('unblock');
  };

  const onAdd = () => {
    setShow('addEdit');
  };

  const onEdit = (id: number) => {
    selectUser(id);
    setShow('addEdit');
  };

  const onChangePassword = (id: number) => {
    selectUser(id);
    setShow('password');
  };

  const resetUsersPage = () => {
    setActualUser({});
    setShow('list');
  };

  const onCancel = () => {
    resetUsersPage();
  };

  const selectUser = (id: number) => {
    const selectedUser = users.filter((user) => user.id === id);
    setActualUser(selectedUser[0]);
  };

  const handleBlock = async () => {
    try {
      await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          option: 'block',
          body: { id: actualUser.id },
        }),
      });
      const newUsers = users.map((user) => {
        const {
          id,
          nome,
          login,
        }: { id: number; nome: string; login: string } = user;
        if (id === actualUser.id) {
          return { nivel: '0', id, nome, login };
        }
        return user;
      });
      setUsers(newUsers);
      resetUsersPage();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUnblock = async () => {
    try {
      await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          option: 'unblock',
          body: { id: actualUser.id },
        }),
      });
      const newUsers = users.map((user) => {
        const { id, nome, login } = user;
        if (id === actualUser.id) {
          return { nivel: '1', id, nome, login };
        }
        return user;
      });
      setUsers(newUsers);
      resetUsersPage();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async ({
    nome,
    login,
    nivel,
  }: {
    nome: string;
    login: string;
    nivel: string;
  }) => {
    try {
      await axios({
        method: 'put',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          body: { id: actualUser.id, nome, login, nivel },
        }),
      });

      const newUsers = users.map((user) => {
        if (user.id === actualUser?.id) {
          return { id: user.id, nome, login, nivel };
        }
        return user;
      });
      setUsers(newUsers);
      resetUsersPage();
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async (data: []) => {
    try {
      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({ option: 'add', body: { ...data } }),
      });

      let newUsers = users;
      newUsers.push(response.data);
      setUsers(newUsers);
      resetUsersPage();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePassword = (data: []) => {
    console.log(data);
  };

  const loadUsers = async () => {
    try {
      const response = await axios({
        method: 'get',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
      });
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
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
          user={actualUser?.id && actualUser}
        />
      )}

      {show === 'password' && (
        <FormChangePassword
          onCancel={onCancel}
          handleChangePassword={handleChangePassword}
        />
      )}
    </>
  );
};

export default Usuarios;
