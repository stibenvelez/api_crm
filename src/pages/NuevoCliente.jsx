import React from 'react'
import Formulario from '../components/Formulario';

const NuevoCliente = () => {
  const cliente ={}
  return (
      <>
          <h1 className="text-4xl font-black text-blue-900">Nuevo Cliente</h1>
          <p className="mt-3">
              Llena los siguientes campos para registrar un cliente{" "}
          </p>
      <Formulario cliente={cliente}/>
      </>
  );
}

export default NuevoCliente;