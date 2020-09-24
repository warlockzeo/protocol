import React, { useState } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Styled from 'styled-components';

import { login as submitLogin } from '../../utils/JWTAuth.js';
import Loader from '../../components/Loader';

const Wrap = Styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Image = Styled.img`
    width: 80%;
    max-width: 200px;
    height: auto;
    margin: 20px 0;
`;
const schema = Yup.object().shape({
  login: Yup.string().required('Precisa informar um login'),
  senha: Yup.string().required('Precisa informar uma Senha'),
});

const Login = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ login, senha }) => {
    setIsLoading(true);
    await submitLogin({ login, senha }).then((resp) => {
      setLoginErrorMessage(resp);
      console.log(resp);
      if (resp.message) {
        setIsLoading(false);
      }
    });
  };

  const onChangeField = () => {
    setLoginErrorMessage('');
  };

  return (
    <Wrap>
      <Image alt='Logotipo' src='./assets/images/logo-pmtn.jpg' />

      {isLoading ? (
        <Loader />
      ) : !sessionStorage.getItem('access_token') ? (
        <Form onSubmit={onSubmit} schema={schema}>
          <Row>
            <Col md={6}>
              <Input
                className='form-control'
                type='text'
                name='login'
                id='login'
                placeholder='Login'
                onChange={onChangeField}
                onFocus={onChangeField}
              />
            </Col>
            <Col md={6}>
              <Input
                className='form-control'
                type='password'
                name='senha'
                id='senha'
                placeholder='Senha'
                onChange={onChangeField}
                onFocus={onChangeField}
              />
            </Col>
          </Row>
          <Button
            type='submit'
            className='form-control'
            color='danger'
            style={{ backgroundColor: '#0054AD' }}
          >
            Login
          </Button>
        </Form>
      ) : (
        <h1>Já logado!</h1>
      )}
      {loginErrorMessage.message && (
        <Alert variant='danger'>{loginErrorMessage.message}</Alert>
      )}
    </Wrap>
  );
};

export default Login;
