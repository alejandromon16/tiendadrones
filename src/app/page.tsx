'use client'
import { db } from "@/utils/firebase/client";
import { Image, Box } from "@chakra-ui/react";
import { addDoc, collection, doc, DocumentData, query, Query, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";

export default function DronesPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  let dronesQuery: Query<DocumentData, DocumentData>;
  dronesQuery = query(collection(db, "drones"));

  const [drones, dronesLoading, error] = useCollection(dronesQuery);

  function addToCart(item) {
    setCart(oldCart => {
      const exist = oldCart.find(x => x.id === item.id);
      if (exist) {
        return oldCart.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      } else {
        setShowCart(true); // Show cart when an item is added
        return [...oldCart, { ...item, qty: 1 }];
      }
    });
  }

  function removeFromCart(id) {
    setCart(oldCart => oldCart.reduce((acc, item) => {
      if (item.id === id) {
        if (item.qty === 1) {
          const newCart = acc.filter(x => x.id !== id);
          if (newCart.length === 0) {
            setShowCart(false); // Hide cart when empty
          }
          return newCart;
        }
        return [...acc, { ...item, qty: item.qty - 1 }];
      } else {
        return [...acc, item];
      }
    }, []));
  }

  function getTotal() {
    return cart.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  }

  const cartVariant = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  async function updateStock(id, newStock) {
    const droneRef = doc(db, "drones", id);
    await updateDoc(droneRef, {
      stock: newStock
    });
  }

  async function handlePurchase() {
    cart.forEach(async (item) => {
      const sellData = {
        clientName: "Guest",
        payAmount: item.price * item.qty,
        purchasedDate: Timestamp.fromDate(new Date())
      };
      await addDoc(collection(db, "sells"), sellData);
    });
    setCart([]);
    setShowCart(false);
  }

  return (
    <>
      <body className="font-openSans">
        <header className="bg-cover bg-center h-72" style={{ backgroundImage: 'url(../img/droneair.jpg)' }}>
          <h1 className="text-center text-3xl text-white py-8">VENTA DE DRONES</h1>
        </header>
        <section className="max-w-6xl mx-auto px-4 flex justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {!dronesLoading && drones.docs.map(item => {
              const dron = item.data();
              return (
                <motion.div key={dron.id} className="max-w-xs mx-auto border border-gray-400 rounded p-5 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  layout
                >
                  <span className="block font-bold text-center uppercase">{dron.name}</span>
                  <Image key={dron.id} src={dron.imageUrl} boxSize="200px" mr="2" />
                  <span className="block text-center font-bold text-lg">{dron.price} Bs</span>
                  <button onClick={() => addToCart(dron)} className="block w-full bg-black text-white rounded py-2 mt-4 hover:bg-gray-700">Agregar al carrito</button>
                </motion.div>
              )
            })}
          </div>

          {showCart && (
            <motion.div className="w-1/3 sticky top-0"
              variants={cartVariant}
              initial="hidden"
              animate="visible"
            >
              <div className="text-center bg-black text-white py-8">
                <h2>Tu Carrito</h2>
              </div>
              <div className="bg-gray-100 p-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center my-2">
                    <span>{item.title}</span>
                    <div>
                      <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 border rounded">-</button>
                      <span className="mx-2">{item.qty}</span>
                      <button onClick={() => addToCart(item)} className="px-2 py-1 border rounded">+</button>
                    </div>
                    <span>Bs {item.price * item.qty}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-lg font-bold mb-4">
                  <strong>Total:</strong>
                  <span>Bs {getTotal()}</span>
                </div>
                <button onClick={handlePurchase} className="w-full bg-black text-white rounded px-4 py-3 flex justify-between items-center transition-transform duration-300 hover:scale-105">
                  Pagar
                </button>
              </div>
            </motion.div>
          )}
        </section>
      </body>
    </>
  );
}
