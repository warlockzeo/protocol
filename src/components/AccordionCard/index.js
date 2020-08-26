import React from 'react';
import { Table, Button, Accordion, Card } from 'react-bootstrap';
import moment from 'moment';
import Styled from 'styled-components';

const P = Styled.p`
  margin-bottom: 0;
`;

const A = Styled.a`
  font-weight: bold;
`;

const TD = Styled.td`
  vertical-align: middle !important;
  width: 10%;
  max-width: 100px;
`;

const TD2 = Styled.td`
  vertical-align: middle !important;
  width: 20%;
  max-width: 100px;
`;
const validateDate = (data) => {
  const d1 = new Date(data);
  const d2 = new Date();
  const d3 = d1 - d2;
  const dias = Math.round(d3 / 1000 / 60 / 60 / 24);
  return dias;
};

const AccordionCard = ({
  accordionKey,
  title,
  className,
  data,
  onClick,
  btn = {},
}) => {
  let items = data;
  if (Array.isArray(data) && data.length > 0) {
    items = data.map((protocolo) => {
      const date = moment(protocolo.data);
      return (
        <tr
          key={protocolo.reg}
          className={
            protocolo.prazo &&
            protocolo.prazo !== '0000-00-00' &&
            'table-danger'
          }
        >
          <TD className='text-center'>
            <A href={protocolo.protocolo}>{protocolo.protocolo}</A>
          </TD>
          <TD className='text-center'>
            {date.format('DD/MM/YYYY, h:mm:ss a')}
          </TD>
          <TD2>
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
              {protocolo.portador && (
                <>
                  <br />
                  <strong>Por: </strong> {protocolo.portador} /{protocolo.mat}
                </>
              )}
              {protocolo.copia &&
                (protocolo.copia === 'copia' ? (
                  <strong>- Cópia</strong>
                ) : (
                  <strong>- Cópias para: {protocolo.copia}</strong>
                ))}
            </P>
          </TD2>
          <TD2>{protocolo.obs}</TD2>
          <TD className='text-center'>{protocolo.doc}</TD>
          <TD className='text-center'>{protocolo.situacao}</TD>
          {protocolo.carater && (
            <TD className='text-center'>
              {protocolo.carater}{' '}
              {protocolo.prazo && protocolo.prazo !== '0000-00-00' && (
                <>
                  <br />
                  {validateDate(protocolo.prazo)} dias
                </>
              )}
            </TD>
          )}
          {btn.show && (
            <TD className='text-center' style={{ width: '16%', maxWidth: 100 }}>
              {btn.recebido && (
                <Button
                  variant='primary'
                  type='submit'
                  className='form-control'
                >
                  Recebido
                </Button>
              )}
              {btn.arquivado && (
                <Button variant='info' type='submit' className='form-control'>
                  Arquivado
                </Button>
              )}
              {btn.encaminhado && (
                <Button
                  variant='secondary'
                  type='submit'
                  className='form-control'
                >
                  Encaminhado
                </Button>
              )}
              {btn.analise && (
                <Button
                  variant='warning'
                  type='submit'
                  className='form-control'
                >
                  Processo em Análise
                </Button>
              )}
              {btn.concluido && (
                <Button
                  variant='success'
                  type='submit'
                  className='form-control'
                >
                  Processo Concluído
                </Button>
              )}
            </TD>
          )}
        </tr>
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
          <>
            <Table hover responsive>
              {items}
            </Table>
          </>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
