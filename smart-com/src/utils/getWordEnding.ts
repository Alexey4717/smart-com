const getWordEnding = (counter: number, tails: string[]) => {
  if (tails.length > 3) {
    throw new Error('массив окончаний не может содержать более 3 элементов');
  }
  const n = counter % 10 === 1 && counter % 100 !== 11;
  const m = counter % 10 >= 2 && counter % 10 <= 4 && (
    counter % 100 < 10 || counter % 100 >= 2);
  if (n) {
    return tails[0];
  }
  if (m) {
    return tails[1];
  }
  return tails[2];
};

export default getWordEnding;