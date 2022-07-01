export function getAudioUrl(word: string) {
  const str = word.toLocaleLowerCase();
  let url = `https://www.oxfordlearnersdictionaries.com/media/english/us_pron/${str.charAt(
    0,
  )}/${str.slice(0, 3)}/`;
  if (str.length >= 5) {
    url += `${str.slice(0, 5)}/${str}__us_1.mp3`;
    return url;
  }
  url += `${str.padEnd(5, '_')}/${str}__us_1.mp3`;
  return url;
}

export function convertEnglishWordTag(arr: string[]) {
  const obj = {
    Basic: '4000_words',
    Medium: '7000_words',
    Hard: 'toefl',
    Challenging: 'oxford_20000',
  };
  const result = arr.map((i) => obj[i as keyof typeof obj]);
  return result;
}
