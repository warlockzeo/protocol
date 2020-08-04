import React, { useState } from 'react';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import Styled from 'styled-components';
import * as Yup from 'yup';
import MultiSelect from 'react-select';
import Loader from '../../components/Loader';

const options = [
  { id: 'chocolate', title: 'Chocolate' },
  { id: 'strawberry', title: 'Strawberry' },
  { id: 'vanilla', title: 'Vanilla' },
];

const schema = Yup.object().shape({
  origem: Yup.string(),
  origemDepartamento: Yup.string(),
  destino: Yup.string(),
  destinoDepartamento: Yup.string(),
  comCopia: Yup.string(),
  copia: Yup.string(),
  portadorNome: Yup.string(),
  portadorMatricula: Yup.string(),
  carater: Yup.string(),
  prazo: Yup.string(),
  caraterOutros: Yup.string(),
  documento: Yup.string(),
  obs: Yup.string(),
  //destino: Yup.string().required('Precisa informar um protocolo para busca'),
});

const FormCadastro = Styled.div`
  flex: 1;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [novoProtocolo, setNovoProtocolo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    try {
      const resp = {
        ...data,
        copia: multiSelectValue,
        documento: documentoValues,
      };
      console.log(resp);
      setNovoProtocolo('novo');
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  };

  const onChangeField = (e) => {
    //console.log(e.currentTarget.value);
  };

  const onChangeMultiSelect = (eventValues) => {
    const values = eventValues.map((eventValue) => eventValue.value);
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

  return (
    <>
      <h1>Cadastro de Novo Protocolo</h1>
      <FormCadastro>
        {isLoading ? (
          <Loader />
        ) : novoProtocolo ? (
          <Alert variant='success' className='text-center'>
            Protocolo cadastrado com sucesso. <br />
            Seu protocolo é <Protocolo>{novoProtocolo}</Protocolo>
          </Alert>
        ) : (
          <Form onSubmit={onSubmit} schema={schema}>
            <Row>
              <Col md={3}>
                <label>Origem: </label>
                <Select
                  options={options}
                  name='origem'
                  id='origem'
                  onChange={onChangeField}
                  className='form-control'
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
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
              <Col md={3}>
                <label>Destino: </label>
                <Select
                  options={options}
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
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
              <Col md={3}>
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
              <Col md={5}>
                <label>Portador Nome: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='portadorNome'
                  id='portadorNome'
                  placeholder='Nome do portador'
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
              <Col md={4}>
                <label>Portador Matrícula: </label>
                <Input
                  className='form-control'
                  type='text'
                  name='portadorMatricula'
                  id='portadorMatricula'
                  placeholder='Matrícula do portador'
                  onChange={onChangeField}
                  onFocus={onChangeField}
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
                />
              </Col>
              {tipoCarater === 'doccomprazo' && (
                <Col md={4}>
                  <label>Prazo: </label>
                  <Input
                    className='form-control'
                    type='date'
                    name='prazo'
                    id='prazo'
                    placeholder=''
                    onChange={onChangeField}
                    onFocus={onChangeField}
                  />
                </Col>
              )}

              {tipoCarater === 'outros' && (
                <Col md={5}>
                  <label>Outros: </label>
                  <Input
                    className='form-control'
                    type='text'
                    name='caraterOutros'
                    id='caraterOutros'
                    placeholder=''
                    onChange={onChangeField}
                    onFocus={onChangeField}
                  />
                </Col>
              )}
              <Col md={8}>
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
                  onChange={onChangeField}
                  onFocus={onChangeField}
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
