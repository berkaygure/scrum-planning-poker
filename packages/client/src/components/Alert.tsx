import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  AlertProps,
  BoxProps,
} from '@chakra-ui/react';

interface AlertMessageProps extends BoxProps {
  title: string;
  message?: string;
  closable?: boolean;
  type?: AlertProps['status'];
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  closable,
  type = 'info',
  message,
  ...props
}) => (
  <Alert status='error' {...props}>
    <AlertIcon />
    <AlertTitle mr={2}>{title}</AlertTitle>
    {message && <AlertDescription>{message}</AlertDescription>}
    {closable && <CloseButton position='absolute' right='8px' top='8px' />}
  </Alert>
);

export default AlertMessage;
