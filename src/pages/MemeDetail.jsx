import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';

const MEME_CATEGORIES = ['animals', 'celebrities', 'gaming', 'school', 'random'];
const API_URL = 'https://api.imgflip.com/get_memes';

export function MemeDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(API_URL);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const memesWithExtra = useMemo(() => {
    if (!data?.data?.memes) return [];
    
    return data.data.memes.map((meme) => ({
      ...meme,
      rating: Math.floor(Math.random() * 5) + 1,
      category: MEME_CATEGORIES[Math.floor(Math.random() * MEME_CATEGORIES.length)],
    }));
  }, [data]);

  const meme = memesWithExtra.find((m) => m.id === id);

  const relatedMemes = useMemo(() => {
    if (!meme) return [];
    
    return memesWithExtra
      .filter((m) => m.category === meme.category && m.id !== meme.id)
      .slice(0, 3);
  }, [meme, memesWithExtra]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message="Nepodařilo se načíst detail memu" />;
  }

  if (!meme) {
    return <ErrorMessage message="Meme nebyl nalezen" />;
  }

  return (
    <div className="meme-detail-container">
      <button onClick={() => navigate('/memes')} className="back-button">
        ← Zpět na seznam
      </button>

      <div className="detail-content">
        <div className="detail-image-section">
          <img src={meme.url} alt={meme.name} className="detail-image" />
        </div>

        <div className="detail-info-section">
          <h1>{meme.name}</h1>
          
          <div className="detail-info-item">
            <strong>Rating:</strong>
            <span className="detail-rating">
              {'⭐'.repeat(meme.rating)}
            </span>
          </div>

          <div className="detail-info-item">
            <strong>Kategorie:</strong>
            <span className="detail-category">{meme.category}</span>
          </div>

          <div className="detail-info-item">
            <strong>Rozměry:</strong>
            <span>{meme.width} × {meme.height} px</span>
          </div>

          <div className="detail-info-item">
            <strong>Cena:</strong>
            <span className="detail-price">{meme.rating * 25} Kč</span>
          </div>

          <button
            onClick={() => addItem(meme)}
            className="detail-cart-button"
          >
            Přidat do košíku
          </button>
        </div>
      </div>

      {relatedMemes.length > 0 && (
        <div className="related-section">
          <h2>Podobné memy</h2>
          <div className="related-grid">
            {relatedMemes.map((relatedMeme) => (
              <div
                key={relatedMeme.id}
                className="related-card"
                onClick={() => navigate(`/memes/${relatedMeme.id}`)}
              >
                <img src={relatedMeme.url} alt={relatedMeme.name} />
                <p>{relatedMeme.name}</p>
                <p className="related-rating">
                  {'⭐'.repeat(relatedMeme.rating)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
