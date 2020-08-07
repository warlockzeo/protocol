import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Styled from 'styled-components';

const GroupButton = Styled.div`
  margin: 10px 0 0 0;
`;

const Fields = Styled.div`
  
`;

const FormChangePassword = ({ onCancel, handleChangePassword }) => {
  return (
    <>
      <Alert variant='secondary' className='text-center'>
        <Form>
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
            <Button
              className='buttonMargim'
              variant='success'
              onClick={handleChangePassword()}
            >
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
