import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { API_URL, MEME_CATEGORIES, getMemeRating, getMemeCategory } from '../constants';

export function Dashboard() {
  const { data, loading, error } = useFetch(API_URL);
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message="Nepodařilo se načíst data pro dashboard" />;
  }

  const memes = data?.data?.memes || [];
  
  const memesWithExtra = memes.map((meme) => ({
    ...meme,
    rating: getMemeRating(meme.id),
    category: getMemeCategory(meme.id),
  }));

  const categories = [...new Set(memesWithExtra.map((meme) => meme.category))];
  
  const topMeme = memesWithExtra.reduce((top, meme) => {
    return meme.rating > (top?.rating || 0) ? meme : top;
  }, null);

  return (
    <div className="dashboard-container">
      <h1>Dashboard - Meme Admin Panel</h1>
      
      <div className="dashboard-grid">
        <Card className="dashboard-card">
          <h3>Počet memů</h3>
          <p className="dashboard-number">{memes.length}</p>
        </Card>

        <Card className="dashboard-card">
          <h3>Počet kategorií</h3>
          <p className="dashboard-number">{categories.length}</p>
        </Card>

        <Card className="dashboard-card">
          <h3>Položky v košíku</h3>
          <p className="dashboard-number">{getItemCount()}</p>
        </Card>

        <Card className="dashboard-card highlight">
          <h3>Nejoblíbenější meme</h3>
          {topMeme && (
            <div className="top-meme">
              <img src={topMeme.url} alt={topMeme.name} />
              <p className="top-meme-name">{topMeme.name}</p>
              <p className="top-meme-rating">
                {'⭐'.repeat(topMeme.rating)}
              </p>
            </div>
          )}
        </Card>
      </div>

      <button 
        onClick={() => navigate('/memes')} 
        className="dashboard-button"
      >
        Přejít na memy
      </button>
    </div>
  );
}
