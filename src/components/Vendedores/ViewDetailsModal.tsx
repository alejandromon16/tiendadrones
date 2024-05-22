import React from 'react';
import { Modal, ModalOverlay, Center, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

const ReservationModal = ({ reservation, isOpen, onClose }) => {
  return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de Vendedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody rowGap={10}>
            <Text><strong>Nombre de Vendedor:</strong> {reservation.fullName}</Text>
            <Text><strong>Celular:</strong> {reservation.phoneNumber}</Text>
            <Text><strong>Porcentaje de Comision:</strong> {reservation.comission}%</Text>
            <Text><strong>Monto Vendido:</strong> {reservation.sellAmount} Bs</Text>
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
