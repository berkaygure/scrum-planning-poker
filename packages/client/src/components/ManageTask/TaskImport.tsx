import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  VStack,
  Flex,
  Spinner,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import AlertMessage from 'components/shared/Alert';
import { useAsync } from 'hooks/useAsync';
import useJira from 'hooks/useJira';
import { useState } from 'react';

interface FormElements extends HTMLFormControlsCollection {
  url: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface JiraLoginElements extends HTMLFormElement {
  readonly elements: FormElements;
}

interface IssueData {
  issues: {
    key: string;
    id: number;
    fields: {
      summary: string;
      description: string | null;
    };
  }[];
}

const TaskImport: React.FC = () => {
  const { run, isLoading } = useAsync();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, isConnected, search } = useJira();
  const [data, setData] = useState<IssueData['issues']>([]);

  const handleConnect = (e: React.FormEvent<JiraLoginElements>) => {
    e.preventDefault();
    const { url, username, password } = e.currentTarget.elements;
    run(connect({ url: url.value, username: username.value, password: password.value }));
  };

  const handleSearch = () => {
    run(search()).then((response: IssueData) => {
      setData(response.issues);
    });
  };

  return (
    <>
      <Button onClick={onOpen} w='full'>
        Import from JIRA
      </Button>

      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleConnect}>
          <ModalContent>
            <ModalHeader>Task Import</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AlertMessage title='**Disclaimer** Currently, we only support basic authentication. If you do not trust it, please do not use this feature. Its an open-source project so you can read the code we never store sensitive information.' />
              {isLoading ? (
                <Spinner />
              ) : !isConnected ? (
                <VStack mt={5}>
                  <FormControl>
                    <FormLabel htmlFor='url'>Jira Url</FormLabel>
                    <Input name='url' id='url' placeholder='Jira URL' type='text' />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input name='username' id='username' placeholder='Your username' />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input
                      name='password'
                      placeholder='Your Password'
                      id='password'
                      type='password'
                    />
                  </FormControl>
                </VStack>
              ) : (
                <Flex flex={1} flexDir='column'>
                  <Flex gridGap={5} mt='4'>
                    <Input flex='1' placeholder='JQL' />{' '}
                    <Button onClick={handleSearch}>Fetch</Button>
                  </Flex>
                  <VStack justifyContent='start' alignItems='start'>
                    {data.map((issue) => (
                      <Box
                        key={issue.key}
                        py={4}
                        w='full'
                        borderBottomColor='gray.600'
                        borderBottomWidth='1px'
                        borderBottomStyle='solid'
                      >
                        <Checkbox>
                          {issue.key} {issue.fields.summary}
                        </Checkbox>
                      </Box>
                    ))}
                  </VStack>
                </Flex>
              )}
            </ModalBody>
            {!isConnected ? (
              <ModalFooter>
                <Button variant='ghost' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button type='submit' colorScheme='blue'>
                  Connect
                </Button>
              </ModalFooter>
            ) : null}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default TaskImport;
