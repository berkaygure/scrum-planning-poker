import { Box, BoxProps } from '@chakra-ui/react';

const FormWrapper: React.FC<BoxProps> = ({ children }) => (
  <Box p={10} px={20} w='600px' minH='400px' borderWidth={1} borderRadius={8} boxShadow='lg'>
    {children}
  </Box>
);

export default FormWrapper;
