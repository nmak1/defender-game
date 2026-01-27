export function sortCharacters(characters) {
  return characters.sort((a, b) => b.health - a.health);
}