import React from 'react';
import { useSelector } from 'react-redux';
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

const SPAN = Styled.span`
  cursor: pointer;

  :hover {
    color: #ffffff;
    font-weight: bold;
    text-shadow: 0 0 2px #000;
  }
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
  callBack,
  encaminhamentoClick,
}) => {
  const storage = useSelector((state) => state);

  const btnClick = (reg, situacao) => callBack(reg, situacao);

  let items = data;

  if (Array.isArray(data) && data.length > 0) {
    items = data.map((protocolo) => {
      const {
        reg,
        origem,
        origemNome,
        dep_origem,
        destino,
        destinoNome,
        dep_destino,
        portador,
        mat,
        copia,
        data,
        obs,
        doc,
        situacao,
        carater,
        prazo,
      } = protocolo;
      const protocolNumber = protocolo.protocolo;

      const copiaNames =
        copia !== 'copia' &&
        copia
          .split(',')
          .map((c) => {
            const userName = storage.users.filter((user) => user.id === c);
            return userName[0]?.nome;
          })
          .join(', ');

      const date = moment(data);

      return (
        <tr
          key={reg}
          className={prazo && prazo !== '0000-00-00' && 'table-danger'}
        >
          <TD className='text-center'>
            <A href={`/busca/${protocolNumber}`}>{protocolNumber}</A>
          </TD>
          <TD className='text-center'>
            {date.format('DD/MM/YYYY, h:mm:ss a')}
          </TD>
          <TD2>
            <P>
              <strong>De: </strong>
              {!!origemNome ? origemNome : origem}
              {!!dep_origem && ` - ${dep_origem}`}
              <br />
              <strong>Para: </strong>
              {!!destinoNome ? destinoNome : destino}
              {!!dep_destino && ` - ${dep_destino}`}
              <br />
              {!!portador && (
                <>
                  <strong>Por: </strong> {portador} / {mat}
                  <br />
                </>
              )}
              {copia &&
                (copia === 'copia' ? (
                  <strong>Cópia</strong>
                ) : (
                  <>
                    <strong>Cópias para: </strong>
                    {copiaNames}
                  </>
                ))}
            </P>
          </TD2>
          <TD2>{obs}</TD2>
          <TD className='text-center'>{doc}</TD>
          <TD className='text-center'>{situacao}</TD>
          {carater && (
            <TD className='text-center'>
              {carater}{' '}
              {prazo && prazo !== '0000-00-00' && (
                <>
                  <br />
                  {validateDate(prazo)} dias
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
                  onClick={() => btnClick(reg, 'Recebido')}
                >
                  Receber
                </Button>
              )}
              {btn.arquivado && (
                <Button
                  variant='info'
                  type='submit'
                  className='form-control'
                  onClick={() => btnClick(reg, 'Arquivado')}
                >
                  Arquivar
                </Button>
              )}
              {btn.encaminhado && (
                <Button
                  variant='secondary'
                  type='submit'
                  className='form-control'
                  onClick={() => encaminhamentoClick(protocolo)}
                >
                  Encaminhar
                </Button>
              )}
              {btn.analise && (
                <Button
                  variant='warning'
                  type='submit'
                  className='form-control'
                  onClick={() => btnClick(reg, 'Processo em análise')}
                >
                  Analisar Processo
                </Button>
              )}
              {btn.concluido && (
                <Button
                  variant='success'
                  type='submit'
                  className='form-control'
                  onClick={() => btnClick(reg, 'Processo concluído')}
                >
                  Concluir Processo
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
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
      >
        <SPAN>{title}</SPAN>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={accordionKey}>
        <Card.Body>
          <>
            <Table hover responsive>
              <tbody>{items}</tbody>
            </Table>
          </>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AccordionCard;
