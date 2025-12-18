export const API_URL = 'https://api.imgflip.com/get_memes';

export const MEME_CATEGORIES = [
  'Funny',
  'Wholesome',
  'Dark Humor',
  'Relatable',
  'Dank',
  'Cursed'
];

// Generate consistent rating for a meme based on its ID
export const getMemeRating = (id) => {
  const seed = id * 9301 + 49297;
  const random = (seed % 233280) / 233280;
  return parseFloat((3 + random * 2).toFixed(1));
};

// Generate consistent category for a meme based on its ID
export const getMemeCategory = (id) => {
  const seed = id * 7919 + 12345;
  const index = seed % MEME_CATEGORIES.length;
  return MEME_CATEGORIES[index];
};
