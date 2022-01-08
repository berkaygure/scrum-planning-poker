import { Flex, Skeleton as CSkeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const Skeleton = () => {
  return (
    <Flex
      pb='5'
      mb='5'
      pr='5'
      align='center'
      borderBottom='1px'
      borderBottomColor='gray.600'
      justifyContent='space-between'
    >
      <Flex flexDirection='column'>
        <CSkeleton w={400} height='26px' />
        <CSkeleton mt={6} w={100} height='16px' />
      </Flex>
      <CSkeleton h={10} rounded='md' w={100} />
    </Flex>
  );
};

export default Skeleton;
