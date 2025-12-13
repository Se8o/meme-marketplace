import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function PrivateRoute({ children }) {
  const [user] = useLocalStorage('user', null);

  if (!user || !user.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
