import { Heading, Icon, Text } from '@chakra-ui/react';
import { GiPokerHand } from 'react-icons/gi';

const Logo = () => (
  <Heading fontSize='2xl' p='4' as='a' display='block' _hover={{ color: 'gray.500' }}>
    <Icon as={GiPokerHand} fontSize='5xl' />
    <Text as='span' ml='4'>
      ScrumPoker
    </Text>
  </Heading>
);

export default Logo;
