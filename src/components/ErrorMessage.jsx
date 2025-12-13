export function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <p className="error-message">{message || 'Něco se pokazilo 😢'}</p>
    </div>
  );
}
