"use client";
import { db } from "@/utils/firebase/client";
import {
  Box,
  Image,
  Select,
  Text,
  Button,
  Heading,
  Flex,
  Grid,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Center,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  query,
  Query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function DronesPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [saleType, setSaleType] = useState("Menor");
  const { isOpen, onOpen, onClose } = useDisclosure();

  let dronesQuery: Query<DocumentData, DocumentData>;
  dronesQuery = query(collection(db, "drones"));

  const [drones, dronesLoading, error] = useCollection(dronesQuery);

  function addToCart(item) {
    setCart((oldCart) => {
      const exist = oldCart.find((x) => x.id === item.id);
      if (exist) {
        return oldCart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return [...oldCart, { ...item, qty: 1 }];
      }
    });

    setShowCart(true)
  }

  function removeFromCart(id) {
    setCart((oldCart) =>
      oldCart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.qty === 1) {
            const newCart = acc.filter((x) => x.id !== id);
            if (newCart.length === 0) {
              setShowCart(false); // Hide cart when empty
            }
            return newCart;
          }
          return [...acc, { ...item, qty: item.qty - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  }

  function getTotal() {
    const baseTotal = cart.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    const discount = saleType === "Mayor" ? 0.2 : 0.1;
    return (baseTotal - baseTotal * discount).toFixed(2);
  }

  const cartVariant = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  async function updateStock(id, newStock) {
    const droneRef = doc(db, "drones", id);
    await updateDoc(droneRef, {
      stock: newStock,
    });
  }

  async function handlePurchase() {
    cart.forEach(async (item) => {
      const sellData = {
        clientName: "Guest",
        payAmount: item.price * item.qty,
        purchasedDate: Timestamp.fromDate(new Date()),
      };
      await addDoc(collection(db, "sells"), sellData);
    });
    setCart([]);
    setShowCart(false);
  }

  return (
    <>
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Encuentra los Mejores Drones con Nosotros
      </h1>
    </div>

    <VStack spacing={8}>
      <Box as="section" mx="auto" px="4" mt="8">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "repeat(3, 1fr)",
          }}
          gap="6"
        >
          {!dronesLoading &&
            drones.docs.map((item) => {
              const dron = item.data();
              return (
                <motion.div style={{ height: 10 }} key={dron.id} layout>
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {dron.name}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        Este es un Nuevo Dron
                      </CardItem>
                      <CardItem translateZ="100" className="w-full mt-4">
                        <Image
                          src={dron.imageUrl}
                          height="300"
                          width="100"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                      <div className="flex justify-between items-center mt-20">
                        <CardItem
                          translateZ={20}
                          translateX={-40}
                          as="button"
                          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                          {dron.price} Bs
                        </CardItem>
                        <CardItem
                          onClick={() => addToCart(dron)}
                          as="button"
                          className="px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold"
                        >
                          Añadir al Carrito
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              );
            })}
        </Grid>
      </Box>

      <Box as="section" mx="auto" px="4" mt="700">
        <Center my="50">
          <Heading color="black">Más Información</Heading>
        </Center>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-8xl mx-auto w-full pb-96">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-green-600 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                El mejor soporte del País
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Tenemos más de 10 Ingenieros capacitados
              </p>
            </div>
            <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-500">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Innovación y Tecnología a tu Alcance
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Nuestros drones están equipados con la última tecnología para ofrecerte soluciones innovadoras en fotografía, videografía y más.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] bg-black">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Servicio de Drones Confiable y Eficiente
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Confiabilidad y eficiencia son nuestras promesas. Explora nuestros drones y experimenta un servicio al cliente excepcional desde la compra hasta el soporte post-venta.
              </p>
            </div>
            <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </Box>
    </VStack>

    <Drawer isOpen={showCart} size="md" placement="right" onClose={() => setShowCart(false)}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu Carrito</DrawerHeader>
          <DrawerBody>
            <Stack mt="4">
              {cart.map((item) => (
                <Flex key={item.id} justify="space-between" align="center">
                  <Text>{item.name}</Text>
                  <Flex>
                    <Button onClick={() => removeFromCart(item.id)} size="sm">
                      -
                    </Button>
                    <Text mx="2">{item.qty}</Text>
                    <Button onClick={() => addToCart(item)} size="sm">
                      +
                    </Button>
                  </Flex>
                  <Text>Bs {item.price * item.qty}</Text>
                </Flex>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Flex  w="full">
              <Text fontWeight="bold">Total:</Text>
              <Text>Bs {getTotal()}</Text>
            </Flex>
            <Button
              onClick={handlePurchase}
              w="full"
              mt="4"
              bg="black"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              Pagar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  </>
  );
}
