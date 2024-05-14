"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, DocumentData, Query, query, where } from "firebase/firestore";
import { auth, db } from "@/utils/firebase/client";
import DataTable from "@/components/Reservations/datatable";
import ReservationModal from "@/components/Reservations/ViewDetailsModal";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Reservas = () => {
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const [user] = useAuthState(auth)
  const { role } = useAuth() || {};

  let reservationsQuery: Query<DocumentData, DocumentData>;
  if (role === "provider" && user) {
    reservationsQuery = query(
      collection(db, "reservations"),
      where("provider.id", "==", user.uid)
    );
  } else {
    reservationsQuery = query(collection(db, "reservations"));
  }

  
  const [reservations, reservationsLoading, error] = useCollection(reservationsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const openModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (reservationsLoading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between p-4">
        <h2 className="font-semibold text-xl">Reservas</h2>
      </div>
      <DataTable reservations={reservations} onRowClick={openModal}/>
      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Reservas;