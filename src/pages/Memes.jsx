import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { useCart } from '../context/CartContext';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { API_URL, MEME_CATEGORIES, getMemeRating, getMemeCategory } from '../constants';

export function Memes() {
  const { data, loading, error } = useFetch(API_URL);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const debouncedSearch = useDebounce(searchTerm, 300);

  const memesWithExtra = useMemo(() => {
    if (!data?.data?.memes) return [];
    
    return data.data.memes.map((meme) => ({
      ...meme,
      rating: getMemeRating(meme.id),
      category: getMemeCategory(meme.id),
    }));
  }, [data]);

  const filteredMemes = useMemo(() => {
    let result = [...memesWithExtra];

    if (debouncedSearch) {
      result = result.filter((meme) =>
        meme.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((meme) => meme.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'size') {
        return (b.width * b.height) - (a.width * a.height);
      }
      return 0;
    });

    return result;
  }, [memesWithExtra, debouncedSearch, selectedCategory, sortBy]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message="Nepodařilo se načíst memy 😢" />;
  }

  return (
    <div className="memes-container">
      <h1>Meme Gallery</h1>

      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="search">Vyhledávání:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Hledat podle názvu..."
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Kategorie:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">Všechny</option>
            {MEME_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Třídění:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Název A-Z</option>
            <option value="rating">Rating (sestupně)</option>
            <option value="size">Velikost obrázku</option>
          </select>
        </div>
      </div>

      <p className="memes-count">
        Zobrazeno: {filteredMemes.length} memů
      </p>

      <div className="memes-grid">
        {filteredMemes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <img src={meme.url} alt={meme.name} className="meme-image" />
            <div className="meme-info">
              <h3 className="meme-name">{meme.name}</h3>
              <p className="meme-category">{meme.category}</p>
              <p className="meme-rating">
                {'⭐'.repeat(meme.rating)}
              </p>
              <div className="meme-actions">
                <button
                  onClick={() => navigate(`/memes/${meme.id}`)}
                  className="button-detail"
                >
                  Detail
                </button>
                <button
                  onClick={() => addItem(meme)}
                  className="button-cart"
                >
                  Do košíku
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMemes.length === 0 && (
        <p className="no-results">Žádné memy nenalezeny</p>
      )}
    </div>
  );
}
