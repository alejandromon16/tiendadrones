'use client'
import BarChart from '@/components/Barchart';
import RecentOrders from '@/components/RecentOrders';
import Top20Clients from '@/components/Top20Clients';
import Top20Ofertantes from '@/components/Top20Ofertantes';
import Top20WorstClients from '@/components/Top20WorstClients';
import Top20WorstOfertantes from '@/components/Top20WorstOfertantes';
import TopCards from '@/components/TopCards';
import { Box, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PieChart from '@/components/PieChart';
import ParkingLotBubbleChart from '@/components/BubbleChrat';
import { auth } from '@/utils/firebase/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '@/hooks/auth';
import { getClientsCount, getOffersCount, getProvidersCount, getReservationsCount } from '@/services/analiticas';
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, where, collection, DocumentData, Query, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase/client';

const Analiticas = () => {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: (custom: number) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: custom * 0.3 }
    })
  };

  const [user] = useAuthState(auth)
  const { role: roleUser } = useAuth() || {};
  const [clientsCount, setClientsCount] = useState(0);
  const [providersCount, setProvidersCount] = useState(1);
  const [offersCount, setOffersCount] = useState(0);
  const [reservationsCount, setReservationsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user && roleUser) {
        const userId = user.uid;
        const role = roleUser;
        const clientsQuery = query(collection(db, 'clients'));
        const providersQuery = role === "admin" ?
          query(collection(db, 'providers')) :
          query(collection(db, 'providers'), where("provider.id", "==", user.uid));
        const offersQuery = role === 'provider' ?
          query(collection(db, 'offers'), where("provider.id", "==", user.uid)) :
          collection(db, 'offers');
        const reservationsQuery = collection(db, 'sells');

        const [clientsSnapshot, providersSnapshot, offersSnapshot, reservationsSnapshot] = await Promise.all([
          getDocs(clientsQuery),
          getDocs(providersQuery),
          getDocs(offersQuery),
          getDocs(reservationsQuery)
        ]);

        setClientsCount(clientsSnapshot.size || 2);
        setProvidersCount(providersSnapshot.size === 0 ? 1: providersSnapshot.size);
        setOffersCount(offersSnapshot.size);
        setReservationsCount(reservationsSnapshot.size);
      }
    };

    fetchData();
  }, [user, roleUser]);

  let reservationsQuery: Query<DocumentData, DocumentData>;
  reservationsQuery = collection(db, "sells");
  const [reservations, reservationsLoading, error]= useCollection(reservationsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  if (reservationsLoading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;



  return (
    <Box flex={1} as={motion.div} initial="initial" custom={0} animate="animate" variants={fadeIn}>
      <HStack as={motion.div} variants={fadeIn} custom={0.5}>
        <TopCards clientsCount={clientsCount} providersCount={providersCount} offersCount={offersCount} reservationsCount={reservationsCount} />
      </HStack>

     

        <motion.div className={`p-4 grid  ${roleUser === 'admin'? 'md:grid-cols-3': ''} grid-cols-1 gap-4`} variants={fadeIn} custom={2}>
        { roleUser === 'admin' && (
          <BarChart />
        )}
          <RecentOrders reservations={reservations}/>
        </motion.div>
      

      { roleUser === 'admin' && (

        <motion.div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4' variants={fadeIn} custom={3.5}>
          <Top20Ofertantes />
          <Top20Clients />
          <Top20WorstOfertantes />
          <Top20WorstClients />
        </motion.div>
      )}
    </Box>
  );
}

export default Analiticas;
