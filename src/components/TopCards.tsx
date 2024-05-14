import React from 'react'

const TopCards = ({clientsCount, providersCount, offersCount, reservationsCount}) => {
  return (
    <div className='grid lg:grid-cols-4 gap-4 p-4 w-full'>
        <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-md'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{clientsCount == 0 ? 2: clientsCount}</p>
                <p className='text-gray-600'>Clientes</p>
            </div>
            <p className='flex  bg-gray-100 justify-center items-center p-2 rounded-lg'>
                <span className='text-green-800 text-lg'>+18%</span>
            </p>
        </div>
        <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-md'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{offersCount == 0 ? 2: offersCount}</p>
                <p className='text-gray-600'>Negociaciones</p>
            </div>
            <p className='bg-gray-100 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-800text-lg'>+11%</span>
            </p>
        </div>

        <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-md'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{reservationsCount === 0 ? 1: reservationsCount}</p>
                <p className='text-gray-600'>Cantidad de Ventas</p>
            </div>
            <p className='bg-gray-100 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-800text-lg'>+11%</span>
            </p>
        </div>

        <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-md'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{providersCount === 0 ? 4 : providersCount}</p>
                <p className='text-gray-600'>Cantidad de Vendedores</p>
            </div>
            <p className='bg-gray-100 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-orange-800text-lg'>+11%</span>
            </p>
        </div>
    </div>
  )
}

export default TopCards