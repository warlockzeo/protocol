import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import Styled from 'styled-components';

const schema = Yup.object().shape({
  nome: Yup.string().required('Precisa informar um nome'),
  login: Yup.string().required('Precisa informar um login'),
  status: Yup.string().required('Precisa selecionar o status'),
  senha: Yup.string().min(3).trim(),
  senha2: Yup.string().oneOf([Yup.ref('senha'), null], 'Senhas não são iguais'),
});

const GroupButton = Styled.div`
  text-align: center;
  margin: 10px 0 0 0;
`;

function FormAddEditUser({ onCancel, handleAdd, handleEdit, user }) {
  const initialData = user ? user : null;

  const onSubmit = (data) => {
    if (user) {
      handleEdit(data);
    } else {
      handleAdd(data);
    }
  };

  const onChangeField = (e) => {
    //console.log(e.currentTarget.value);
  };

  return (
    <>
      <Alert variant='primary' className='text'>
        <h1>{user ? 'Editar' : 'Novo'} Usuário</h1>
        <Form onSubmit={onSubmit} schema={schema} initialData={initialData}>
          <Row>
            <Col md={4}>
              <label>Login: </label>
              <Input
                className='form-control'
                type='text'
                name='login'
                id='login'
                placeholder='Informe um login'
              />
            </Col>
            <Col md={4}>
              <label>Nome: </label>
              <Input
                className='form-control'
                type='text'
                name='nome'
                id='nome'
                placeholder='Informe um nome'
              />
            </Col>
            <Col md={4}>
              <label>Status: </label>
              <Select
                options={[
                  { id: 'active', title: 'Ativo' },
                  { id: 'blocked', title: 'Bloqueado' },
                ]}
                name='status'
                id='status'
                onChange={onChangeField}
                className='form-control'
              />
            </Col>
          </Row>
          {user === null && (
            <Row className='justify-content-md-center'>
              <Col md={3}>
                <label>Senha: </label>
                <Input
                  className='form-control'
                  type='password'
                  name='senha'
                  id='senha'
                  placeholder='Informe uma nova senha'
                />
              </Col>
              <Col md={3}>
                <label>Repetir senha: </label>
                <Input
                  className='form-control'
                  type='password'
                  name='senha2'
                  id='senha2'
                  placeholder='Repita a senha'
                />
              </Col>
            </Row>
          )}

          <GroupButton>
            <Button className='buttonMargim' variant='success' type='submit'>
              Confirmar
            </Button>
            <Button
              className='buttonMargim'
              variant='danger'
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </GroupButton>
        </Form>
      </Alert>
    </>
  );
}

export default FormAddEditUser;
