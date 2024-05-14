import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack,SimpleGrid, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Flex, Text, HStack, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import LocationSearch from './LocationSearch';
import MapboxMap from './Map/MapBoxMap';
import VariableAvailability from './VariableAvailability';
import FixedAvailability from './FixedAvailability';
import Select from 'react-select'
import ImageDropzone from './ImageDropZone';


const CreateParkingForm = ({onSubmit}) => {
  const [coordinates, setCoordinates] = useState([-63.2368629, -17.8388128]);
  const handleLocationSelect = (coords) => {
    setCoordinates(coords);
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [availability, setAvailability] = useState('variable');
  const [parkingData, setParkingData] = useState({
    name: '',
    status: 'Activo',
    images: '',
    vehicleCount: 1,
    spaces: [],
    latitude: '',
    longitude: '',
    detailAddress: 0,
    locationInfo: ''
  });
  const [selectedFacilities, setSelectedFacilities] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setParkingData({ ...parkingData, [name]: value });
  };

  const handleSpaceChange = (index, e) => {
    const newSpaces = [...parkingData.spaces];
    newSpaces[index] = {...newSpaces[index], [e.target.name]: e.target.value};
    setParkingData({...parkingData, spaces: newSpaces});
  };

  const addSpaces = () => {
    const newSpaces = [...parkingData.spaces, { width: '', length: '', height: '' }];
    setParkingData({...parkingData, spaces: newSpaces});
  };


  const handleFacilitiesChange = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, len = options.length; i < len; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedFacilities(value);
  };

  const optionsGarage = [
    { value: 'active', label: 'Activo'},
    { value: 'closed', label: 'Cerrado'}
  ]

  const optionsStatus = [
    { value: 'PortonVisible', label: 'Libre' },
    { value: 'PortonNotVisible', label: 'Reservado' },
    { value: 'CameraIntern', label: 'Ocupado' },
    { value: 'CameraEntrance', label: 'Deshabilitado' }
  ]

  const options = [
    { value: 'PortonVisible', label: 'Porton con visibilidad hacia afuera' },
    { value: 'PortonNotVisible', label: 'Porton sin visibilidad hacia afuera' },
    { value: 'CameraIntern', label: 'Camaras Internas' },
    { value: 'CameraEntrance', label: 'Camara de ingreso' }
  ]

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%'
    })
  };

  const steps = [
    { label: 'Informacion General', content: (
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input name="name" value={parkingData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Estado</FormLabel>
          <Select options={optionsGarage} styles={customStyles} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Imagen</FormLabel>
          <ImageDropzone />
          {/* <Input name="images" type="url" value={parkingData.images} onChange={handleChange} /> */}
        </FormControl>
      </VStack>
    )},
    { label: 'Cantidad de Parqueos', content: (
      <VStack spacing={4}>
        <Button onClick={addSpaces}>Anadir Espacio</Button>
        {parkingData.spaces.map((space, index) => (
          <SimpleGrid columns={3} spacing={2} key={index}>
            <Input placeholder="Ancho (m)" name="width" type="number" value={space.width} onChange={(e) => handleSpaceChange(index, e)} />
            <Input placeholder="Largo (m)" name="length" type="number" value={space.length} onChange={(e) => handleSpaceChange(index, e)} />
            <Input placeholder="Alto (m)" name="height" type="number" value={space.height} onChange={(e) => handleSpaceChange(index, e)} />
          </SimpleGrid>
        ))}
      </VStack>
    )},
    { label: 'Ubication detallada', content: (
      <SimpleGrid columns={2} spacing={4}>
        <VStack rowGap={5}>
            <LocationSearch onLocationSelect={handleLocationSelect} />
            <FormControl isRequired>
                <FormLabel>Numero de Casa o terreno</FormLabel>
                <Input name="latitude" type="number" value={parkingData.detailAddress} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Detalles de Direccion (ej: condominio, color de casa)</FormLabel>
                <Input name="latitude" type="text" value={parkingData.locationInfo} onChange={handleChange} />
            </FormControl>
        </VStack>
        <MapboxMap coordinates={{lat: coordinates[1], lng: coordinates[0]}} />
      </SimpleGrid>
    )},
    { label: 'Disponibilidad de Horas y Dias', content: (
      <Stack>
      <RadioGroup onChange={setAvailability} value={availability}>
        <Stack direction="row">
          <Radio value="variable">Disponibilidad Variable</Radio>
          <Radio value="fixed">Disponibilidad Fija</Radio>
        </Stack>
      </RadioGroup>
      {availability === 'variable' ? (
        <VariableAvailability />
      ) : (
        <FixedAvailability />
      )}
    </Stack>
    )},
    {label:'Facilidades', content: (
      <VStack spacing={5} width='100%' bgColor={'ButtonShadow'}>
            <Select options={options} isMulti styles={customStyles} />
      </VStack>
    )}
  ];

  const nextStep = () => {
    setCurrentStep(currentStep < steps.length ? currentStep + 1 : currentStep);
  };

  const prevStep = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);
  };

  return (
    <Flex>
      <Box p="5" width="20%" borderRight="1px" borderColor="gray.200">
        {steps.map((step, index) => (
          <HStack alignItems={'center'}>
            <div className={`${currentStep === index + 1 ? 'bg-yellow-300' : ''} h-3 w-1`}>
            </div>
            <Text key={index} fontWeight={currentStep === index + 1 ? "bold" : "normal"} py="2">
                {step.label}
            </Text>
          </HStack>
        ))}
      </Box>
      <Box p="5" width="80%">
        <form>
          {steps[currentStep - 1].content}
          <Flex mt="4" justifyContent="space-between">
            <Button onClick={prevStep} isDisabled={currentStep === 1}>Anterior</Button>
            <Button onClick={nextStep} isDisabled={currentStep === steps.length}>Continuar</Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateParkingForm;

