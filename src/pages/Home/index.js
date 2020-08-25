import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import axios from 'axios';
import jwt from 'jwt-decode';

import AccordionCard from '../../components/AccordionCard';

const SIGNUP_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/protocolos`;
const tokenJwt = localStorage.getItem('access_token');
const actualUser = tokenJwt && jwt(tokenJwt).data;

const Home = () => {
  const [list, setList] = useState([]);
  const listProtocolos = async (id, situacao, carater = '', copia = '') => {
    try {
      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          option: 'list',
          body: { id, situacao, carater, copia },
        }),
      });
      setList(response.data);
    } catch (e) {
      setList('Nenhum protocolo encontrado');
      console.log(e);
    }
  };

  return (
    <Accordion className='container'>
      <AccordionCard
        accordionKey='0'
        title='Protocolos com prazo'
        data={list}
        className='bg-primary'
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      <AccordionCard
        accordionKey='1'
        title='Cópia de Protocolos a Receber'
        data={list}
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', '', 'copia')
        }
      />
      <AccordionCard
        accordionKey='2'
        title='Protocolos a Receber'
        data={list}
        onClick={() => listProtocolos(actualUser.reg, 'Em trânsito', '')}
      />
      <AccordionCard
        accordionKey='3'
        title='Protocolos Recebidos'
        data={list}
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      <AccordionCard
        accordionKey='4'
        title='Protocolos em Análise'
        data={list}
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      <AccordionCard
        accordionKey='5'
        title='Protocolos Enviados - Interno'
        data={list}
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      <AccordionCard
        accordionKey='6'
        title='Protocolos Enviados - Externo'
        data={list}
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      <AccordionCard
        accordionKey='7'
        title='Protocolos Arquivados e Concluídos'
        data={list}
        className='bg-warning'
        onClick={() =>
          listProtocolos(actualUser.reg, 'Em trânsito', 'Documento com Prazo')
        }
      />
      {actualUser.nivel >= 10 && (
        <>
          <AccordionCard
            accordionKey='8'
            title='Todos os Protocolo sem Trânsito'
            data={list}
            className='bg-success'
            onClick={() =>
              listProtocolos(
                actualUser.reg,
                'Em trânsito',
                'Documento com Prazo',
              )
            }
          />
          <AccordionCard
            accordionKey='9'
            title='Todos Protocolos Recebidos'
            data={list}
            className='bg-success'
            onClick={() =>
              listProtocolos(
                actualUser.reg,
                'Em trânsito',
                'Documento com Prazo',
              )
            }
          />
        </>
      )}
    </Accordion>
  );
};

export default Home;
