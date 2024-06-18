const getModulo = (number, module) => {
  const eachValue = Math.floor(number / module);
  const theRest = number - eachValue * module;
  return [eachValue];
};

const getBeer = (
  coin,
  priceForEachBeer = 28,
  numbOfEmptyBeerToGetTheNewOne = 3
) => {
  let totalBeerCanGet = 0;
  const [numbOfBeerCanGet] = getModulo(coin, priceForEachBeer);
  const [newBeerFromEmptyBottle] = getModulo(
    numbOfBeerCanGet,
    numbOfEmptyBeerToGetTheNewOne
  );
  totalBeerCanGet += numbOfBeerCanGet + newBeerFromEmptyBottle;
  return totalBeerCanGet;
};

const beer = getBeer(138);
console.log(beer);
