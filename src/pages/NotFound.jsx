import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Stránka nebyla nalezena</p>
      <Link to="/dashboard" className="notfound-link">
        Zpět na dashboard
      </Link>
    </div>
  );
}
