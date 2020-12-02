/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
const tokenJwt = sessionStorage.getItem('access_token');
const actualUser = tokenJwt && jwt(tokenJwt).data;

const schema = Yup.object().shape({
  origem: Yup.string().required('Selecione uma origem'),
  dep_origem: Yup.string(),
  destino: Yup.string().required('Selecione um destino'),
  dep_destino: Yup.string(),
  comCopia: Yup.string(),
  copia: Yup.string(),
  portador: Yup.string(),
  mat: Yup.string(),
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
  const { reg } = useParams();
  const [comCopia, setComCopia] = useState(false);
  const [tipoCarater, setTipoCarater] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [documentoValues, setDocumentoValues] = useState([]);
  const [errorForm, setErrorForm] = useState('');
  const [novoProtocolo, setNovoProtocolo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [origens, setOrigens] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [protocolo, setProtocolo] = useState('');
  const [title, setTitle] = useState('Novo');
  const storage = useSelector((state) => state);

  const onSubmit = async (data) => {
    if (documentoValues.length) {
      setIsLoading(true);
      try {
        if (reg) {
          console.log(reg);
          const newData = {
            ...data,
            copia: multiSelectValue,
            documento: documentoValues,
            reg,
            protocolo: protocolo.protocolo,
            origem: actualUser.reg,
            //dep_origem: '',
          };

          await axios({
            method: 'post',
            responseType: 'json',
            url: PROTOCOL_ENDPOINT,
            data: JSON.stringify({
              option: title === 'Editar' ? 'edit' : 'resend',
              body: { ...newData },
            }),
          });
          setTimeout(() => {
            sessionStorage.removeItem('protocolo');
            window.open(`/`, '_self');
          }, 1500);
        } else {
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
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
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
    const eCurValue = Number.isInteger(e * 1) ? e : e?.currentTarget?.value;
    if (actualUser.nivel >= 10) {
      setDestinos(origens.filter((origem) => origem.id !== eCurValue));
    } else if (actualUser.nivel < 10 && eCurValue === actualUser.reg) {
      setDestinos(origens.filter((origem) => origem.id !== eCurValue));
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
    const dataOrigens = storage?.users
      ? [
          { id: '.', title: '::: INTERNO :::' },
          ...storage.users
            .filter((user) => user.nivel > 0)
            .map((user) => ({
              id: user.id,
              title: user.nome,
            })),
          { id: '..', title: '::: EXTERNO :::' },
          ...optionsOrigemDestinoExterno,
        ]
      : origens;
    setOrigens(dataOrigens);

    if (reg) {
      const storageProtocolo = JSON.parse(sessionStorage.getItem('protocolo'));
      setProtocolo(storageProtocolo);
      setDestinos(dataOrigens.filter((origem) => origem.id !== actualUser.reg));

      const url = window.location.href.split('/');
      setTitle(url[3].charAt(0).toUpperCase() + url[3].slice(1));
    }
  }, [storage.users]);

  return (
    <>
      <h1>{`${title} protocolo ${
        !!protocolo.protocolo ? protocolo.protocolo : ''
      }`}</h1>
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
          <Form
            onSubmit={onSubmit}
            schema={schema}
            // initialData={reg && { origem: actualUser.reg }}
            initialData={protocolo}
          >
            <Row>
              {!reg ? (
                <>
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
                      name='dep_origem'
                      id='dep_origem'
                      placeholder='Dep. origem.  Opcional'
                    />
                  </Col>
                </>
              ) : (
                <Input type='hidden' name='origem' id='origem' />
              )}
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
                  name='dep_destino'
                  id='dep_destino'
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
                    options={destinos
                      .filter((destino) => destino.id !== actualUser.reg)
                      .map((destino) => ({
                        value: destino.id,
                        label: destino.title,
                      }))}
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
                  name='portador'
                  id='portador'
                  placeholder='Nome do portador'
                />
              </Col>
              <Col md={3}>
                <label>Portador Matrícula: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='mat'
                  id='mat'
                  placeholder='Matrícula do portador'
                />
              </Col>
              <Col md={3}>
                <label>Caráter: </label>
                <Select
                  options={[
                    { title: 'Normal', id: 'Normal' },
                    { title: 'Urgente', id: 'Urgente' },
                    { title: 'Documento com prazo', id: 'Documento com Prazo' },
                    { title: 'Outros', id: 'outros' },
                  ]}
                  name='carater'
                  id='carater'
                  onChange={(e) => setTipoCarater(e.target.value)}
                  className='form-control'
                  defaultValue='normal'
                />
              </Col>
              {tipoCarater === 'Documento com Prazo' && (
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
