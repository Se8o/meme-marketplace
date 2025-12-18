import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error('Nepodařilo se načíst data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}
