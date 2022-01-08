import { Flex } from '@chakra-ui/react';
import VoteButton from './VoteButton';

const defaultVotes = [
  {
    title: '0',
    value: 0,
  },
  {
    title: '1/2',
    value: 0.5,
  },
  {
    title: '1',
    value: 1,
  },
  {
    title: '2',
    value: 2,
  },
  {
    title: '3',
    value: 3,
  },
  {
    title: '5',
    value: 5,
  },
  {
    title: '8',
    value: 8,
  },
  {
    title: '13',
    value: 13,
  },
  {
    title: '20',
    value: 20,
  },
  {
    title: '40',
    value: 40,
  },
  {
    title: '100',
    value: 100,
  },
  {
    title: 'Coffee',
    value: -1,
  },
];

export interface VotePanelProps {
  votes?: { title: string; value: number }[];
  onVote?: (value?: number) => void;
  vote?: number;
}

const VotePanel: React.FC<VotePanelProps> = ({ votes = defaultVotes, vote, onVote }) => {
  return (
    <Flex flex={1} justifyContent={'center'} gridGap={10} wrap='wrap'>
      {votes.map(({ title, value }) => (
        <VoteButton
          key={value}
          title={title}
          isActive={vote === value}
          value={value}
          onVote={onVote}
        />
      ))}
    </Flex>
  );
};

export default VotePanel;
