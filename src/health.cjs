module.exports = function sortByHealth(characters) {
  if (!Array.isArray(characters)) {
    throw new Error('characters must be an array');
  }

  const result = [...characters];
  return result.sort((a, b) => b.health - a.health);
};