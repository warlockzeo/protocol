import React from 'react';
import { Accordion } from 'react-bootstrap';

import AccordionCard from '../../components/AccordionCard';

const Home = () => {
  return (
    <Accordion>
      <AccordionCard
        accordionKey='0'
        title='Protocolos com prazo'
        data='hghghghg'
        className='bg-primary'
      />
      <AccordionCard
        accordionKey='1'
        title='Cópia de Protocolos a Receber'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='2'
        title='Protocolos a Receber'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='3'
        title='Protocolos Recebidos'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='4'
        title='Protocolos em Análise'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='5'
        title='Protocolos Enviados - Interno'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='6'
        title='Protocolos Enviados - Externo'
        data='hghghghg'
      />
      <AccordionCard
        accordionKey='7'
        title='Protocolos Arquivados e Concluídos'
        data='hghghghg'
        className='bg-warning'
      />
      <AccordionCard
        accordionKey='8'
        title='Todos os Protocolo sem Trânsito'
        data='hghghghg'
        className='bg-success'
      />
      <AccordionCard
        accordionKey='9'
        title='Todos Protocolos Recebidos'
        data='hghghghg'
        className='bg-success'
      />
    </Accordion>
  );
};

export default Home;
