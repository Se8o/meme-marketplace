export const API_URL = 'https://api.imgflip.com/get_memes';

export const MEME_CATEGORIES = [
  'Funny',
  'Wholesome',
  'Dark Humor',
  'Relatable',
  'Dank',
  'Cursed'
];

export const DEBOUNCE_DELAY = 300;
export const PRICE_PER_STAR = 25;
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Generate consistent rating for a meme based on its ID
export const getMemeRating = (id) => {
  const seed = id * 9301 + 49297;
  const random = (seed % 233280) / 233280;
  const rating = Math.floor(MIN_RATING + random * (MAX_RATING - MIN_RATING + 1));
  return Math.min(Math.max(rating, MIN_RATING), MAX_RATING);
};

// Generate consistent category for a meme based on its ID
export const getMemeCategory = (id) => {
  const seed = id * 7919 + 12345;
  const index = seed % MEME_CATEGORIES.length;
  return MEME_CATEGORIES[index];
};

// Calculate price based on rating
export const getMemePrice = (rating) => {
  return rating * PRICE_PER_STAR;
};
