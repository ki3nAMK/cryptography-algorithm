function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

const createArrayNumb = (t, numb, w) => {
  const result = [];
  let numbCheck = numb;
  for (let i = 0; i < t; i++) {
    const numbAhead = Math.pow(2, w * (t - 1 - i));
    const eachValue = Math.floor(numbCheck / numbAhead);
    result.push(eachValue);
    numbCheck -= eachValue * numbAhead;
  }
  return [...result];
};

const getNumbFromArr = (t, arr, w) => {
  let result = 0;
  for (let i = 0; i < t; i++) {
    result += Math.pow(2, w * (t - 1 - i))*arr[i];
  }
  return result;
};

const handleGetModulo = (addingData, compareValue) => {
  let rememberBit = 0;
  let validatedValue = 0;
  if (addingData >= compareValue || addingData < 0) {
    validatedValue =
      addingData >= compareValue
        ? addingData - compareValue
        : addingData + compareValue;
    rememberBit = 1;
  } else {
    validatedValue = addingData;
  }
  return [rememberBit, validatedValue];
};

const multiprecisionCalculation = (w, t, arr1, arr2, type) => {
  if (type !== "add" && type !== "subtract") return undefined;
  const compareValue = Math.pow(2, w);
  const result = [];
  let rememberBit = 0;
  for (let i = 0; i < t; i++) {
    const addingData =
      type === "add"
        ? arr1[t - 1 - i] + arr2[t - 1 - i] + rememberBit
        : arr1[t - 1 - i] - arr2[t - 1 - i] - rememberBit;
    const [newRememberBit, dataAfterGetModulo] = handleGetModulo(
      addingData,
      compareValue
    );
    result.push(dataAfterGetModulo);
    rememberBit = newRememberBit;
  }
  return {
    data: result.reverse(),
    rememberBit: rememberBit,
  };
};

const result = multiprecisionCalculation(
  8,
  4,
  createArrayNumb(4,100,8),
  createArrayNumb(4,200,8),
  'add'
);

const calculationInFp = (w, p, t, arr1, arr2, type) => {
  if (type !== "add" && type !== "subtract") return undefined;
  const arrP = createArrayNumb(4, p, 8);
  const dataAfterCal = multiprecisionCalculation(w, t, arr1, arr2, type);
  const c = getNumbFromArr(t, dataAfterCal.data, w);
  if (dataAfterCal.rememberBit === 1 || (type === "subtract" && c >= p)) {
    const newResult = multiprecisionCalculation(
      w,
      t,
      dataAfterCal.data,
      arrP,
      type === "add" ? "subtract" : "add"
    );
    return newResult.data;
  } else {
    return dataAfterCal.data;
  }
};

function splitAndConvert(binaryString) {
  let firstHalf = binaryString.slice(0, 8);
  let secondHalf = binaryString.slice(8, 16);
  let firstHalfValue = parseInt(firstHalf, 2);
  let secondHalfValue = parseInt(secondHalf, 2);
  return [firstHalfValue, secondHalfValue];
}

function to16BitBinaryString(number, numbBit) {
  let binaryString = number.toString(2);
  while (binaryString.length < numbBit * 2) {
    binaryString = "0" + binaryString;
  }
  if (binaryString.length > numbBit * 2) {
    binaryString = binaryString.slice(-numbBit * 2);
  }
  return binaryString;
}

const convertIntoBitDataAndSplit = (numb, w) => {
  const binaryString = to16BitBinaryString(numb, w);
  const dataAfterConvert = splitAndConvert(binaryString);
  return dataAfterConvert;
};

const integerMultiprecision = (t, arr1, arr2, w = 8) => {
  const a = arr1.reverse();
  const b = arr2.reverse();
  const result = [];
  for (let i = 0; i < t; i++) {
    result.push(0);
  }
  for (let i = 0; i < t; i++) {
    let U = 0;
    for (let j = 0; j < t; j++) {
      const currentNumb = result[i + j] + a[i] * b[j] + U;
      const [firstNumb, secondNumb] = convertIntoBitDataAndSplit(
        currentNumb,
        w
      );
      U = firstNumb;
      result[i + j] = secondNumb;
    }
    result[i + t] = U;
  }
  return result.reverse();
};

const barrettReduction = (p, b, z) => {
  const k = Math.floor(Math.log(p) / Math.log(b)) + 1;
  const niu = Math.pow(b, 2 * k) / p;
  const squareQ = Math.floor(
    (z / Math.pow(b, k - 1)) * (niu / Math.pow(b, k + 1))
  );
  let r = z - squareQ * p;
  if (r < 0) r = r + Math.pow(b, k - 1);
  while (r >= p) {
    r -= p;
  }
  return r;
};

// from c2

const handleGetModuloFromC2 = (addingData, compareValue) => {
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

// return a^(-1) mod b
const findInverseOfNumber = (a, b) => {
  let isGreater = b > a;
  const numberReverse = isGreater ? a : b;
  const numberForMod = isGreater ? b : a;
  const initRowOfTable = [
    {
      i: -1,
      ri: numberForMod,
      qi: undefined,
      yi: 1,
      xi: 0,
    },
    {
      i: 0,
      ri: numberReverse,
      qi: undefined,
      yi: 0,
      xi: 1,
    },
  ];
  while (initRowOfTable.find((item) => item.ri === 1) === undefined) {
    const maxIndexOfRow = initRowOfTable.length - 1;
    const newRi = handleGetModuloFromC2(
      initRowOfTable[maxIndexOfRow - 1].ri,
      initRowOfTable[maxIndexOfRow].ri
    ).getValue();
    const newQi =
      (initRowOfTable[maxIndexOfRow - 1].ri - newRi) /
      initRowOfTable[maxIndexOfRow].ri;
    const newYi =
      initRowOfTable[maxIndexOfRow - 1].yi -
      newQi * initRowOfTable[maxIndexOfRow].yi;
    const newXi =
      initRowOfTable[maxIndexOfRow - 1].xi -
      newQi * initRowOfTable[maxIndexOfRow].xi;
    initRowOfTable.push({
      i: initRowOfTable[maxIndexOfRow].i + 1,
      ri: newRi,
      qi: newQi,
      yi: newYi,
      xi: newXi,
    });
  }
  return {
    table: initRowOfTable,
    value: isGreater
      ? handleGetModuloFromC2(
          initRowOfTable[initRowOfTable.length - 1].xi,
          b
        ).getValue()
      : handleGetModuloFromC2(
          initRowOfTable[initRowOfTable.length - 1].yi,
          b
        ).getValue(),
  };
};
