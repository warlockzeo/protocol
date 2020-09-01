import React from 'react';
import { useParams } from 'react-router-dom';

import NovoProtocolo from '../NovoProtocolo';

const Encaminhamento = () => {
  const { reg } = useParams();
  return (
    <>
      <NovoProtocolo reg={reg} />
    </>
  );
};

export default Encaminhamento;
