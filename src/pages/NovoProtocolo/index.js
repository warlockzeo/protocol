/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import Styled from 'styled-components';
import * as Yup from 'yup';
import MultiSelect from 'react-select';
import axios from 'axios';
import jwt from 'jwt-decode';
import Loader from '../../components/Loader';

const PROTOCOL_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/protocolos`;
const tokenJwt = localStorage.getItem('access_token');
const actualUser = tokenJwt && jwt(tokenJwt).data;

const schema = Yup.object().shape({
  origem: Yup.string().required('Selecione uma origem'),
  origemDepartamento: Yup.string(),
  destino: Yup.string().required('Selecione um destino'),
  destinoDepartamento: Yup.string(),
  comCopia: Yup.string(),
  copia: Yup.string(),
  portadorNome: Yup.string(),
  portadorMatricula: Yup.string(),
  carater: Yup.string().required('Selecione o caráter'),
  prazo: Yup.string(),
  caraterOutros: Yup.string(),
  obs: Yup.string(),
});

const FormCadastro = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 600px) {
    padding: 0 20px;
  }
`;

const Protocolo = Styled.span`
  font-size: 2em;
  color: #ff0000;
  font-weight: bolder;
`;

const NovoProtocolo = () => {
  const [comCopia, setComCopia] = useState(false);
  const [tipoCarater, setTipoCarater] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [documentoValues, setDocumentoValues] = useState([]);
  const [errorForm, setErrorForm] = useState('');
  const [novoProtocolo, setNovoProtocolo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [origens, setOrigens] = useState([]);
  const [destinos, setDestinos] = useState([]);

  const counter = useSelector((state) => state);

  const onSubmit = async (data) => {
    if (documentoValues.length) {
      setIsLoading(true);
      try {
        const newData = {
          ...data,
          copia: multiSelectValue,
          documento: documentoValues,
        };

        const response = await axios({
          method: 'post',
          responseType: 'json',
          url: PROTOCOL_ENDPOINT,
          data: JSON.stringify({ option: 'add', body: { ...newData } }),
        });

        setNovoProtocolo(response.data.protocolo);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    } else {
      setErrorForm('Precisa selecionar um tipo de documento.');
    }
  };

  const onNewProtocol = () => {
    setNovoProtocolo('');
  };

  const onChangeMultiSelect = (eventValues) => {
    const values = eventValues.map((eventValue) => eventValue?.value);
    setMultiSelectValue(values);
  };

  const onChangeDocumentos = (e) => {
    const novoDocumento = e.currentTarget.value;
    let documentos = documentoValues;

    if (documentos.includes(novoDocumento)) {
      documentos = documentoValues.filter(
        (documento) => novoDocumento !== documento,
      );
    } else {
      documentos.push(novoDocumento);
    }
    setDocumentoValues(documentos);
  };

  const onChangeOrigem = (e) => {
    console.log(e.currentTarget.value);
    console.log(actualUser);
    if (actualUser.nivel >= 10) {
      setDestinos(
        origens.filter((origem) => origem.id !== e.currentTarget.value),
      );
    } else if (
      actualUser.nivel < 10 &&
      e.currentTarget.value === actualUser.reg
    ) {
      setDestinos(
        origens.filter((origem) => origem.id !== e.currentTarget.value),
      );
    } else {
      setDestinos(origens.filter((origem) => origem.id === actualUser.reg));
    }
  };

  const optionsOrigemDestinoExterno = [
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
    { id: 'Outros', title: 'Outros' },
  ];

  useEffect(() => {
    console.log(counter);
    setOrigens(
      counter?.users
        ? [
            { id: '', title: '::: INTERNO :::' },
            ...counter.users
              .filter((user) => user.nivel > 0)
              .map((user) => ({
                id: user.id,
                title: user.nome,
              })),
            { id: '', title: '::: EXTERNO :::' },
            ...optionsOrigemDestinoExterno,
          ]
        : origens,
    );
  }, [counter.users]);

  return (
    <>
      <h1>Novo Protocolo</h1>
      <FormCadastro>
        {isLoading ? (
          <Loader />
        ) : novoProtocolo ? (
          <Alert variant='success' className='text-center'>
            Protocolo cadastrado com sucesso. <br />
            Seu protocolo é <br />
            <Protocolo>{novoProtocolo}</Protocolo>
            <br />
            <Button variant='primary' onClick={onNewProtocol}>
              Gerar outro protocolo
            </Button>
          </Alert>
        ) : (
          <Form onSubmit={onSubmit} schema={schema}>
            <Row>
              <Col md={3}>
                <label>Origem: </label>
                <Select
                  options={origens}
                  name='origem'
                  id='origem'
                  className='form-control'
                  onChange={onChangeOrigem}
                />
              </Col>
              <Col md={3}>
                <label>Departamento: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='origemDepartamento'
                  id='origemDepartamento'
                  placeholder='Dep. origem.  Opcional'
                />
              </Col>
              <Col md={3}>
                <label>Destino: </label>
                <Select
                  options={destinos}
                  name='destino'
                  id='destino'
                  className='form-control'
                />
              </Col>
              <Col md={3}>
                <label>Departamento: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='destinoDepartamento'
                  id='destinoDepartamento'
                  placeholder='Dep. destino.  Opcional'
                />
              </Col>
              <Col md={6}>
                <label htmlFor='comCopia'>Enviar cópia: </label>
                <input
                  type='checkbox'
                  name='comCopia'
                  id='comCopia'
                  value='comCopia'
                  onClick={() => setComCopia(!comCopia)}
                />
                {comCopia && (
                  <MultiSelect
                    isMulti
                    name='copia'
                    id='copia'
                    options={[
                      { value: 'banana', label: 'Banana' },
                      { value: 'mamao', label: 'Mamão' },
                    ]}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    onChange={onChangeMultiSelect}
                  />
                )}
              </Col>
              <Col md={3}>
                <label>Portador Nome: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='portadorNome'
                  id='portadorNome'
                  placeholder='Nome do portador'
                />
              </Col>
              <Col md={3}>
                <label>Portador Matrícula: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='portadorMatricula'
                  id='portadorMatricula'
                  placeholder='Matrícula do portador'
                />
              </Col>
              <Col md={3}>
                <label>Caráter: </label>
                <Select
                  options={[
                    { title: 'Normal', id: 'normal' },
                    { title: 'Urgente', id: 'urgente' },
                    { title: 'Documento com prazo', id: 'doccomprazo' },
                    { title: 'Outros', id: 'outros' },
                  ]}
                  name='carater'
                  id='carater'
                  onChange={(e) => setTipoCarater(e.target.value)}
                  className='form-control'
                  defaultValue='normal'
                />
              </Col>
              {tipoCarater === 'doccomprazo' && (
                <Col md={3}>
                  <label>Prazo: </label>
                  <Input
                    className='form-control'
                    type='date'
                    name='prazo'
                    id='prazo'
                    placeholder=''
                  />
                </Col>
              )}

              {tipoCarater === 'outros' && (
                <Col md={3}>
                  <label>Outros: </label>
                  <Input
                    className='form-control'
                    type='text'
                    name='caraterOutros'
                    id='caraterOutros'
                    placeholder=''
                  />
                </Col>
              )}
              <Col md={6}>
                <label style={{ width: '100%' }}>Documento: </label>
                <input
                  type='checkbox'
                  name='docOficio'
                  id='docOficio'
                  value='Ofício'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docOficio'>Ofício</label>
                <input
                  type='checkbox'
                  name='docrequisicao'
                  id='docrequisicao'
                  value='Requisição'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docRequisicao'>Requisição</label>
                <input
                  type='checkbox'
                  name='docPl'
                  id='docPl'
                  value='PL'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docPl'>PL</label>
                <input
                  type='checkbox'
                  name='docDeclaracao'
                  id='docDeclaracao'
                  value='Declaração'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docDeclaracao'>Declaração</label>
                <input
                  type='checkbox'
                  name='docPortaria'
                  id='docPortaria'
                  value='Portaria'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docPortaria'>Portaria</label>
                <input
                  type='checkbox'
                  name='docOutros'
                  id='docOutros'
                  value='Outros'
                  onChange={onChangeDocumentos}
                />
                <label htmlFor='docOutros'>Outros</label>
                <p style={{ color: '#ff0000' }}>{errorForm}</p>
              </Col>
              <Col md={12}>
                <label>Obs: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='obs'
                  id='obs'
                  placeholder=''
                  multiline
                />
              </Col>
            </Row>
            <Button type='submit' className='form-control'>
              Gravar
            </Button>
          </Form>
        )}
      </FormCadastro>
    </>
  );
};

export default NovoProtocolo;
