/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import Styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
import Loader from '../../components/Loader';

const schema = Yup.object().shape({
  secretaria: Yup.string().required('Selecione uma secretaria'),
  status: Yup.string().required('Selecione o status dos protocolos'),
  de: Yup.string().required('Selecione uma data inicial'),
  ate: Yup.string().required('Selecione uma data final'),
});

const secretariasOptions = [
  { id: 'Correios', title: 'Correios' },
  { id: 'Câmara', title: 'Câmara' },
  { id: 'TCE', title: 'TCE' },
  { id: 'Fórum TJ', title: 'Fórum TJ' },
  { id: 'Sindicato', title: 'Sindicato' },
  { id: 'Compesa', title: 'Compesa' },
  { id: 'Celpe', title: 'Celpe' },
  { id: 'Polícia Militar', title: 'Polícia Militar' },
  { id: 'Polícia Civil', title: 'Polícia Civil' },
  { id: 'Igrejas', title: 'Igrejas' },
  { id: 'Banco Real', title: 'Banco Real' },
  { id: 'Banco do Brasil', title: 'Banco do Brasil' },
  { id: 'CEF', title: 'CEF' },
  { id: 'Conselho Tutelar', title: 'Conselho Tutelar' },
];

const options = [
  { id: 'Todos', title: 'Todos' },
  { id: 'Enviados', title: 'Enviados' },
  { id: 'Recebidos', title: 'Recebidos' },
  { id: 'Em trânsito', title: 'Em trânsito' },
  { id: 'Em análise', title: 'Em análise' },
];

const FormReport = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 600px) {
    padding: 0 100px;
  }
`;

const Relatorio = () => {
  const [secretarias, setSecretarias] = useState([]);
  const [returnBusca, setReturnBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const storage = useSelector((state) => state);

  const onSubmit = (data) => {
    setIsLoading(true);
    try {
      const resp = {
        ...data,
      };
      setReturnBusca(resp);
      console.log(resp);
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const onChangeField = (e) => {
    //console.log(e.currentTarget.value);
  };

  useEffect(() => {
    const dataSecretarias = storage?.users
      ? [
          { id: 'Todos', title: 'Todos' },
          { id: '.', title: '::: INTERNO :::' },
          ...storage.users
            .filter((user) => user.nivel > 0)
            .map((user) => ({
              id: user.id,
              title: user.nome,
            })),
          { id: '..', title: '::: EXTERNO :::' },
          ...secretariasOptions,
        ]
      : secretarias;
    setSecretarias(dataSecretarias);
  }, [storage]);

  const initialData = {
    secretaria: { id: 'Todos', title: 'Todos' },
    status: { id: 'Todos', title: 'Todos' },
  };
  return (
    <>
      <h1>Relatórios</h1>
      <FormReport>
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmit} schema={schema} initialData={initialData}>
            <Row>
              <Col md={3}>
                <label>Secretaria: </label>
                <Select
                  options={secretarias}
                  name='secretaria'
                  id='secretaria'
                  onChange={onChangeField}
                  className='form-control'
                />
              </Col>
              <Col md={3}>
                <label>.</label>
                <Select
                  options={options}
                  name='status'
                  id='status'
                  onChange={onChangeField}
                  className='form-control'
                />
              </Col>
              <Col md={3}>
                <label>De: </label>
                <Input
                  className='form-control'
                  type='date'
                  name='de'
                  id='de'
                  placeholder='Data inicial'
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
              <Col md={3}>
                <label>Até: </label>
                <Input
                  className='form-control'
                  type='date'
                  name='ate'
                  id='ate'
                  placeholder='Data final'
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
            </Row>
            <Button type='submit' className='form-control'>
              Gerar Relatório
            </Button>
          </Form>
        )}
        {returnBusca && 'Resultado do relatório'}
      </FormReport>
    </>
  );
};

export default Relatorio;
