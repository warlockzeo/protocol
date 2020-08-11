import React from 'react';
import { Alert, Button } from 'react-bootstrap';

function FormUnblockUser({ onCancel, handleUnblock, user }) {
  return (
    <Alert variant='warning' className='text-center'>
      <p>Confirma que quer desbloquear o usuario {user.nome}?</p>
      <Button
        className='buttonMargim'
        variant='success'
        onClick={handleUnblock}
      >
        Confirmar
      </Button>
      <Button className='buttonMargim' variant='danger' onClick={onCancel}>
        Cancelar
      </Button>
    </Alert>
  );
}

export default FormUnblockUser;
