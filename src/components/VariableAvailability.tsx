import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Calendar from "./BasicDateCalendar";

const timeRanges = {
  allDay: Array.from({ length: 24 }, (_, i) => `${i + 1}:00 - ${i + 2}:00`),
  morning: Array.from({ length: 6 }, (_, i) => `${i + 1}:00 - ${i + 2}:00`),
  noonToEvening: Array.from(
    { length: 9 },
    (_, i) => `${i + 13}:00 - ${i + 14}:00`
  ),
};

const HourCard = ({ value, onChange, isChecked }) => (
  <Box as="label">
    <Checkbox
      colorScheme="yellow"
      isChecked={isChecked}
      onChange={onChange}
      value={value}
    >
      <Box
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _focus={{ boxShadow: "outline" }}
        p={3}
        textAlign="center"
        m={1}
      >
        {value}
      </Box>
    </Checkbox>
  </Box>
);

const mergeHours = (hours) => {
  if (hours.length === 24) return ["Todo el día"];

  hours.sort();
  const merged = [];
  for (let i = 0; i < hours.length; i++) {
    const [start, end] = hours[i].split(" - ").map(h => parseInt(h));
    if (merged.length === 0 || merged[merged.length - 1][1] + 1 !== start) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = end;
    }
  }
  return merged.map(range => `${range[0]}:00 - ${range[1]}:00`);
};

const VariableAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hourSelections, setHourSelections] = useState({});
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [review, setReview] = useState([]);

  const handleHourChange = (e) => {
    const hour = e.target.value;
    const isChecked = e.target.checked;
    const dateKey = selectedDate.toDateString();
    const updatedHours = isChecked
      ? [...(hourSelections[dateKey] || []), hour]
      : (hourSelections[dateKey] || []).filter((h) => h !== hour);

    const newHourSelections = { ...hourSelections, [dateKey]: updatedHours };
    setHourSelections(newHourSelections);
    updateSummary(newHourSelections);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeRange("");
    updateSummary(hourSelections, date.toDateString());
  };

  const handleTimeRangeChange = (value) => {
    const hoursToSelect = timeRanges[value] || [];
    const dateKey = selectedDate.toDateString();
    const newHourSelections = { ...hourSelections, [dateKey]: hoursToSelect };
    setHourSelections(newHourSelections);
    setSelectedTimeRange(value);
    updateSummary(newHourSelections);
  };

  const updateSummary = (
    selections,
    selectedKey = selectedDate.toDateString()
  ) => {
    const summaries = Object.keys(selections).map((date) => {
      const hours = selections[date];
      const mergedHours = mergeHours(hours);
      const daySummary = `Día: ${new Date(date).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}.`;
      const hourSummary =
        mergedHours.length > 0
          ? `Horas seleccionadas: ${mergedHours.join(", ")}`
          : "No se seleccionaron horas.";
      return `${daySummary} ${hourSummary}`;
    });
    setReview(summaries);
  };

  return (
    <VStack spacing={4} align="stretch" width="100%">
      <RadioGroup onChange={handleTimeRangeChange} value={selectedTimeRange}>
        <HStack spacing={5}>
          <Radio value="allDay">Todo el día</Radio>
          <Radio value="morning">Solo la mañana</Radio>
          <Radio value="noonToEvening">Desde el mediodía hasta la noche</Radio>
        </HStack>
      </RadioGroup>

      <HStack width={'100%'}>
        <VStack>
            <Calendar 
                selected={selectedDate}
                onChange={handleDateChange}
            />
        </VStack>

        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={2}
          overflowY="scroll"
          maxHeight="400px"
          width="100%"
          p={2}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {Array.from(
            { length: 24 },
            (_, i) => `${i + 1}:00 - ${i + 2}:00`
          ).map((hour) => (
            <HourCard
              key={hour}
              value={hour}
              isChecked={(
                hourSelections[selectedDate.toDateString()] || []
              ).includes(hour)}
              onChange={handleHourChange}
            />
          ))}
        </Grid>
      </HStack>

      <VStack align="start">
        {review.map((text, index) => (
          <Text key={index}>{text}</Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default VariableAvailability;
