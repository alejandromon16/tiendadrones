import { data } from '@/data/data';
import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const RecentOrders = ({reservations}) => {
  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll shadow-md'>
      <h1>Ultimas Ventas</h1>
      <ul>
        {reservations.docs.map((doc, id) => {
          const order = doc.data();
          return (
            <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'
          >
            <div className='bg-gray-200 rounded-lg p-3'>
              <FaShoppingBag className='text-gray-600' />
            </div>
            <div className='pl-4'>
              <p className='text-gray-800 font-bold'>Bs {order.payAmount}</p>
              <p className='text-gray-400 text-sm'>{order.clientName}</p>
            </div>
            <p className='lg:flex md:hidden absolute right-6 text-sm'>hace 5 minutos</p>
          </li>
          )
        })}
      </ul>
    </div>
  );
};

export default RecentOrders;