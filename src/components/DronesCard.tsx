import React from 'react';
import {
  Image
} from "@chakra-ui/react"

export const DronesCard = ({ name, providerName, status, stock, imageUrl, onClick }) => {
  const role = sessionStorage.getItem('role')
  const statusColors = {
    Activo: { dotColor: 'bg-green-500', textColor: 'text-green-800' },
    Cerrado: { dotColor: 'bg-red-500', textColor: 'text-red-800' },
    Mantenimiento: { dotColor: 'bg-yellow-500', textColor: 'text-yellow-800' },
    Completo: { dotColor: 'bg-gray-500', textColor: 'text-gray-800' }
  };

  const { dotColor, textColor } = statusColors[status] || statusColors['Cerrado'];

  return (
    <div className={`bg-white shadow-lg rounded-lg p-5 cursor-pointer space-y-3 transition-transform duration-300 hover:scale-110 hover:opacity-75`} onClick={onClick}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <Image key="1" src={imageUrl} boxSize="400px" mr="2" borderRadius={20} backgroundColor="GrayText" />

      {role != 'provider' && (
        <p>Precio: {providerName} Bs</p>
      )}
      <p className="text-sm">Estado: {status}</p>
      <p className="text-sm">Stock: {stock}</p>
    </div>
  );
};
