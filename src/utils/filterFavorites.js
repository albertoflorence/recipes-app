const filterFavorites = (favorites, type) => {
  if (!type) return favorites;
  return favorites.filter((favorite) => {
    return favorite.type.toLowerCase().includes(type.toLowerCase());
  });
};

export default filterFavorites;
