import React, { useState } from 'react';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Loader from '../../components/Loader';
import Styled from 'styled-components';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  search: Yup.string().required('Precisa informar um protocolo para busca'),
});

const FormBusca = Styled.div`
  flex: 1;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const Busca = () => {
  const [returnBusca, setReturnBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setReturnBusca(data.search);
    setIsLoading(false);
  };

  const onChangeField = () => {
    setReturnBusca('');
  };

  return (
    <>
      <h1>Busca de protocolo</h1>
      <FormBusca>
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmit} schema={schema}>
            <Row>
              <Col md={12}>
                <Input
                  className='form-control'
                  type='text'
                  name='search'
                  id='search'
                  placeholder='Informe um protocolo para busca'
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
            </Row>
            <Button type='submit' className='form-control'>
              Buscar
            </Button>
          </Form>
        )}

        {returnBusca === null && (
          <Alert variant='danger' className='text-center'>
            Nenhum protocolo encontrado para esta busca
          </Alert>
        )}
        {returnBusca && <div>Resultado da busca: {returnBusca}</div>}
      </FormBusca>
    </>
  );
};

export default Busca;
