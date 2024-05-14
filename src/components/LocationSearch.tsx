import React, { useState } from 'react';
import axios from 'axios';
import { Input, Box, List, ListItem, Button, FormControl, FormLabel } from '@chakra-ui/react';

const LocationSearch = ({ onLocationSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const proximity = '-63.1833, -17.7833'; // Longitude, Latitude
  const countryCode = 'BO';  // ISO country code for Bolivia

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (query) => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;  // Replace with your Mapbox access token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&country=${countryCode}&proximity=${proximity}&limit=5&types=address`;

    try {
      const response = await axios.get(url);
      const results = response.data.features.map(feature => ({
        name: feature.place_name,
        coordinates: feature.center
      }));
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchText(suggestion.name);
    setSuggestions([]);
    onLocationSelect(suggestion.coordinates);
  };

  return (
    <Box width={'100%'}>
        <FormControl isRequired width={'100%'}>
            <FormLabel>Direccion</FormLabel>
            <Input value={searchText} onChange={handleSearchChange} placeholder="Busca la ubicacion" />
        </FormControl>
      {suggestions.length > 0 && (
        <List spacing={1} bg="white" p={2} boxShadow="md" borderRadius="md" maxH="200px" overflowY="auto">
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} p={2} cursor="pointer" _hover={{ bg: 'gray.100' }} onClick={() => handleSelectSuggestion(suggestion)}>
              {suggestion.name}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default LocationSearch;
