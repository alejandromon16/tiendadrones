import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";

const DataTable = ({ sellers, onRowClick }) => {
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
          <span className="sm:text-left text-right">Correo</span>
          <span className="hidden md:grid">Celular</span>
          <span className="hidden md:grid">Comission</span>
          <span className="hidden sm:grid">Monto Vendido</span>
        </div>
        <AnimatePresence>
          <ul>
            {sellers.docs.map(doc => {
              const seller = doc.data();
              return (
                <motion.li
                  key={seller.id}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={() => onRowClick(seller)}
                  layout
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 p-3 rounded-lg">
                      <BsPersonFill className="text-gray-800" />
                    </div>
                    <p className="pl-4">{seller.fullName}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">{seller.correo}</p>
                  <p className="hidden md:flex">{seller.phoneNumber}</p>
                  <p className="hidden md:flex">{seller.comission}</p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>{seller.sellAmount} Bs</p>
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
