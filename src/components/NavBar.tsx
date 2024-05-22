'use client';
import { auth } from '@/utils/firebase/client';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = ({ role }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const isActive = (path) => {
    return typeof window !== "undefined" ? window.location.pathname.includes(path) : false;
  }

  return (
    <div className='fixed h-full w-64 z-50 bg-white shadow-xl'>
      <div className='flex flex-col items-center py-6'>
        <Image 
          src='/Logo.png'
          alt='logo'
          width={160}
          height={100}
        />
        <div className='flex flex-col mt-10 w-full'>
          {(role === "admin" || role === "provider") && (
            <>
              <a href='/admin/analiticas' className={`hover:bg-gray-100 p-3 w-full text-center rounded-md cursor-pointer transition-all ${isActive('/admin/analiticas') ? 'bg-gray-200' : ''}`}>
                Analiticas
              </a>
              <a href='/admin/drones' className={`hover:bg-gray-100 p-3 w-full text-center rounded-md cursor-pointer transition-all ${isActive('/admin/drones') ? 'bg-gray-200' : ''}`}>
                Drones
              </a>
              <a href='/admin/ventas' className={`hover:bg-gray-100 p-3 w-full text-center rounded-md cursor-pointer transition-all ${isActive('/admin/reservas') ? 'bg-gray-200' : ''}`}>
                Ventas
              </a>
            </>
          )}
          {role === "admin" && (
            <>
              <a href='/admin/vendedores' className={`hover:bg-gray-100 p-3 w-full text-center rounded-md cursor-pointer transition-all ${isActive('/admin/vendedores') ? 'bg-gray-200' : ''}`}>
                Vendedores
              </a>
              <a href='/admin/clientes' className={`hover:bg-gray-100 p-3 w-full text-center rounded-md cursor-pointer transition-all ${isActive('/admin/clientes') ? 'bg-gray-200' : ''}`}>
                Clientes
              </a>
            </>
          )}
        </div>
        {role && (
          <Button
            className="mt-6"
            onClick={() => {
              sessionStorage.removeItem('role');
              sessionStorage.removeItem('user');
              sessionStorage.clear();
              auth.signOut();
              router.replace('/');
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
