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
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 600px) {
    padding: 0 100px;
  }
`;

const DivResultado = Styled.div`
  width: 100%;
`;

const Busca = () => {
  const [returnBusca, setReturnBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    try {
      const resp = data.search;
      setReturnBusca(resp);
      console.log(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
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
          <>
            <Form onSubmit={onSubmit} schema={schema}>
              <Row>
                <Col md={6}>
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
                <Col md={6}>
                  <Button
                    type='submit'
                    className='form-control'
                    style={{ margin: 0 }}
                  >
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Form>
            {returnBusca === null && (
              <Alert variant='danger' className='text-center'>
                Nenhum protocolo encontrado para esta busca
              </Alert>
            )}
            {returnBusca && (
              <DivResultado>
                <Col md={12} className='text-left'>
                  <strong>Protocolos encontrados:</strong>
                  <Col md={12}>{returnBusca}</Col>
                </Col>
              </DivResultado>
            )}
          </>
        )}
      </FormBusca>
    </>
  );
};

export default Busca;
