"use client";
import { data } from "@/data/data";
import { Button } from "@chakra-ui/react";
import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/utils/firebase/client";
import { collection, query, Timestamp, where } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';


function convertTimestampToString(timestamp: Timestamp): string {
  const date = timestamp.toDate();

  const dateString = date.toDateString();

  return dateString;
}

const Clientes = () => {
  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const clientsQuery = query(collection(db, 'clients'));
  const [clients, clientsLoading, error] = useCollection(clientsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });


  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between p-4">
        <h2 className="font-semibold text-xl">Clientes</h2>
        {/* <Button colorScheme="yellow" mr={3}>
          Agregar Ofertantes
        </Button> */}
      </div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {clientsLoading && <span>Loading...</span>}
      <motion.div
        className="p-4"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={cardVariants}
      >
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Nombre</span>
            <span className="sm:text-left text-right">Correo</span>
            <span className="hidden md:grid">Numero de Celular</span>
            <span className="hidden sm:grid">Creado en</span>
          </div>
          <AnimatePresence>
            <ul>

            {clients && (
              <div>
                {clients.docs.map(doc => {
                   const client = doc.data()
                   return (
                      <motion.li
                      key={client.id}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={itemVariants}
                      layout
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-lg">
                          <BsPersonFill className="text-gray-800" />
                        </div>
                        <p className="pl-4">
                          {client.fullName}
                        </p>
                      </div>
                      <p className="text-gray-600 sm:text-left text-right">
                        {client.email}
                      </p>
                      <p className="hidden md:flex"> +(591) {client.phoneNumber}</p>
                      <div className="sm:flex hidden justify-between items-center">
                        <p>{convertTimestampToString(client.createdAt)}</p>
                        <BsThreeDotsVertical />
                      </div>
                    </motion.li>
                   )}
                )}
              </div>
            )}
            </ul>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Clientes;
