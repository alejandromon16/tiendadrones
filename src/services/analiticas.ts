import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase/client';

const getClientsCount = async (userId: string, role: string) => {
    // if (role === "admin") {
    //   const reservationsQuery = query(
    //     collection(db, 'reservations'),
    //     where("provider.id", "==", userId)
    //   );
    //   const reservationsSnapshot = await getDocs(reservationsQuery);
    //   return reservationsSnapshot.size;
    // }

    const clientsQuery = query(
    collection(db, "clients")
    )
    const clientsSnapshot = await getDocs(clientsQuery);
    return clientsSnapshot.size;
}

const getProvidersCount = async (userId, role) => {
  if (role != 'admin') {
    return 1;
  } else {
    const providersCollectionRef = collection(db, 'providers');
    const providersSnapshot = await getDocs(providersCollectionRef);
    return providersSnapshot.size;
  }
}

const getOffersCount = async (userId, role) => {
  if (role === 'provider') {
    const offersQuery = query(
      collection(db, 'offers'),
      where("provider.id", "==", userId)
    );
    const offersSnapshot = await getDocs(offersQuery);
    return offersSnapshot.size;
  } else {
    const offersCollectionRef = collection(db, 'offers');
    const offersSnapshot = await getDocs(offersCollectionRef);
    return offersSnapshot.size;
  }
}

const getReservationsCount = async (userId, role) => {
  if (role === 'provider') {
    const reservationsQuery = query(
      collection(db, 'reservations'),
      where("provider.id", "==", userId)
    );
    const reservationsSnapshot = await getDocs(reservationsQuery);
    return reservationsSnapshot.size;
  } else {
    const reservationsCollectionRef = collection(db, 'reservations');
    const reservationsSnapshot = await getDocs(reservationsCollectionRef);
    return reservationsSnapshot.size;
  }
}

export { getClientsCount, getProvidersCount, getOffersCount, getReservationsCount };
