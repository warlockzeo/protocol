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
  const listProtocolos = async (
    origem = '',
    destino = '',
    situacao,
    carater = '',
    copia = '',
  ) => {
    try {
      const response = await axios({
        method: 'post',
        responseType: 'json',
        url: SIGNUP_ENDPOINT,
        data: JSON.stringify({
          option: 'list',
          body: { origem, destino, situacao, carater, copia },
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
        className='bg-danger'
        onClick={() =>
          listProtocolos(
            '',
            actualUser.reg,
            'Em trânsito',
            'Documento com Prazo',
          )
        }
        btn={{ show: true, recebido: true }}
      />
      <AccordionCard
        accordionKey='1'
        title='Cópia de Protocolos a Receber'
        data={list}
        onClick={() =>
          listProtocolos('', actualUser.reg, 'Em trânsito', '', 'copia')
        }
        btn={{ show: true, recebido: true }}
      />
      <AccordionCard
        accordionKey='2'
        title='Protocolos a Receber'
        data={list}
        onClick={() => listProtocolos('', actualUser.reg, 'Em trânsito', '')}
        btn={{ show: true, recebido: true }}
      />
      <AccordionCard
        accordionKey='3'
        title='Protocolos Recebidos'
        data={list}
        onClick={() => listProtocolos('', actualUser.reg, 'Recebido', '')}
        btn={{
          show: true,
          arquivado: true,
          encaminhado: true,
          analise: true,
          concluido: true,
        }}
      />
      <AccordionCard
        accordionKey='4'
        title='Protocolos em Análise'
        data={list}
        onClick={() =>
          listProtocolos('', actualUser.reg, 'Processo em análise', '')
        }
        btn={{
          show: true,
          arquivado: true,
          encaminhado: true,
          concluido: true,
        }}
      />
      <AccordionCard
        accordionKey='5'
        title='Protocolos Enviados - Interno'
        data={
          Array.isArray(list)
            ? list.filter((protocolo) => !isNaN(protocolo?.destino * 1))
            : list
        }
        onClick={() => listProtocolos(actualUser.reg, '', 'Em trânsito', '')}
      />
      <AccordionCard
        accordionKey='6'
        title='Protocolos Enviados - Externo'
        data={
          Array.isArray(list)
            ? list.filter((protocolo) => isNaN(protocolo?.destino))
            : list
        }
        onClick={() => listProtocolos(actualUser.reg, '', 'Em trânsito', '')}
        btn={{
          show: true,
          concluido: true,
        }}
      />
      {actualUser.nivel >= 10 && (
        <>
          <AccordionCard
            accordionKey='8'
            title='Todos os Protocolos em Trânsito'
            data={list}
            className='bg-success'
            onClick={() => listProtocolos('', '', 'Em trânsito', '')}
          />
          <AccordionCard
            accordionKey='9'
            title='Todos Protocolos Recebidos'
            data={list}
            className='bg-success'
            onClick={() => listProtocolos('', '', 'Recebido', '')}
          />
        </>
      )}
    </Accordion>
  );
};

export default Home;
