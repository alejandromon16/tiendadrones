import { data } from '@/data/data';
import React from 'react';
import { FaShoppingBag, FaUserCircle } from 'react-icons/fa';

const Top20Ofertantes = () => {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll shadow-md'>
      <h1>Top 20 Ofertantes</h1>
      <ul>
        {data.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className='bg-gray-200 rounded-lg p-3'>
              <span className='text-gray-600 p-2'>#{id +1}</span>
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>{order.name.first} {order.name.last}</p>
              <p className='text-gray-400 text-sm'>{order.phoneNumber}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top20Ofertantes;