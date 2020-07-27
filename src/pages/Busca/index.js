import React, { useState } from 'react';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const protocolos = [1, 2, 3, 4, 5];

const schema = Yup.object().shape({
  search: Yup.string().required('Precisa informar um protocolo para busca'),
});

const Busca = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = () => {
    console.log('busca');
  };

  const onChangeField = () => {
    setErrorMessage('');
  };

  return (
    <>
      <h1>Busca de protocolo</h1>
      {errorMessage ? (
        <Alert variant='danger' className='text-center'>
          Nenhum protocolo encontrado para esta busca
        </Alert>
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
    </>
  );
};

export default Busca;
