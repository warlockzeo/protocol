import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
import moment from 'moment';
import Styled from 'styled-components';

const P = Styled.p`
  margin-bottom: 0;
`;

const AccordionCard = ({ accordionKey, title, className, data, onClick }) => {
  let items = data;
  if (Array.isArray(data) && data.length > 0) {
    items = data.map((protocolo) => {
      const date = moment(protocolo.data);
      return (
        <Row key={protocolo.reg} className='return-busca-head'>
          <Col md={1} className='text-center'>
            <a href={protocolo.protocolo}>{protocolo.protocolo}</a>
          </Col>
          <Col md={1} className='text-center'>
            {date.format('DD/MM/YYYY, h:mm:ss a')}
          </Col>
          <Col md={3}>
            <P>
              <strong>De:</strong>{' '}
              {!!protocolo.origemNome ? protocolo.origemNome : protocolo.origem}{' '}
              - {protocolo.dep_origem}
              <br />
              <strong>Para: </strong>
              {!!protocolo.destinoNome
                ? protocolo.destinoNome
                : protocolo.destino}{' '}
              - {protocolo.dep_destino}
              <br />
              <strong>Por: </strong> {protocolo.portador} /{protocolo.mat}
              <br />
              <strong>Cópias para:</strong> {protocolo.copia}
            </P>
          </Col>
          <Col md={3}>{protocolo.obs}</Col>
          <Col md={1} className='text-center'>
            {protocolo.doc}
          </Col>
          <Col md={1} className='text-center'>
            {protocolo.situacao}
          </Col>
          <Col md={1} className='text-center'>
            {protocolo.carater} Validade
          </Col>
          <Col md={1} className='text-center'>
            <Button type='submit'>Recebido</Button>
          </Col>
        </Row>
      );
    });
  }

  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={accordionKey}
        className={className}
        onClick={onClick}
      >
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionKey}>
        <Card.Body>
          <>{items}</>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
