import React, { useState } from 'react';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Loader from '../../components/Loader';
import Styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';

import './styles.css';

const SIGNUP_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/protocolos`;

const schema = Yup.object().shape({
  search: Yup.string().required('Precisa informar um protocolo para busca'),
});

const FormSearch = Styled.div`
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

const P = Styled.p`
  margin-bottom: 0;
`;

const Busca = () => {
  const [returnBusca, setReturnBusca] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [protocolo, setProtocolo] = useState('');

  const onSubmit = async ({ search }) => {
    setProtocolo(search);
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({ option: 'search', body: { search } }),
      });

      if (Array.isArray(response.data)) {
        setReturnBusca(response.data);
      }
      //console.log('retorno submit', response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const onChangeField = () => {
    setReturnBusca([]);
    setProtocolo('');
  };

  let showReturnBusca = '';
  if (returnBusca.length > 0) {
    showReturnBusca = returnBusca.map((ret, i) => {
      if (ret.copia === 'copia') {
        const date = moment(ret.data);
        return (
          <Row key={i} className='return-busca'>
            <Col md={2} className='text-center'>
              {date.format('DD/MM/YYYY, h:mm:ss a')}
            </Col>
            <Col md={10}>
              <P>
                <strong>De: </strong>
                {!!ret.origemNome ? ret.origemNome : ret.origem} -{' '}
                {ret.dep_origem}
                <br />
                <strong>Para: </strong>
                {!!ret.destinoNome ? ret.destinoNome : ret.destino} -
                {ret.dep_destino} - Por:
                {ret.portador} /{ret.mat}
                <br />
                <strong>{ret.copia}</strong>
              </P>
            </Col>
          </Row>
        );
      } else {
        const date = moment(ret.data);
        return (
          <Row key={i} className='return-busca-head'>
            <Col md={2} className='text-center'>
              {date.format('DD/MM/YYYY, h:mm:ss a')}
            </Col>
            <Col md={3}>
              <P>
                <strong>De:</strong>
                {!!ret.origemNome ? ret.origemNome : ret.origem} -{' '}
                {ret.dep_origem}
                <br />
                <strong>Para: </strong>
                {!!ret.destinoNome ? ret.destinoNome : ret.destino} -
                {ret.dep_destino}
                <br />
                <strong>Por: </strong> {ret.portador} /{ret.mat}
                <br />
                {ret.copia && (
                  <span>
                    <strong>Cópias para:</strong> {ret.copia}
                  </span>
                )}
              </P>
            </Col>
            <Col md={4}>{ret.obs}</Col>
            <Col md={1} className='text-center'>
              {ret.doc}
            </Col>
            <Col md={1} className='text-center'>
              {ret.situacao}
            </Col>
            <Col md={1} className='text-center'>
              {ret.carater}
            </Col>
          </Row>
        );
      }
    });
  }

  return (
    <>
      <h1>Busca de protocolo</h1>
      <FormSearch>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={onSubmit} schema={schema} style={{ width: '100%' }}>
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
                    style={{ marginTop: 10 }}
                  />
                </Col>
                <Col md={6}>
                  <Button type='submit' className='form-control'>
                    Buscar
                  </Button>
                </Col>
              </Row>
            </Form>
            {returnBusca && (
              <DivResultado>
                <Col md={12} className='text-left'>
                  {protocolo && (
                    <div
                      style={{
                        color: '#ff0000',
                        margin: '20px 0',
                        fontWeight: 'bold',
                      }}
                    >
                      Protocolo: {protocolo}
                    </div>
                  )}

                  {protocolo && !returnBusca.length ? (
                    <Alert variant='danger' className='text-center'>
                      Nenhum protocolo encontrado para esta busca
                    </Alert>
                  ) : (
                    ''
                  )}

                  <Col md={12}>
                    <div id='return-busca'>{showReturnBusca}</div>
                  </Col>
                </Col>
              </DivResultado>
            )}
          </>
        )}
      </FormSearch>
    </>
  );
};

export default Busca;
