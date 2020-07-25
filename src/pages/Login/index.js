import React, { useState } from 'react';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Styled from 'styled-components';

import { login as submitLogin } from '../../utils/JWTAuth.js';
import Loader from '../../components/Loader';

const Wrap = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Image = Styled.img`
    width: 80%;
    max-width: 300px;
    height: auto;
    margin: 20px 0;
`;
const schema = Yup.object().shape({
  login: Yup.string().required('Precisa informar um login'),
  senha: Yup.string().required('Precisa informar uma Senha'),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ login, senha }) => {
    setIsLoading(true);
    setLoginErrorMessage(await submitLogin({ login, senha }));
    setIsLoading(false);
  };

  const onChangeField = () => {
    setErrorMessage('');
    setLoginErrorMessage('');
  };

  return (
    <Wrap>
      <Image alt='Logotipo' src='/assets/images/logo-pmtn.jpg' />

      {isLoading ? (
        <Loader />
      ) : (
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
              {errorMessage &&
                errorMessage.toLocaleLowerCase().search('login') > -1 && (
                  <span>{errorMessage}</span>
                )}
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
              {errorMessage &&
                errorMessage.toLocaleLowerCase().search('passe') > -1 && (
                  <span>{errorMessage}</span>
                )}
            </Col>
          </Row>
          <Button type='submit' className='form-control' color='danger'>
            Submit
          </Button>
        </Form>
      )}
      {loginErrorMessage.message && (
        <Alert variant='danger'>{loginErrorMessage.message}</Alert>
      )}
    </Wrap>
  );
};

export default Login;
