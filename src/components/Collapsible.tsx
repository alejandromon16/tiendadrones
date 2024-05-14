import React, { useState } from 'react';
import { Box, Button, Collapse, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

function CollapsibleComponent({ index, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const bg = useColorModeValue("blue.100", "blue.700");

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Button width={'100%'} justifyContent="space-between" onClick={handleToggle}rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
        Oferta {index}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="20px"
          mt="4"
          rounded="md"
          shadow="md"
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}

export default CollapsibleComponent;
