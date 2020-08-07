import React from 'react';
import { Alert, Button } from 'react-bootstrap';

function FormBlockUser({ handleBlock, onCancel, user }) {
  return (
    <Alert variant='danger' className='text-center'>
      <p>Confirma que quer bloquear o usuario {user.nome}?</p>
      <Button className='buttonMargim' variant='success' onClick={handleBlock}>
        Confirmar
      </Button>
      <Button className='buttonMargim' variant='danger' onClick={onCancel}>
        Cancelar
      </Button>
    </Alert>
  );
}

export default FormBlockUser;
