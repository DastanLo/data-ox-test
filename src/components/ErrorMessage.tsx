import React from 'react';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Alert from '@material-ui/lab/Alert';

interface ErrorMessageProps {
  error: string,
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error} <strong>Please reload the page!</strong>
    </Alert>
  );
};

export default ErrorMessage;
