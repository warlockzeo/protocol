import React from 'react';
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import Styled from 'styled-components';

const ButtonsBar = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = Styled.button`
  margin: 10px;
`;

const ConfirmDelete = props => (
  <>
    <Card style={{ width: 400, maxWidth: '90%', margin: 'auto' }}>
      <CardBody>
        <CardTitle>
          <h1>Excluir Veículo</h1>
        </CardTitle>
        <CardText>
          Confirma exclusão
          {props.info}?
        </CardText>
        <ButtonsBar>
          <Button onClick={props.onDelete} className="btn btn-success form-control">
            Sim
          </Button>
          <Button onClick={props.onCancel} className="btn btn-danger form-control">
            Não
          </Button>
        </ButtonsBar>
      </CardBody>
    </Card>
  </>
);

export default ConfirmDelete;
