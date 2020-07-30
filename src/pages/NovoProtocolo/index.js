import React, { useState } from 'react';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import Styled from 'styled-components';
import * as Yup from 'yup';
//import Select from '../../components/Select';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
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
`;

const NovoProtocolo = () => {
  const [comCopia, setComCopia] = useState(false);
  const [tipoCarater, setTipoCarater] = useState('');

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChangeField = (e) => {
    //console.log(e.currentTarget.value);
  };

  return (
    <>
      <h1>Cadastro de Novo Protocolo</h1>
      <FormCadastro>
        <Form onSubmit={onSubmit} schema={schema}>
          <Row>
            <Col md={3}>
              <label>Origem: </label>
              <Select
                options={options}
                name='origem'
                id='origem'
                onChange={onChangeField}
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
              <Select options={options} name='destino' id='destino' />
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
                <Select
                  isMulti
                  name='copia'
                  id='copia'
                  options={options}
                  className='basic-multi-select'
                  classNamePrefix='select'
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
                  { label: 'Normal', value: 'normal' },
                  { label: 'Urgente', value: 'urgente' },
                  { label: 'Documento com prazo', value: 'doccomprazo' },
                  { label: 'Outros', value: 'outros' },
                ]}
                name='carater'
                id='carater'
                onChange={(e) => setTipoCarater(e.target.value)}
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
                name='documento'
                id='oficio'
                value='Ofício'
              />
              <label htmlFor='oficio'>Ofício</label>
              <input
                type='checkbox'
                name='documento'
                id='requisicao'
                value='Requisição'
              />
              <label htmlFor='requisicao'>Requisição</label>
              <input type='checkbox' name='documento' id='pl' value='PL' />
              <label htmlFor='pl'>PL</label>
              <input
                type='checkbox'
                name='documento'
                id='declaracao'
                value='Declaração'
              />
              <label htmlFor='declaracao'>Declaração</label>
              <input
                type='checkbox'
                name='documento'
                id='portaria'
                value='Portaria'
              />
              <label htmlFor='portaria'>Portaria</label>
              <input
                type='checkbox'
                name='documento'
                id='outros'
                value='Outros'
              />
              <label htmlFor='outros'>Outros</label>
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
      </FormCadastro>
    </>
  );
};

export default NovoProtocolo;
