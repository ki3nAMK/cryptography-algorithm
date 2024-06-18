const checkIfNumberIsPowByNOf2 = (number) => {
  let currentNumb = number;
  let maxLevelFromNumber = 0;
  while (currentNumb !== 1) {
    if (currentNumb % 2 === 0) {
      ++maxLevelFromNumber;
      currentNumb = currentNumb / 2;
    } else {
      return {
        isValid: false,
        maxLevelFromNumber: 0,
      };
    }
  }
  return {
    isValid: true,
    maxLevelFromNumber,
  };
};