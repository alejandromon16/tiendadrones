'use client'
import { Button, Input} from "@chakra-ui/react";
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import CreateDronesForm from "@/components/NewDronesForm";
import DronesDetailsModal from "@/components/DronesDetailsModal";
import { auth, db } from "@/utils/firebase/client";
import { collection, DocumentData, Query, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { DronesCard } from "@/components/DronesCard";
import { useAuth } from "@/hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const DronesList = ({ drones, onCardClick, searchQuery }) => {
  const fadeIn = {
    initial: { opacity: 0 },
    animate: (custom) => ({
      opacity: 1,
      transition: { duration: 0.6, delay: custom * 0.2 },
    }),
  };

  const filteredDrones = drones.filter((doc) => {
    const { name, price, stock } = doc.data();
    const searchText = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(searchText) ||
      price.toString().toLowerCase().includes(searchText) ||
      stock.toString().includes(searchText) || 
      'activo'.includes(searchText) 
    );
  });

  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredDrones.map((doc, index) => {
          const dron = doc.data();
          return (
            <motion.div
              key={dron.id}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <DronesCard
                name={dron.name}
                providerName={dron.price.toString() || '0 Bs'}
                status={'Activo'}
                stock={dron.stock}
                imageUrl={dron.imageUrl}
                onClick={() => onCardClick(dron)}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Drones = () => {
  const [selectedDrones, setSelectedDrones] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showList, setShowList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useAuthState(auth)
  const { role } = useAuth() || {};

  let dronesQuery: Query<DocumentData, DocumentData>;
  if (role === "provider" && user) {
    dronesQuery = query(
      collection(db, "drones"),
      where("userId", "==", user.uid)
    );
  } else {
    dronesQuery = query(collection(db, "drones"));
  }

  const [drones, dronesLoading, error] = useCollection(dronesQuery);

  const handleDronesClick = (Drones) => {
    setSelectedDrones(Drones);
    setIsModalOpen(true);
  };

  const handleAddNewDrones = () => {
    setShowList(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-5">
        <h1 className="text-xl font-bold">Drones</h1>
        {role === 'provider' && (
          <Button onClick={handleAddNewDrones} colorScheme="green">
            Agregar Nuevo Drone
          </Button>
        )}
      </div>
      <Input
        placeholder="Buscar por Nombre, precio o stock"
        value={searchQuery}
        onChange={handleSearchChange}
        size="lg"
        marginBottom="4"
        px={5}
        marginX={5}
      />
      <AnimatePresence>
        {showList ? (
          <motion.div key="DronesList">
            {drones && (
              <DronesList
                drones={drones.docs}
                onCardClick={handleDronesClick}
                searchQuery={searchQuery}
              />
            )}
          </motion.div>
        ) : (
          <CreateDronesForm onSubmit={() => {}} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drones;
