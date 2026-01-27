function sortCharacters(characters) {
  return characters.slice().sort((a, b) => b.health - a.health);
}

module.exports = { sortCharacters };