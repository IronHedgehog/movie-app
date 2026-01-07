import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ErrorMessage = ({ message, onRetry }) => (
  <Stack spacing={2} alignItems="center" my={3}>
    <Alert severity="error">{message}</Alert>
    {onRetry && (
      <Button variant="contained" onClick={onRetry}>
        Retry
      </Button>
    )}
  </Stack>
);

export default ErrorMessage;
