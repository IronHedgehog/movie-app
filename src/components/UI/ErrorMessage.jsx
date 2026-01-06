const ErrorMessage = ({ message, onRetry }) => (
  <div>
    <p>{message}</p>
    {onRetry && <button onClick={onRetry}>Retry</button>}
  </div>
);

export default ErrorMessage;
