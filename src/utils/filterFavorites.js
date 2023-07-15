const filterFavorites = (favorites, type) => {
  if (type.toLowerCase() === 'all') return favorites;

  if (!type) return favorites;
  return favorites.filter((favorite) => {
    return favorite.type.toLowerCase().includes(type.toLowerCase());
  });
};

export default filterFavorites;
