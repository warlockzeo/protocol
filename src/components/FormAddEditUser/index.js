import React from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Styled from 'styled-components';

const GroupButton = Styled.div`
  margin: 10px 0 0 0;
`;

function FormAddEditUser({ onCancel, handleEdit }) {
  return (
    <>
      <Alert variant='primary' className='text-center'>
        <h1>Adicionar Editar Usuário</h1>
        <Form>
          <Row>
            <Col md={12}>
              <Input
                className='form-control'
                type='text'
                name='search'
                id='search'
                placeholder='Informe um protocolo para busca'
              />
            </Col>
          </Row>
          <GroupButton>
            <Button
              className='buttonMargim'
              variant='success'
              onClick={handleEdit}
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
}

export default FormAddEditUser;
