import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Styled from 'styled-components';

const schema = Yup.object().shape({
  senha: Yup.string().min(3).trim(),
  senha2: Yup.string().oneOf([Yup.ref('senha'), null], 'Senhas não são iguais'),
});

const GroupButton = Styled.div`
  margin: 10px 0 0 0;
`;

const Fields = Styled.div`
  
`;

const FormChangePassword = ({ onCancel, handleChangePassword }) => {
  return (
    <>
      <Alert variant='secondary' className='text-center'>
        <Form onSubmit={handleChangePassword} schema={schema}>
          <h1>Alterar senha</h1>
          <Fields>
            <Row className='justify-content-md-center'>
              <Col md={3}>
                <Input
                  className='form-control'
                  type='password'
                  name='senha'
                  id='senha'
                  placeholder='Informe uma nova senha'
                />
              </Col>
              <Col md={3}>
                <Input
                  className='form-control'
                  type='password'
                  name='senha2'
                  id='senha2'
                  placeholder='Repita a senha'
                />
              </Col>
            </Row>
          </Fields>
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
};

export default FormChangePassword;
