export function extractQuotedText(str) {
  const firstQuote = str.indexOf('"'); // Ищем первую кавычку
  const lastQuote = str.lastIndexOf('"'); // Ищем последнюю кавычку

  if (firstQuote === -1 || lastQuote === -1 || firstQuote === lastQuote) {
    return null; // Если кавычек нет или они одиночные, возвращаем null
  }

  return str.slice(firstQuote + 1, lastQuote); // Вырезаем содержимое между кавычками
}