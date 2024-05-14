import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Grid,
  Stack,
  HStack,
  VStack,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const timeRanges = {
  allDay: Array.from({ length: 24 }, (_, i) => `${i + 1}:00 - ${i+2}:00`),
  morning: Array.from({ length: 6 }, (_, i) => `${i + 1}:00 - ${i+2}:00`),
  noonToEvening: Array.from({ length: 9 }, (_, i) => `${i + 13}:00 - ${i+14}:00`),
};

const HourCard = ({ value, onChange, isChecked }) => {
  return (
    <Box as="label">
      <Checkbox colorScheme="yellow" isChecked={isChecked} onChange={onChange} value={value}>
        <Box
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _focus={{
            boxShadow: "outline",
          }}
          p={3}
          textAlign="center"
          m={1}
        >
          {value}
        </Box>
      </Checkbox>
    </Box>
  );
};

const FixedAvailability = () => {
  const [days, setDays] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [review, setReview] = useState('Select days and hours to see a summary.');

  const handleHourChange = (e) => {
    const hour = e.target.value;
    const isChecked = e.target.checked;
    const newSelectedHours = isChecked ? [...selectedHours, hour] : selectedHours.filter(h => h !== hour);
    setSelectedHours(newSelectedHours);
    updateSummary(days, newSelectedHours);
  };

  const handleDayChange = (values) => {
    setDays(values);
    updateSummary(values, selectedHours);
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    const hoursToSelect = timeRanges[value] || [];
    setSelectedHours(hoursToSelect);
    updateSummary(days, hoursToSelect);
  };

  const updateSummary = (days, hours) => {
    const daySummary = days.length > 0 ? `Days: ${days.join(', ')}.` : 'No days selected.';
    const hourSummary = hours.length > 0 ? `Hours: ${hours.length} hour(s) selected: ${hours.join(', ')}` : 'No hours selected.';
    setReview(`${daySummary} ${hourSummary}`);
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <RadioGroup onChange={handleTimeRangeChange} value={selectedTimeRange}>
        <HStack spacing={5}>
          <Radio value="allDay">Todo el dia</Radio>
          <Radio value="morning">Solo en la manana</Radio>
          <Radio value="noonToEvening">Del medio a la noche</Radio>
        </HStack>
      </RadioGroup>
      <HStack spacing={4} align="top" width="100%">
        <CheckboxGroup colorScheme="yellow" onChange={handleDayChange} value={days}>
          <Stack direction="column" spacing={2}>
            {daysOfWeek.map(day => (
              <Checkbox key={day} value={day}>{day}</Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} overflowY="scroll" maxHeight="400px" width="100%" p={2} css={{
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
          {Array.from({ length: 24 }, (_, i) => `${i + 1}:00 - ${i+2}:00`).map(hour => (
            <HourCard
              value={hour}
              key={hour}
              isChecked={selectedHours.includes(hour)}
              onChange={handleHourChange}
            />
          ))}
        </Grid>
      </HStack>
      <Text>{review}</Text>
    </VStack>
  );
};

export default FixedAvailability;
