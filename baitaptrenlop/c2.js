const handleGetModulo = (addingData, compareValue) => {
  let validatedValue = addingData;
  while (validatedValue >= compareValue || validatedValue < 0) {
    validatedValue =
      validatedValue >= compareValue
        ? validatedValue - compareValue
        : validatedValue + compareValue;
  }
  return {
    getValue: () => validatedValue,
  };
};
// from c1.js

const eratosthenesAlgrolythm = (n) => {
  let result = [];
  for (let i = 2; i <= n; i++) result.push(i);
  let isExistBiggerInt = true;
  let p = 2;
  while (isExistBiggerInt) {
    const indexOfPValue = result.findIndex((item) => item === p);
    for (let i = 2; i * p <= n; i++) {
      const indexOfValue = result.findIndex((item) => item === i * p);
      if (indexOfValue !== -1) {
        result.splice(indexOfValue, 1);
      }
    }
    p = result[indexOfPValue + 1];
    if (indexOfPValue === result.length - 1 || p === undefined)
      isExistBiggerInt = false;
  }
  return result;
};

// Pollard's Rho algorithm get gcd(a,b)
const getGCDFromTwoNumber = (a, b) => {
  let numbA = a;
  let numbB = b;
  while (numbB > 0) {
    const moduloFromAAndB = handleGetModulo(numbA, numbB);
    numbA = numbB;
    numbB = moduloFromAAndB.getValue();
  }
  return numbA;
};

// Pollard's Rho algorithm to factorize a number into its prime factors
const factorizeToPrimeNumber = (n) => {
  // function with random property
  const functionWithRandomProperty = (x) => Math.pow(x, 2) + 1;
  let isNotValidRenderLoop = true;
  const result = [];
  let numberA = 2;
  let numberB = 2;
  while (numberA != numberB || isNotValidRenderLoop) {
    isNotValidRenderLoop = false;
    numberA = handleGetModulo(
      functionWithRandomProperty(numberA),
      n
    ).getValue();
    const firstModuloNumber = handleGetModulo(
      functionWithRandomProperty(numberB),
      n
    ).getValue();
    numberB = handleGetModulo(
      functionWithRandomProperty(firstModuloNumber),
      n
    ).getValue();
    const oneOfResult = getGCDFromTwoNumber(Math.abs(numberB - numberA), n);
    if (!result.includes(oneOfResult)) result.push(oneOfResult);
  }
  return result;
};
console.log(factorizeToPrimeNumber(455459));

const BINARY_VARIABLE = 2;
const LOOP_COUNT = 2;

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

const getValueFromComplicatedModulo = (number, powerNumber, moduleNumber) => {
  let maxLevelOfPowerNumber = 0;
  for (i = powerNumber; maxLevelOfPowerNumber === 0 && powerNumber !== 1; i--) {
    const { isValid, maxLevelFromNumber } = checkIfNumberIsPowByNOf2(i);
    if (isValid) maxLevelOfPowerNumber = maxLevelFromNumber;
  }
  const binaryArray = [];
  let currentNumber = powerNumber;
  for (
    let powerVariable = maxLevelOfPowerNumber;
    powerVariable >= 0;
    powerVariable--
  ) {
    if (Math.pow(BINARY_VARIABLE, powerVariable) <= currentNumber) {
      currentNumber -= Math.pow(BINARY_VARIABLE, powerVariable);
      binaryArray.push(1);
    } else {
      binaryArray.push(0);
    }
  }
  let testNumberP = 1;
  binaryArray.forEach((value) => {
    testNumberP = Math.pow(testNumberP, BINARY_VARIABLE);
    testNumberP = handleGetModulo(testNumberP, moduleNumber).getValue();
    if (value === 1) testNumberP = testNumberP * number;
    testNumberP = handleGetModulo(testNumberP, moduleNumber).getValue();
  });
  return testNumberP;
};

// Miller-Rabin algorithm
const checkIfNumberIsPrimeNumber = (number) => {
  let r = number - 1;
  while (r % BINARY_VARIABLE === 0) r = r / BINARY_VARIABLE;
  for (let currentLoop = 1; currentLoop <= LOOP_COUNT; currentLoop++) {
    let testNumb = getValueFromComplicatedModulo(BINARY_VARIABLE, r, number);
    if (testNumb !== 1 && testNumb !== number - 1) {
      let j = 1;
      while (
        j <=
          checkIfNumberIsPowByNOf2((number - 1) / r).maxLevelFromNumber - 1 &&
        testNumb !== number - 1
      ) {
        testNumb = getValueFromComplicatedModulo(testNumb, 2, number);
        if (testNumb === 1) return "Composite Number";
        j += 1;
      }
      if (testNumb !== number - 1) return "Composite Number";
    }
  }
  return "Prime Number";
};
