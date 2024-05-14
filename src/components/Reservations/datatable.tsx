import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

const DataTable = ({ reservations, onRowClick }) => {
  const itemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.div
      className="p-4"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
        <div className="my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
          <span>Nombre</span>
          <span className="sm:text-left text-right">Fecha</span>
          <span className="hidden md:grid">Ofertante</span>
          <span className="hidden md:grid">Cliente</span>
          <span className="hidden sm:grid">Monto Acordado</span>
        </div>
        <AnimatePresence>
          <ul>
            {reservations.docs.map(doc => {
              const reservation = doc.data();
              return (
                <motion.li
                  key={reservation.id}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={() => onRowClick(reservation)}
                  layout
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 p-3 rounded-lg">
                      <BsPersonFill className="text-gray-800" />
                    </div>
                    <p className="pl-4">{reservation.garageSpace.garageName}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">{reservation.date}</p>
                  <p className="hidden md:flex">{reservation.provider.fullName}</p>
                  <p className="hidden md:flex">{reservation.client.fullName}</p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>{reservation.payAmount} Bs</p>
                    <BsThreeDotsVertical />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DataTable;
