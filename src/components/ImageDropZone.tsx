import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Image,
  Center,
  Text,
  useToast,
  VStack,
  IconButton,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageDropzone: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Failed to load the image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setImage(fileUrl);

    toast({
      position:'top-right',
      title: "Image Uploaded",
      description: "The image has been successfully uploaded.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  const removeImage = () => {
    setImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
        {image ? (
          <Box position="relative" maxW="sm">
            <IconButton
              aria-label="Remove image"
              icon={<FiX />}
              size="sm"
              position="absolute"
              right={2}
              top={2}
              zIndex="tooltip"
              onClick={removeImage}
              colorScheme="gray"
            />
            <Image src={image} alt="Uploaded Image" borderRadius="md" boxSize="sm" objectFit="cover" />
          </Box>
        ) : (
          <Box {...getRootProps()} p={5} border="2px dashed" borderColor="gray.300" borderRadius="md">
            <input {...getInputProps()} />
            <Flex align="center" justify="center">
              <VStack>
                <Icon as={FiUpload} w={12} h={12} color="gray.500" />
                <Text>{isDragActive ? 'Drop the image here...' : 'Drag and drop an image here, or click to select one'}</Text>
              </VStack>
            </Flex>
          </Box>
        )}
    </div>
  );
};

export default ImageDropzone;
