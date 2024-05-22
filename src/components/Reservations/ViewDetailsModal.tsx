import React from 'react';
import { Modal, ModalOverlay, Center, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

const ReservationModal = ({ reservation, isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de Reservacion</ModalHeader>
          <ModalCloseButton />
          <ModalBody rowGap={10}>
            <Text><strong>Nombre de Cliente:</strong> {reservation.client.fullName}</Text>
            <Text><strong>Fecha:</strong> {reservation.date}</Text>
            <Text><strong>Nombre de Garaje:</strong> {reservation.garageSpace.garageName}</Text>
            <Text><strong>Monto Acordado:</strong> {reservation.payAmount}</Text>
            <Text><strong>Tiempo de Inicio:</strong> {reservation.time.startTime}</Text>
            <Text><strong>Tiempo de Finalizacion:</strong> {reservation.time.endTime}</Text>
            <Text><strong>Marca:</strong> {reservation.vehicle.make}</Text>
            <Text><strong>Modelo de Vehiculo:</strong> {reservation.vehicle.model}</Text>
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

export default ReservationModal;
