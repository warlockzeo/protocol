import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Loader from '../../components/Loader';
import Styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

import ProtocolList from '../../components/ProtocolList';

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
  // @media only screen and (min-width: 600px) {
  //   padding: 0 100px;
  // }
`;

const DivResultado = Styled.div`
  width: 100%;
`;

const Busca = () => {
  const { protocol } = useParams();
  const [returnBusca, setReturnBusca] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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
      } else {
        setProtocolo('');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const onDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteYes = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({ option: 'delete', body: { protocolo: data } }),
      });
      if (response.data?.message === 'success') {
        setReturnBusca([]);
        setProtocolo('');
        setShowConfirmDelete(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const handleDeleteNo = () => {
    setShowConfirmDelete(false);
  };

  const onEdit = () => {
    sessionStorage.setItem('protocolo', JSON.stringify(returnBusca[0]));
    window.open(`/editar/${returnBusca[0].reg}`, '_self');
  };

  const onChangeField = () => {
    setReturnBusca([]);
    setProtocolo('');
  };

  useEffect(() => {
    if (protocol) {
      onSubmit({ search: protocol });
      //      console.log(protocol);
    }
  }, [protocol]);

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
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between !important',
                      }}
                    >
                      {showConfirmDelete ? (
                        <>
                          <Col
                            md={2}
                            style={{
                              color: '#ff0000',
                              margin: '20px 0',
                              fontWeight: 'bold',
                            }}
                          >
                            Confirma exclusão do protocolo {protocolo}
                          </Col>
                          <Col md={5}>
                            <Button
                              className='form-control btn btn-success'
                              onClick={() => {
                                handleDeleteYes(protocolo);
                              }}
                            >
                              Sim
                            </Button>
                          </Col>
                          <Col md={5}>
                            <Button
                              className='form-control btn btn-danger'
                              onClick={handleDeleteNo}
                            >
                              Não
                            </Button>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col
                            md={2}
                            style={{
                              color: '#ff0000',
                              margin: '20px 0',
                              fontWeight: 'bold',
                            }}
                          >
                            Protocolo: {protocolo}
                          </Col>
                          {returnBusca.length > 0 ? (
                            <>
                              <Col md={5}>
                                <Button
                                  className='form-control btn btn-danger'
                                  onClick={() => {
                                    onDelete();
                                  }}
                                >
                                  Excluir
                                </Button>
                              </Col>
                              {returnBusca.length === 1 ? (
                                <Col md={5}>
                                  <Button
                                    className='form-control btn btn-info'
                                    onClick={() => {
                                      onEdit(protocolo);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </Col>
                              ) : (
                                ''
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      )}
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
                    <ProtocolList data={returnBusca} />
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
