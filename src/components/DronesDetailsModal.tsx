import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
  Image,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import MapboxMap from "./Map/MapBoxMap";

const ParkingDetailsModal = ({ isOpen, onClose, parking }) => {
  if (!parking) return null;

  const renderStars = (count) => {
    return Array(5)
      .fill("")
      .map((_, i) => (
        <StarIcon key={i} color={i < count ? "yellow.400" : "gray.300"} />
      ));
  };

  const renderAvailableTimes = (availableTimeInWeek) => {
    return availableTimeInWeek.map((weekDay, index) => (
      <Box key={index} mb={4}>
        <Text fontSize="lg" fontWeight="bold">{
         weekDay.day === 'monday' ? 'Lunes':
         weekDay.day === 'tuesday' ? 'Martes':
         weekDay.day === 'wednesday' ? 'Miercoles':
         weekDay.day === 'thursday' ? 'Jueves':
         weekDay.day === 'friday' ? 'Viernes':
         weekDay.day === 'saturday' ? 'Sabado': 'Domingo'
        
        }</Text>
        {weekDay.availableTime.length > 0 ? (
          weekDay.availableTime.map((timeSlot, idx) => (
            <Text key={idx}>{`${timeSlot.startTime} - ${timeSlot.endTime}`}</Text>
          ))
        ) : (
          <Text>No disponible</Text>
        )}
      </Box>
    ));
  };

  const [latitude, longitude] = parking.location.coordinates.split(",").map(Number);
  console.log('lat', latitude)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{parking.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bgColor={'lightyellow'} borderRadius={10}>
            <Text paddingX={4} paddingY={2} marginBottom={5}>Ofertante: {parking.userName}</Text>
          </Box>
          <Flex direction="column" rowGap={14}>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Ranking
              </Text>
              <Flex>
                {renderStars(parking.rating)}
                <Badge
                  ml="2"
                  colorScheme="green"
                >{`${parking.rating}/5 (${parking.ratingsCompleted} reviews)`}</Badge>
              </Flex>
            </Box>
            <Box flexDirection={"column"} columnGap={5}>
              <Text fontSize="lg" fontWeight="bold">
                Ubicacion
              </Text>
              <Text marginBottom={1}>
                Direccion: {parking.location.location}
              </Text>
              <Text marginBottom={4}>Referencia: {parking.location.reference}</Text>
              <MapboxMap
                coordinates={{
                  lat: latitude,
                  lng: longitude,
                }}
              />
            </Box>
            <Box flexDirection={"column"} rowGap={5}>
              <Text fontSize="lg" fontWeight="bold">
                Imagenes
              </Text>
              <Image key="1" src={parking.imgUrl} boxSize="400px" mr="2" />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Espacio
              </Text>
              <Text>Cantidad de Espacio: {parking.numberOfSpaces}</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                Detalles del Garaje
              </Text>
              {parking.details.map((detail, index) => (
                <Text key={index} mt="2" fontStyle="italic">
                  "{detail}"
                </Text>
              ))}
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold">Disponibilidad Horaria</Text>
              {renderAvailableTimes(parking.availableTimeInWeek)}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ParkingDetailsModal;
