// Makes a simple picture in code so no image files are needed yet.
export function placeholderImage(emoji, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${color}"/><text x="200" y="240" font-size="150" text-anchor="middle">${emoji}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
