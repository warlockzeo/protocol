import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import Styled from 'styled-components';
import * as Yup from 'yup';

import Loader from '../../components/Loader';

const schema = Yup.object().shape({
  secretaria: Yup.string().required('Selecione uma secretaria'),
});

const secretarias = [
  { id: 'chocolate', title: 'Chocolate' },
  { id: 'strawberry', title: 'Strawberry' },
  { id: 'vanilla', title: 'Vanilla' },
];

const options = [
  { id: 'Todos', title: 'Todos' },
  { id: 'Enviados', title: 'Enviados' },
  { id: 'Recebidos', title: 'Recebidos' },
  { id: 'Em trânsito', title: 'Em trânsito' },
  { id: 'Em análise', title: 'Em análise' },
];

const FormCadastro = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 600px) {
    padding: 0 100px;
  }
`;

const Relatorio = () => {
  const [returnBusca, setReturnBusca] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <>
      <h1>Relatórios</h1>
      <FormCadastro>
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmit} schema={schema}>
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
                  name='origem'
                  id='origem'
                  onChange={onChangeField}
                  className='form-control'
                  value='Todos'
                />
              </Col>
              <Col md={3}>
                <label>De: </label>
                <Input
                  className='form-control'
                  type='date'
                  name='destinoDepartamento'
                  id='destinoDepartamento'
                  placeholder='Dep. destino.  Opcional'
                  onChange={onChangeField}
                  onFocus={onChangeField}
                />
              </Col>
              <Col md={3}>
                <label>Até: </label>
                <Input
                  className='form-control'
                  type='date'
                  name='destinoDepartamento'
                  id='destinoDepartamento'
                  placeholder='Dep. destino.  Opcional'
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

export default Relatorio;
