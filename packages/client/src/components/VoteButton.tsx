import { Box, Button } from '@chakra-ui/react';

const VoteButton: React.FC<{
  value?: number;
  title: string;
  isActive?: boolean;
  onVote?: (val?: number) => void;
}> = ({ title, isActive, value, onVote }) => {
  return (
    <Button
      as='button'
      h={176}
      w={133}
      py='2'
      justifyContent='space-between'
      flexDir='column'
      alignItems='stretch'
      colorScheme={isActive ? 'blue' : 'gray'}
      onClick={() => onVote?.(value)}
    >
      <Box fontSize='11' textAlign='left'>
        {title}
      </Box>
      <Box
        fontSize='24'
        flex='1'
        my='2'
        rounded='md'
        border='solid'
        borderWidth={1}
        justifyContent='center'
        borderColor='gray.600'
        alignItems='center'
        d='flex'
      >
        {title}
      </Box>
      <Box fontSize='11' textAlign='left' transform='scale(-1, 1)'>
        {title}
      </Box>
    </Button>
  );
};

export default VoteButton;
