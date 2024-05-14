'use client'
import { auth } from '@/utils/firebase/client';
import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


const NavBar = ({role}) => {
  const router = useRouter()
  const [user] = useAuthState(auth);
  
  const isActive = (path: string) => {
    return typeof window !== "undefined" ? window.location.pathname.includes(path) : false;
  }

  return (
    <div className='fixed w-full z-50'>
      <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-sm bg-white'>
        <div className='flex gap-10 items-center  w-full'>
          <Image src='/Logo.png'
            alt='logo'
            width={160}
            height={100}
          />

          
            <div className='hidden md:flex gap-6'>

              {(role == "admin"|| role == "provider") && (
                <>
                  <a href='/admin/analiticas' className={`hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all ${isActive('/admin/analiticas') ? 'bg-gray-200' : ''}`}>
                    Analiticas
                  </a>
                  <a href='/admin/drones' className={`hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all ${isActive('/admin/parqueos') ? 'bg-gray-200' : ''}`}>
                    Drones
                  </a>

                  <a href='/admin/reservas' className={`hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all ${isActive('/admin/reservas') ? 'bg-gray-200' : ''}`}>
                    Ventas
                  </a>
                </>
              )}
              
              {role === "admin" && (
                <>
                <a href='/admin/vendedores' className={`hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all ${isActive('/admin/ofertantes') ? 'bg-gray-200' : ''}`}>
                  Vendedores
                </a>
                <a href='/admin/clientes' className={`hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all ${isActive('/admin/clientes') ? 'bg-gray-200' : ''}`}>
                  Clientes
                </a>
                </>
              )}
            </div>
          
          <div className="flex flex-row w-full justify-end mr-10">
            {role && (<Button onClick={() => {
              sessionStorage.removeItem('role')
              sessionStorage.removeItem('user')
              sessionStorage.clear()
              auth.signOut()
              router.replace('/')
            }}>Logout</Button>)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default NavBar;


