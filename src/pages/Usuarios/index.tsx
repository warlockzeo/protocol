import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import axios from 'axios';

import ListUsers from '../../components/ListUsers';
import FormBlockUser from '../../components/FormBlockUser';
import FormUnblockUser from '../../components/FormUnblockUser';
import FormAddEditUser from '../../components/FormAddEditUser';
import FormChangePassword from '../../components/FormChangePassword';
import Loader from '../../components/Loader';

const SIGNUP_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/users`;

const Wrapp = Styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
@media only screen and (min-width: 600px) {
  padding: 0 100px;
}
`;

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
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(id);
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
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleUnblock = async () => {
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
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
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleAdd = async (data: []) => {
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleChangePassword = async (data: []) => {
    setIsLoading(true);
    try {
      await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          option: 'updatePassword',
          body: { id: actualUser.id, ...data },
        }),
      });
      resetUsersPage();
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'get',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
      });
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  let activeBlock: any;

  switch (show) {
    case 'block': {
      activeBlock = (
        <FormBlockUser
          onCancel={onCancel}
          handleBlock={handleBlock}
          user={actualUser}
        />
      );
      break;
    }
    case 'unblock': {
      activeBlock = (
        <FormUnblockUser
          onCancel={onCancel}
          handleUnblock={handleUnblock}
          user={actualUser}
        />
      );
      break;
    }
    case 'addEdit': {
      activeBlock = (
        <FormAddEditUser
          onCancel={onCancel}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
          user={actualUser?.id && actualUser}
        />
      );
      break;
    }
    case 'password': {
      activeBlock = (
        <FormChangePassword
          onCancel={onCancel}
          handleChangePassword={handleChangePassword}
        />
      );
      break;
    }
    case 'list': {
      activeBlock = (
        <ListUsers
          users={users}
          onAdd={onAdd}
          onEdit={onEdit}
          onBlock={onBlock}
          onUnblock={onUnblock}
          onChangePassword={onChangePassword}
        />
      );
      break;
    }
  }
  return (
    <>
      {isLoading ? (
        <Wrapp>
          <Loader />
        </Wrapp>
      ) : (
        activeBlock
      )}
    </>
  );
};

export default Usuarios;
