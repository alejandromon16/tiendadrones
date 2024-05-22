'use client'
import { useState } from 'react';
import { Button, Input, VStack, Center, Text, Heading, FormControl, FormLabel, useToast, Box } from "@chakra-ui/react";
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';
import {useAuthState, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth, db } from '@/utils/firebase/client';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/hooks/auth';
import { Image } from '@chakra-ui/react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter()
  const [user] = useAuthState(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const {isAuthenticated, setIsAuthenticated, setRole, role} = useAuth();

  if (isAuthenticated && user){
    router.push('/admin/analiticas')
    return null
  }

  const checkClientExists = async ({ db, email }): Promise<boolean> => {
    const clientsQuery = query(collection(db, 'clients'), where('email', '==', email));
    const querySnapshot = await getDocs(clientsQuery);
    return querySnapshot.size > 0;
  };

  const checkProviderExists = async ({ db, email }): Promise<boolean> => {
    const clientsQuery = query(collection(db, 'providers'), where('email', '==', email));
    const querySnapshot = await getDocs(clientsQuery);
    return querySnapshot.size > 0;
  };


  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const clientRole =  await checkClientExists({db, email});
      if(clientRole){
        throw Error('No tienes Accesso')
      }

      const providerRole = await checkProviderExists({db, email})
      if(providerRole){
        console.log('role provider')
        setRole('provider')
      }else{
        console.log('role admin')
        setRole('admin')
      }

      const res = await signInWithEmailAndPassword(email, password);
      setIsAuthenticated(true)
      toast({
        title: 'Login Exitoso',
        description: 'Bienvenido',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
      router.replace('/admin/analiticas')
    } catch (error) {
      setIsAuthenticated(false)
      let errorMessage = 'Error de autenticación';
      if (!error.message.includes('Invalid login credentials')) {
        errorMessage = error.message;
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar role={role} />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white w-full">
        <VStack
          spacing={4}
          p={10}
          rowGap={10}
          boxShadow="lg"
          borderRadius="lg"
          width={['90%', '70%', '50%', '30%']}
          as="form"
          onSubmit={handleSubmit}
        >
          <Heading textAlign={'center'} size={'lg'}>
            Bienvenido Drones CRM
          </Heading>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              name="email"
              placeholder="Ingrese su email"
              variant="outline"
              type="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              placeholder="Ingrese su contraseña"
              variant="outline"
              type="password"
            />
          </FormControl>
          <Button
            colorScheme="green"
            width="full"
            isLoading={loading}
            type="submit"
            name="login"
          >
            Iniciar Sesión
          </Button>


          <span>Te olvidaste?
            <a href="/signup" className="text-blue-700 hover:text-blue-400"> Recuperar Contrasena</a>
          </span>
        </VStack>
      </main>
    </>
  );
}
