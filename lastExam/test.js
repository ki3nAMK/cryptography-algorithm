// check if n is a prime number
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

const handleGetModuloWithRememberBit = (addingData, compareValue) => {
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
const checkIfNumberIsPrimeNumber = (number, loopCount = LOOP_COUNT) => {
  if (number <= 1) return "NOT A PRIME OR COMPOSITE NUMBER !";
  let r = number - 1;
  while (r % BINARY_VARIABLE === 0) r = r / BINARY_VARIABLE;
  for (let currentLoop = 1; currentLoop <= loopCount; currentLoop++) {
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

// return list prime number
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
    const newRi = handleGetModulo(
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
      ? handleGetModulo(
          initRowOfTable[initRowOfTable.length - 1].xi,
          b
        ).getValue()
      : handleGetModulo(
          initRowOfTable[initRowOfTable.length - 1].yi,
          b
        ).getValue(),
  };
};

// Câu 1 Một số gọi là Q-prime khi nó có đúng 4 ước số nguyên dương. Hãy viết chương trình in ra các số Q-Prime nhỏ hơn hoặc bằng một số N cho trước nhập từ bàn phím.
const validateArray = (number) => {
  let indexPrime = 0;
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) ++indexPrime;
  }
  return {
    value: number,
    numbPrime: indexPrime,
  };
};

const checkQPrime = (number) => {
  const primeArray = [];
  for (let i = 2; i <= number; i++) {
    if (checkIfNumberIsPrimeNumber(i) === "Composite Number")
      primeArray.push(i);
  }
  const result = primeArray.filter(
    (primeNumb) => validateArray(primeNumb).numbPrime === 4
  );
  return result;
};

// Câu 2. Viết chương trình tìm các số nguyên tố có N chữ số với N nhập từ bàn phím và 2 ≤ N ≤10.
const checkPrimeWithFixedNumb = (number, length) => {
  const primeArray = [];
  for (let index = 2; index <= number; index++) {
    if (checkIfNumberIsPrimeNumber(index) === "Prime Number")
      primeArray.push(index);
  }
  return primeArray.filter(
    (primeNumber) =>
      Math.pow(10, length) <= primeNumber &&
      primeNumber <= Math.pow(10, length + 1) - 1
  );
};

// Câu 3. Cho một số nguyên dương N, gọi:
// -	k là số ước nguyên tố của N;
// -	q là tổng của các ước nguyên tố của N;
// -	p là tổng của các ước số của N;
// -	s là số ước của N;
// Hãy viết chương trình tính giá trị của: N+p+s-q-k với N cho trước nhập từ bàn phím.
// Ví dụ: N=24, có các ước là {1,2,3,4,6,8,12, 24} do đó:
// p=1+2+3+4+6+8+12+24=60 và s=8
// trong đó có 2 ước nguyên tố là {2,3} do đó:
// q=2+3=5 và k=2
const calculateFromSomeVariableOfNumber = (number) => {
  const listFactorOfNumber = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) listFactorOfNumber.push(i);
  }
  const countOfListFactor = listFactorOfNumber.reduce(
    (sum, item) => sum + item,
    0
  );
  const cloneListFactor = [...listFactorOfNumber].filter((item) => item !== 1);
  const listPrimeNumber = cloneListFactor.map(
    (item) => checkIfNumberIsPrimeNumber(item) === "Prime Number"
  );
  const countOfListPrime = listPrimeNumber.reduce((sum, item) => sum + item, 0);
  const result =
    number +
    countOfListFactor +
    listFactorOfNumber.length -
    listPrimeNumber.length -
    countOfListPrime;
  return result;
};

// Câu 4. Viết chương trình đếm số số nguyên tố nằm trong khoảng [A,B] với A, B nhập vào từ bàn phím.
const checkIfNumberIsPrimeNumberBelongToFixedLength = (
  fixedStart,
  fixedEnd
) => {
  const listPrimeNumber = eratosthenesAlgrolythm(fixedEnd);
  const result = listPrimeNumber.filter(
    (item) => fixedStart <= item
  );
  return result.length;
};

// Câu 5. Viết chương trình tính tổng của các số nguyên tố nằm trong khoảng [A, B] với A, B nhập vào từ bàn phím.
const calculateTotalOfListPrimeNumber = (fixedStart, fixedEnd) => {
  const listPrimeNumber = eratosthenesAlgrolythm(fixedEnd);
  const result = listPrimeNumber.filter(
    (item) => fixedStart <= item
  );
  return result.reduce((item, sum) => item + sum, 0);
};

// Câu 6. Hai số tạo thành một cặp số thân thiết khi chúng tuân theo quy luật:
//  Số này bằng tổng tất cả các ước của số kia (trừ chính số đó) và ngược lại.
// Viết chương trình tìm hai số dạng này nhỏ hơn N (với N nhập vào từ bàn phím).
const generateCheckValue = (number) => {
  const listOfFactor = [];
  for (let i = 0; i < number; i++) {
    if (number % i === 0) listOfFactor.push(i);
  }
  return {
    value: number,
    sum: listOfFactor.reduce((item, sum) => item + sum, 0),
  };
};

const getRelationshipNumber = (number) => {
  const listValidatedFactor = [];
  for (let i = 1; i <= number; i++)
    listValidatedFactor.push(generateCheckValue(i));
  const result = [];
  listValidatedFactor.forEach((objectValue) => {
    const matchingValue = listValidatedFactor.filter(
      (item) =>
        item.sum === objectValue.value &&
        item.value !== objectValue.value &&
        item.value === objectValue.sum
    );
    matchingValue.forEach((item) => {
      result.findIndex(
        (resultValue) =>
          resultValue.listNumb.reduce((sum, value) => sum + value, 0) ===
          objectValue.value + item.value
      ) === -1 && result.push({ listNumb: [objectValue.value, item.value] });
    });
  });
  return result;
};

// Câu 7. Một số emirp là một số nguyên tố mà khi đảo ngược vị trí các chữ số của nó, ta cũng được một số nguyên tố.
// Viết chương trình liệt kê các số emirp nhỏ hơn N với N nhập vào từ bàn phím.
const checkIfAEmirpNumber = (number) => {
  const listPrimeNumber = eratosthenesAlgrolythm(number);
  const result = [];
  listPrimeNumber.forEach((item) => {
    const reverseValue = Number.parseInt(
      item.toString().split("").reverse().join("")
    );
    if (checkIfNumberIsPrimeNumber(reverseValue) === "Prime Number")
      result.push(item);
  });
  return result;
};

// Câu 8. Một số gọi là số Т-prime nếu có có đúng 3 ước nguyên dương.
// Viết chương trình tìm các số Т-prime nhỏ hơn hoặc bằng N với N cho trước nhập từ bàn phím.
const checkTPrime = (number) => {
  const primeArray = [];
  for (let i = 2; i <= number; i++) {
    if (checkIfNumberIsPrimeNumber(i) === "Composite Number")
      primeArray.push(i);
  }
  const result = primeArray.filter(
    (primeNumb) => validateArray(primeNumb).numbPrime === 3
  );
  return result;
};

// Câu 9. Viết chương trình đếm số số nguyên tố nhỏ hơn hoặc bằng N với N được nhập vào từ bàn phím.
const countOfPrimeNumber = (number) => {
  return eratosthenesAlgrolythm(number).length;
};

// Câu 10. Viết chương trình đếm số ước và số ước nguyên tố của một số N nhập vào từ bàn phím.
const countOfFactorAndPrimeFactor = (number) => {
  const listFactor = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) listFactor.push(i);
  }
  const listPrimeFactor = listFactor.filter(
    (item) => checkIfNumberIsPrimeNumber(item) === "Prime Number"
  );
  return {
    countOfFactor: listFactor.length,
    countOfPrimeFactor: listPrimeFactor.length,
  };
};

// Câu 11. Viết chương trình tính tổng của các số nguyên tố nhỏ hơn hoặc bằng N với N được nhập từ bàn phím.
const countOfPrime = (number) => {
  const listPrimeNumber = eratosthenesAlgrolythm(number);
  return listPrimeNumber.reduce((item, sum) => item + sum, 0);
};

// Câu 12. Viết chương trình tìm bốn số nguyên tố liên tiếp,
// sao cho tổng của chúng là số nguyên tố nhỏ hơn hoặc bằng N (với N được nhập vào từ bàn phím).
const getListOf4ConsecutivePrimeNumber = (number) => {
  const listOfPrimeNumber = eratosthenesAlgrolythm(number);
  const result = [];
  listOfPrimeNumber.forEach((item, index, array) => {
    if (index <= array.length - 4) {
      if (
        checkIfNumberIsPrimeNumber(
          item + array[index + 1] + array[index + 2] + array[index + 3]
        ) === "Prime Number" &&
        item + array[index + 1] + array[index + 2] + array[index + 3] <= number
      )
        result.push({
          listValue: [
            item,
            array[index + 1],
            array[index + 2],
            array[index + 3],
          ],
        });
    }
  });
  return result;
};

// Câu 13. Viết chương trình tìm hai số nguyên tố nhỏ hơn hoặc bằng N với N
// nhập vào từ bàn phím, sao cho tổng và hiệu của chúng đều là số nguyên tố.
const getListNumberThatSumAndMinusArePrimeNumber = (number) => {
  const listPrimeNumber = eratosthenesAlgrolythm(number);
  const result = [];
  listPrimeNumber.forEach((item) => {
    const listMatchPrimeWithItem = listPrimeNumber.filter(
      (value) =>
        checkIfNumberIsPrimeNumber(value + item) === "Prime Number" &&
        checkIfNumberIsPrimeNumber(Math.abs(item - value)) === "Prime Number"
    );
    if (listMatchPrimeWithItem.length !== 0) {
      listMatchPrimeWithItem.forEach((value) => {
        const isValidValue = result.find(
          (existValue) =>
            existValue.listValue.includes(value) &&
            existValue.listValue.includes(item)
        );
        if (!isValidValue) result.push({ listValue: [value, item] });
      });
    }
  });
  return result;
};

// Câu 14. Viết chương trình tìm số nguyên tố có ba chữ số,
// biết rằng nếu viết số đó theo thứ tự ngược lại thì ta được một số là lập phương của một số tự nhiên.
const findNumberWithReverseIsAbs3OfSomeNumb = () => {
  const listPrimeNumber = eratosthenesAlgrolythm(999).filter(
    (item) => item >= 100 && item <= 999
  );
  const result = listPrimeNumber.filter((item) => {
    const reverseNumber = Number.parseInt(
      item.toString().split("").reverse().join("")
    );
    return Math.floor(Math.cbrt(reverseNumber)) === Math.cbrt(reverseNumber);
  });
  return result;
};

// Câu 15. Viết chương trình Hai số nguyên tố sinh đôi là hai số nguyên tố hơn kém nhau 2 đơn vị.
// Tìm hai số nguyên tố sinh đôi nhỏ hơn hoặc bằng N, với N được nhập vào từ bàn phím.
const checkIfNumberIsNextToNextPrimeNumber = (number) => {
  const listPrimeNumber = eratosthenesAlgrolythm(number);
  const result = [];
  listPrimeNumber.forEach((item) => {
    if (listPrimeNumber.includes(item + 2))
      result.push({ listValue: [item, item + 2] });
  });
  return result;
};

// Câu 16.   chương trình tìm các số nguyên tố từ một mảng sinh
// ngẫu nhiên có kích thước N, với N nhập vào từ bàn phím.
const getPrimeNumberFromRandomArrayWithfixedLength = (number) => {
  const randomArray = [];
  for (let i = 1; i <= number; i++)
    randomArray.push(Math.floor(Math.random() * Math.pow(number, 2)));
  return randomArray.filter(
    (item) => checkIfNumberIsPrimeNumber(item) === "Prime Number"
  );
};

// Câu 17. Viết chương trình tìm số nguyên dương x nhỏ nhất sao cho giá trị
// của biểu thức Ax^2+Bx+C là một số nguyên tố với A,B,C là các số nguyên nhập vào từ bàn phím.

function getSmallerPositiveInteger(a, b) {
  if (Number.isInteger(a) && a > 0 && Number.isInteger(b) && b > 0) {
    return Math.min(a, b);
  } else if (Number.isInteger(a) && a > 0) {
    return a;
  } else if (Number.isInteger(b) && b > 0) {
    return b;
  } else {
    return -1;
  }
}

const getGreatestNumberOfXWithCondition = (A, B, C) => {
  let result = -1;
  let initListPrime = 10;
  let priviousListPrime = 0;
  while (result === -1) {
    const listPrime = eratosthenesAlgrolythm(initListPrime).filter(
      (value) => !eratosthenesAlgrolythm(priviousListPrime).includes(value)
    );
    listPrime.forEach((primeValue) => {
      if (result === -1) {
        if (A === 0)
          return B > 0
            ? primeValue - C >= 0
              ? Math.floor((primeValue - C) / B) + 1
              : 0
            : (primeValue - C) / B;
        const delta = Math.pow(B, 2) - 4 * (C - primeValue) * A;
        if (delta >= 0) {
          const firstValue = (-1 * B + Math.sqrt(delta)) / (2 * A);
          const secondValue = (-1 * B - Math.sqrt(delta)) / (2 * A);
          const resultInit = getSmallerPositiveInteger(firstValue, secondValue);
          if (resultInit !== -1) {
            result = resultInit;
          }
          priviousListPrime = initListPrime;
          initListPrime = 2 * initListPrime;
        }
      }
    });
  }
  return result;
};

// Câu 18. Áp dụng thuật toán đã được học để viết chương trình tính tổng của hai
// số nguyên lớn, hiển thị dưới mạng mảng và dạng số nguyên.
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
    const [newRememberBit, dataAfterGetModulo] = handleGetModuloWithRememberBit(
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

const getNumbFromArr = (t, arr, w) => {
  let result = 0;
  for (let i = 0; i < t; i++) {
    result += Math.pow(2, w * (t - 1 - i))*arr[i];
  }
  return result;
};

const getSumCalculation = (numb1, numb2) => {
  const tConstant = 4;
  const wConstant = 8;
  const arr1 = createArrayNumb(tConstant, numb1, wConstant);
  const arr2 = createArrayNumb(tConstant, numb2, wConstant);
  const result = multiprecisionCalculation(
    wConstant,
    tConstant,
    arr1,
    arr2,
    "add"
  );
  return getNumbFromArr(tConstant,result.data,wConstant);
};

// Câu 19. Viết chương trình in ra các số nguyên dương x nằm trong khoảng [m,l]
// sao cho giá trị của biểu thức Ax^2+Bx+C là một số nguyên tố. Với A,B,C, m,l
// là các số nguyên nhập từ bàn phím (m<l).
const getXFromFixedLengthWithCondition = (A, B, C, m, l) => {
  if (m >= l) return new Error("l must greater than m");
  const resultList = [];
  for (let x = m; x <= l; x++) {
    if (checkIfNumberIsPrimeNumber(A * Math.pow(x, 2) + B * x + C))
      resultList.push(x);
  }
  return resultList.filter((item) => item >= 0);
};

// Câu 20. Viết chương trình in ra các cặp số (A,B) nằm trong khoảng (M,N) sao cho
// ước số chung lớn nhất của A và B có giá trị là một số D cho trước. Với M,N,D nhập
// vào từ bàn phím. (0<M,N, D < 1000).
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

const getGCDFromFixedLength = (M, N, D) => {
  if (!(0 < M && 0 < N && 0 < D && M < 1000 && (N < 1000) & (D < 1000)))
    return new Error("M , N , D is not valid");
  const resultList = [];
  for (let A = M + 1; A < N; A++) {
    for (let B = M + 1; B < N; B++) {
      if (getGCDFromTwoNumber(A, B) === D) {
        if (
          resultList.findIndex(
            (item) => item.valueList.includes(A) && item.valueList.includes(B)
          ) === -1
        )
          resultList.push({ valueList: [A, B] });
      }
    }
  }
  return resultList;
};

// Câu 21. Một số gọi là siêu số nguyên tố nếu số lượng các số nguyên tố từ 1 đến
// X (ngoại trừ X) là một số nguyên tố. Hãy viết chương trình đếm số lượng các siêu
// số nguyên tố này trong khoảng [A,B] cho trước nhập từ bàn phím
const getSuperPrimeNumberFromFixedlength = (A, B) => {
  const resultlist = [];
  for (let i = A; i <= B; i++) {
    const listPrimeNumberFromI = eratosthenesAlgrolythm(i).filter(
      (value) => value !== i
    );
    if (listPrimeNumberFromI.length === 1) resultlist.push(i);
  }
  return resultlist;
};

// Câu 22. Với một số nguyên dương N thoả mãn 0<N<10000, đặt:
// F ( N ) = N nếu N là một số nguyên tố
// F ( N ) = 0 nếu là hợp số
// Cho  L và R nhập vào từ bàn phím, với mọi cặp i , j trong khoảng [ L , R ]
// hãy viết chương trình in ra màn hình giá trị tổng của F ( i ) * F ( j ) với
//  j > i.
const getValuefromFixedFunction = (L, R) => {
  const result = [];
  if (L >= R) return new Error("L, R is not valid !");
  for (let i = L; i <= R; i++) {
    for (let j = L; j <= R; j++) {
      const valueI =
        checkIfNumberIsPrimeNumber(i) === "Prime Number"
          ? i
          : checkIfNumberIsPrimeNumber(i) === "Composite Number" && 0;
      const valueJ =
        checkIfNumberIsPrimeNumber(j) === "Prime Number"
          ? j
          : checkIfNumberIsPrimeNumber(j) === "Composite Number" && 0;
      result.push(valueI * valueJ);
    }
  }
  return result.reduce((sum, value) => sum + value, 0);
};

// 2 , 100 -> 528902
// 2 , 10 -> 101
// 10, 100 -> 511070

// Câu 23. Viết chương trình in ra màn hình YES trong trường hợp tổng của
// các số nguyên tố trong khoảng [A, B] là cũng là một số nguyên tố và NO
// nếu ngược lại. Với A,B là hai số được nhập vào từ bàn phím.
const returnYESIfSumIsPrimeNumber = (A, B) => {
  if (A >= B) return new Error("A,B is not valid");
  const getListPrimeNumber = eratosthenesAlgrolythm(B).filter(
    (item) => item >= A
  );
  const lastResult = getListPrimeNumber.reduce((sum, item) => sum + item, 0);
  return checkIfNumberIsPrimeNumber(lastResult) === "Prime Number"
    ? "YES"
    : checkIfNumberIsPrimeNumber(lastResult) === "Composite Number" && "NO";
};

// Câu 24. Đặt S1, S2 là các mảng chứa giá trị bình phương của các số nguyên.
// Hãy viết chương trình in ra số lượng tất cả các số nguyên tố nằm trong khoảng
// [a,b] sao cho số này cũng là tổng của hai số x và y với x thuộc S1 và y thuộc S2.
// Trong đó, a,b là các số được nhập từ bàn phím
// Ví dụ: với a=10, b =15, in ra giá trị là 1 vì trong khoảng [10,15] chỉ có 2 số
// nguyên tố 11 và 13, nhưng chỉ có 13 = 2^2 + 3^2=4+9.
const getPowBy2OfValueIsPrimeNumber = (a, b) => {
  const getMaxPowBy2 = Math.floor(Math.sqrt(b));
  const listSqrt = [];
  let result = [];
  for (let i = 1; i <= getMaxPowBy2; i++) listSqrt.push(Math.pow(i, 2));
  for (let x = 1; x <= getMaxPowBy2; x++) {
    listSqrt.forEach((item) => {
      const value = item + Math.pow(x, 2);
      if (
        checkIfNumberIsPrimeNumber(value) === "Prime Number" &&
        value >= a &&
        value <= b
      ) {
        if (!result.includes(value)) result.push(value);
      }
    });
  }
  return result;
};

// Câu 25. Cho 2 số M và N thoả mãn điều kiện: 1<=N<=10000; 2<M<=100;
//  Hãy viết chương trình xác định xem số N có thể được phân tích thành tổng
//  của M số nguyên tố hay không? Nếu có thì in ra các số đó.
// Ví dụ: N=10 và M=3, thì 10=2+3+5 do đó kết quả trả về là
// thoả mãn và in ra 3 số 2,3,5.

const devideNumberTo2PrimeNumber = (number) => {
  const result = [];
  const listPrimeNumber = eratosthenesAlgrolythm(number);
  for (let i = listPrimeNumber.length - 1; i >= 0; i--) {
    const value = listPrimeNumber.find(
      (item) => listPrimeNumber[i] + item === number
    );
    if (
      value !== undefined &&
      result.findIndex(
        (item) =>
          item.listValue.includes(value) &&
          item.listValue.includes(listPrimeNumber[i])
      ) === -1
    )
      result.push({ listValue: [value, listPrimeNumber[i]] });
  }
  return result;
};

// !ERROR
const checkIfNIsCombinationOfMPrimeNumber = (N, M) => {
  let maxLength = 2;
  let listResult = devideNumberTo2PrimeNumber(N);
  if (listResult.length === 0) return false;
  while (maxLength !== M) {
    listResult.forEach((setValue, index) => {
      if (setValue.listValue.length === maxLength) {
        let isDoneFind = false;
        let result = [...setValue.listValue];
        setValue.listValue.forEach((value) => {
          if (devideNumberTo2PrimeNumber(value).length !== 0 && !isDoneFind) {
            const newArray = [...setValue.listValue];
            var indexExistItem = [...setValue.listValue].indexOf(value);
            newArray.splice(indexExistItem, 1);
            isDoneFind = true;
            result = [
              ...newArray,
              ...devideNumberTo2PrimeNumber(value)[0].listValue,
            ];
          }
        });
        listResult[index] = { listValue: result };
      }
    });
    console.log(listResult);
    if (
      listResult.find((value) => value.listValue.length === maxLength + 1) !==
      undefined
    ) {
      ++maxLength;
    } else {
      return false;
    }
  }
  return listResult.find((value) => value.listValue.length === M);
};


// Câu 26. Một số được gọi là số mạnh mẽ khi nó đồng thời vừa chia hết cho
// số nguyên tố và chia hết cho bình phương của số nguyên tố đó. Tìm số mạnh
//  mẽ nhỏ hơn số N cho trước (N < 10000).
const checkIfNIsStrongNumber = (N) => {
  const result = [];
  for (let i = 2; i < N; i++) {
    const listPrimefromI = eratosthenesAlgrolythm(i);
    const listFactor = listPrimefromI.filter(
      (value) => i % value === 0 && i % Math.pow(value, 2) === 0
    );
    if (listFactor.length !== 0) result.push(i);
  }
  return result;
};

// Câu 27. Viết chương trình in ra các cặp số (a,b) thoả mãn điều kiện 0<a,b<1000,
// sao cho ước chung lớn nhất của 2 số đó là một số nguyên tố.

// !TODO: TIME OUT
const getNumbThatGCDIsPrimeNumber = () => {
  const result = [];
  for (let a = 1; a < 1000; a++) {
    for (let b = 1; b < 1000; b++) {
      const gcdValue = getGCDFromTwoNumber(a, b);
      if (checkIfNumberIsPrimeNumber(gcdValue) === "Prime Number") {
        if (
          result.findIndex(
            (data) => data.valueList.includes(a) && data.valueList.includes(b)
          ) === -1
        )
          result.push({ valueList: [a, b] });
      }
    }
  }
  return result;
};

//Câu 28. Viết chương trình tìm các số Carmichael (là các số giả nguyên
// tố n thoả mãn điều kiện là hợp số và thoả mãn b^(n-1)≡1 (mod n) với mọi số nguyên dương
// b nguyên tố cùng nhau với n) nhỏ hơn một số N cho trước nhập vào từ bàn phím
// (với điều kiện 0≤N≤10000. (N<1000 => 561)
const checkIfNumberIsCarmichaelNumber = (N) => {
  const result = [];
  for (let i = 3; i < N; i++) {
    let isNotCarmichaelNumber = false;
    if (checkIfNumberIsPrimeNumber(i) === "Composite Number") {
      for (let b = 2; b < i; b++) {
        if (getGCDFromTwoNumber(b, i) === 1) {
          if (getValueFromComplicatedModulo(b, i - 1, i) !== 1) {
            isNotCarmichaelNumber = true;
          }
        }
      }
      if (!isNotCarmichaelNumber) result.push(i);
    }
  }
  return result;
};

// Câu 29. Viết chương trình đếm số các số Carmichael (là các số giả nguyên tố n
//   thoả mãn điều kiện là hợp số và thoả mãn b^(n-1)≡1 (mod n) với mọi số nguyên
//   dương b nguyên tố cùng nhau với n) nhỏ hơn một số N cho trước nhập vào từ bàn
//    phím (với điều kiện 0≤N≤10000.
const getLengthOfCarmichaelNumber = (N) => {
  const result = [];
  for (let i = 3; i < N; i++) {
    let isNotCarmichaelNumber = false;
    if (checkIfNumberIsPrimeNumber(i) === "Composite Number") {
      for (let b = 2; b < i; b++) {
        if (getGCDFromTwoNumber(b, i) === 1) {
          if (getValueFromComplicatedModulo(b, i - 1, i) !== 1) {
            isNotCarmichaelNumber = true;
          }
        }
      }
      if (!isNotCarmichaelNumber) result.push(i);
    }
  }
  return result.length;
};

// Câu 30. Viết chương trình tính tổng của các số Carmichael (là các số giả nguyên
//   tố n thoả mãn điều kiện là hợp số và thoả mãn b^(n-1)≡1 (mod n) với mọi số
//   nguyên dương b nguyên tố cùng nhau với n) nhỏ hơn một số N cho trước nhập vào
//   từ bàn phím (với điều kiện 0≤N≤10000.
const getSumOfCarmichaelNumber = (N) => {
  const result = [];
  for (let i = 3; i < N; i++) {
    let isNotCarmichaelNumber = false;
    if (checkIfNumberIsPrimeNumber(i) === "Composite Number") {
      for (let b = 2; b < i; b++) {
        if (getGCDFromTwoNumber(b, i) === 1) {
          if (getValueFromComplicatedModulo(b, i - 1, i) !== 1) {
            isNotCarmichaelNumber = true;
          }
        }
      }
      if (!isNotCarmichaelNumber) result.push(i);
    }
  }
  return result.reduce((sum, item) => sum + item, 0);
};

// Câu 31. Áp dụng theo các thuật toán đã được học trong phần lí thuyết em
// hãy cài đặt chương trình:
// -	Tìm số nguyên tố k gần nhất với phần số của mã số sinh viên của mình
// (trong trường hợp khoảng cách bằng nhau thì lấy số nhỏ hơn).
// -	Từ số k tìm được tính a^k mod n với a = SBD, n = 123456.
const findNearestPrimeNumberAndDoCalculation = (a, n) => {
  const primeNumber = { lowerPrimeNumber: -1, higherPrimeNumber: -1 };
  let startOfPrimeNumber = a;
  while (primeNumber.lowerPrimeNumber === -1) {
    --startOfPrimeNumber;
    if (checkIfNumberIsPrimeNumber(startOfPrimeNumber) === "Prime Number")
      primeNumber.lowerPrimeNumber = startOfPrimeNumber;
  }
  startOfPrimeNumber = a;
  while (primeNumber.higherPrimeNumber === -1) {
    ++startOfPrimeNumber;
    if (checkIfNumberIsPrimeNumber(startOfPrimeNumber) === "Prime Number")
      primeNumber.higherPrimeNumber = startOfPrimeNumber;
  }
  const nearestPrimeNumber =
    Math.abs(a - primeNumber.lowerPrimeNumber) >
    Math.abs(a - primeNumber.higherPrimeNumber)
      ? primeNumber.higherPrimeNumber
      : primeNumber.lowerPrimeNumber;
  return getValueFromComplicatedModulo(a, nearestPrimeNumber, n);
};

// Câu 32. Áp dụng các thuật toán đã được học em hãy cài đặt chương trình giải bài
// toán mô phỏng cách mã và giải mã của hệ mật RSA như sau:
// -	Tìm số nguyên tố p, q (trong đó 100 < p, q < 500)
// -	Tính n = p.q; (n) = (p – 1) (q – 1)
// -	Chọ n e là số nguyên tố cùng nhau với (n) (gcd(e, (n)) = 1) và tính d = e-1
//  mod (n)
// -	Tính bản mã c của thông điệp m, với m = SBD + 123, c = me mod n
// -	Giải mã thông điệp, tính m = cd mod n
const MIN_NUMBER = 101;
const MAX_NUMBER = 499;

function getRandomPrime(min, max) {
  let prime = 0;
  while (true) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (checkIfNumberIsPrimeNumber(num) === "Prime Number") {
      prime = num;
      break;
    }
  }
  return prime;
}

// !ERROR: NUMBER GOT WRONG WITH HIGH SBD
const decodeAndEncodeByRSAAlgorythm = (sbd) => {
  const p = getRandomPrime(MIN_NUMBER, MAX_NUMBER);
  const q = getRandomPrime(MIN_NUMBER, MAX_NUMBER);

  const n = p * q,
    phiN = (p - 1) * (q - 1);
  let e = 2;
  while (
    !(
      checkIfNumberIsPrimeNumber(e) === "Prime Number" &&
      getGCDFromTwoNumber(e, phiN) === 1
    )
  )
    e++;
  const d = findInverseOfNumber(e, phiN).value;
  const encodeSBD = getValueFromComplicatedModulo(sbd + 123, e, n);
  const decodeSBD = getValueFromComplicatedModulo(encodeSBD, d, n);
  return {
    encode: encodeSBD,
    decode: decodeSBD,
  };
};


// Câu 33. Áp dụng thuật toán Euclide mở rộng đã được học tìm đa thức nghịch
// đảo trên trường hữu hạn GF(2^3) với đa thức bất khả quy g(x) = x3 + x + 1.
const polynomialToBinary = (polynomial) => {
  polynomial = polynomial.replace(/\s+/g, "");
  const terms = polynomial.split("+");
  let maxPower = 0;
  terms.forEach((term) => {
    if (term === "1") {
      return;
    } else if (term.includes("x")) {
      const power = term.split("x")[1] || "1";
      if (parseInt(power) > maxPower) {
        maxPower = power;
      }
    }
  });

  let binaryArray = Array(parseInt(maxPower) + 1).fill(0);

  terms.forEach((term) => {
    if (term === "1") {
      binaryArray[0] = 1;
    } else if (term === "x") {
      binaryArray[1] = 1;
    } else if (term.includes("x")) {
      const power = term.split("x")[1] || "1";
      binaryArray[parseInt(power)] = 1;
    }
  });

  return binaryArray.reverse().join("");
};

const binaryToPolynomial = (binary) => {
  let polynomial = [];

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === "1") {
      let power = binary.length - 1 - i;
      if (power === 0) {
        polynomial.push("1");
      } else if (power === 1) {
        polynomial.push("x");
      } else {
        polynomial.push(`x${power}`);
      }
    }
  }

  return polynomial.join("+");
};

const binaryToInt = (binary) => parseInt(binary, 2);
const intToBinary = (number) => number.toString(2);

const handleMultipleBits = (bits, bitsMultiple) => {
  let result = 0;
  bitsMultiple
    .split("")
    .reverse()
    .forEach((bit, index) => {
      if (bit === "1") result = result ^ (binaryToInt(bits) << index);
    });
  return intToBinary(result);
};

const handleGetModuloOfBits = (bits, moduleBits) => {
  const validBitLength = moduleBits.split("").length;
  let remainBits = bits;
  let multipleBits = "";
  while (
    bits.split("").findIndex((bit) => bit === "1") === 0 &&
    remainBits.length >= validBitLength
  ) {
    remainBits = intToBinary(
      binaryToInt(remainBits) ^
        (binaryToInt(moduleBits) << (remainBits.length - validBitLength))
    );
    multipleBits += "1";
  }

  return { remainBits, multipleBits };
};

const handleGetInverseOfReciprocalPolynomial = (ax, gx) => {
  const axBitsForm = polynomialToBinary(ax);
  const gxBitsForm = polynomialToBinary(gx);
  const initRowBitsOfTable = [
    {
      i: -1,
      ri: gxBitsForm,
      qi: undefined,
      yi: "1",
      xi: "0",
    },
    {
      i: 0,
      ri: axBitsForm,
      qi: undefined,
      yi: "0",
      xi: "1",
    },
  ];
  while (initRowBitsOfTable.find((item) => item.ri === "1") === undefined) {
    const maxIndexOfRow = initRowBitsOfTable.length - 1;
    const { remainBits: newRi, multipleBits: newQi } = handleGetModuloOfBits(
      initRowBitsOfTable[maxIndexOfRow - 1].ri,
      initRowBitsOfTable[maxIndexOfRow].ri
    );
    const newYi = intToBinary(
      binaryToInt(initRowBitsOfTable[maxIndexOfRow - 1].yi) ^
        binaryToInt(
          handleMultipleBits(newQi, initRowBitsOfTable[maxIndexOfRow].yi)
        )
    );
    const newXi = intToBinary(
      binaryToInt(initRowBitsOfTable[maxIndexOfRow - 1].xi) ^
        binaryToInt(
          handleMultipleBits(newQi, initRowBitsOfTable[maxIndexOfRow].xi)
        )
    );
    initRowBitsOfTable.push({
      i: initRowBitsOfTable[maxIndexOfRow].i + 1,
      ri: newRi,
      qi: newQi,
      yi: newYi,
      xi: newXi,
    });
  }
  return {
    table: initRowBitsOfTable,
    valueInBitsType: initRowBitsOfTable[initRowBitsOfTable.length - 1].xi,
    valueInIntType: binaryToInt(
      initRowBitsOfTable[initRowBitsOfTable.length - 1].xi
    ),
    valueInpolynomialType: binaryToPolynomial(
      initRowBitsOfTable[initRowBitsOfTable.length - 1].xi
    ),
  };
};

// console.log(handleGetInverseOfReciprocalPolynomial('x6+x4+x+1','x8+x4+x3+x+1'))
// x7+x6+x3+x

// Câu 34. Cài đặt thuật toán kiểm tra số nguyên tố Fermat.
// Trong trường hợp số nào thì thuật toán cho kết quả kiểm tra sai.
const fermatCheckingPrimeNumber = (number, loopCount = BINARY_VARIABLE) => {
  for (let i = 1; i <= loopCount; i++) {
    const randomNumber = Math.floor(Math.random() * (number - 2)) + 2;
    const valueFromModule = getValueFromComplicatedModulo(
      randomNumber,
      number - 1,
      number
    );
    // !TODO => in case number is Carmichael => the result will be prime number;
    if (valueFromModule !== 1) return "Composive Number";
  }
  return "Prime Number";
};

// Câu 35. Cài đặt thuật toán kiểm tra số nguyên tố Miller-Rabin in ra kết luận về 1
// số nguyên dương N nhập vào từ bàn phím với xác suất kết luận tương ứng sau thuật toán.
const millerRabinAlgorithmAboutPrimeNumber = (
  number,
  loopCount = LOOP_COUNT
) => {
  const result = checkIfNumberIsPrimeNumber(number, loopCount);
  return result;
};

// Câu 36. Lập trình tìm kiếm xâu S1 trong xâu S2 theo thuật toán Boyer-Moore, in giá
// trị của bảng. Trong trường hợp nào thì thuật toán Boyer-Moore được xem là cải tiến
// hơn thuật toán tìm kiếm vét cạn.
const createTableOfMatchingWord = (string) => {
  const tableOfString = [];
  string.split("").forEach((letter, index) => {
    const stepOfWord = string.split("").length - index - 1;
    if (tableOfString.findIndex((column) => column.letter === letter) === -1) {
      tableOfString.push({
        letter,
        stepOfWord,
      });
    } else {
      const indexOfLetter = tableOfString.findIndex(
        (column) => column.letter === letter
      );
      tableOfString[indexOfLetter].stepOfWord = stepOfWord;
    }
    if (stepOfWord === 0) {
      tableOfString[tableOfString.length - 1].stepOfWord =
        string.split("").length;
    }
  });
  return tableOfString;
};

const stringMatchingBoyerMoore = (string1, string2) => {
  const tableOfMatchingLetter = createTableOfMatchingWord(string2);
  let indexOfLongString = string2.length - 1;
  let result = {
    isFound: false,
    matchingIndex: -1,
  };
  while (!result.isFound && indexOfLongString < string1.length) {
    let cloneIndexOfLongString = indexOfLongString;
    let indexOfCompareString = string2.length - 1;

    while (
      string1.split("")[cloneIndexOfLongString] ===
      string2.split("")[indexOfCompareString]
    ) {
      --cloneIndexOfLongString;
      --indexOfCompareString;
    }
    if (indexOfCompareString === -1) {
      result.isFound = true;
      result.matchingIndex = cloneIndexOfLongString + 1;
    } else {
      const isLetterInTable = tableOfMatchingLetter.find(
        (letter) => letter.letter === string1.split("")[cloneIndexOfLongString]
      );
      const step = isLetterInTable
        ? isLetterInTable.stepOfWord
        : string2.length;
      indexOfLongString += step;
    }
  }
  // !TODO: is good for normal text, bad for binary text
  return result;
};

// Câu 37. Lập trình tìm kiếm xâu S1 trong xâu S2 theo thuật toán Knutt-Morris-Patt.
// Trong trường hợp nào thì thuật toán Boyer-Moore được xem là cải tiến hơn thuật
// toán tìm kiếm vét cạn?
const checkIfArrayIsIncreasingSequenceTest = (arrayNumber) => {
  return arrayNumber.length !== 0
    ? arrayNumber.every((item, index) => item === index + 1)
    : true;
};

const generateDuplicateIndexInArrayTest = (value) => {
  let existArray = [];
  const result = value.split("").map((item, index, array) => {
    let duplicateIndex = array.findIndex((stringValue) => stringValue === item);
    if (duplicateIndex === index) {
      existArray = [];
      return {
        value: item,
        duplicateIndex: 0,
      };
    }
    if (existArray.includes(duplicateIndex + 1)) {
      let isNotIncludeItemInExistArray = true;
      let currentIndexInExistArray = duplicateIndex + 1;
      while (isNotIncludeItemInExistArray) {
        if (
          existArray.length - currentIndexInExistArray + 1 !== 0 &&
          item ===
            array[index - (existArray.length - currentIndexInExistArray + 1)]
        ) {
          currentIndexInExistArray += 1;
        } else {
          isNotIncludeItemInExistArray = false;
        }
      }
      duplicateIndex = currentIndexInExistArray - 1;
    }
    existArray.push(duplicateIndex + 1);
    if (checkIfArrayIsIncreasingSequenceTest(existArray)) {
      return {
        value: item,
        duplicateIndex: duplicateIndex + 1,
      };
    }
    existArray = [];
    return {
      value: item,
      duplicateIndex: 0,
    };
  });
  return result;
};

const handleCheckStringMatchingTest = (stringBase, stringCompare) => {
  if (stringBase.length < stringCompare.length)
    return new Error("stringBase must have longer length then stringCompare");
  const arrayStringBase = stringBase.split("");
  const arrayStringCompare = generateDuplicateIndexInArrayTest(stringCompare);
  console.log(arrayStringCompare);
  let indexOfStringCompare = 0;
  for (
    let indexOfStringBase = 0;
    indexOfStringBase < arrayStringBase.length;
    indexOfStringBase++
  ) {
    if (
      arrayStringBase[indexOfStringBase] ===
      arrayStringCompare[indexOfStringCompare].value
    ) {
      ++indexOfStringCompare;
    } else {
      while (
        !(
          arrayStringBase[indexOfStringBase] ===
            arrayStringCompare[indexOfStringCompare].value ||
          indexOfStringCompare === 0
        )
      ) {
        indexOfStringCompare =
          indexOfStringCompare !== 0
            ? arrayStringCompare[indexOfStringCompare - 1].duplicateIndex
            : 0;
      }
      if (
        arrayStringBase[indexOfStringBase] ===
        arrayStringCompare[indexOfStringCompare].value
      )
        ++indexOfStringCompare;
    }
    if (indexOfStringCompare === arrayStringCompare.length)
      return indexOfStringBase - arrayStringCompare.length + 1;
  }
  // !TODO: KMP algorithm is good at big file data for read each index and no turning back
  return -1;
};

// Câu 38. Tìm nghịch đảo của một số a trong trường F_p với a và p được nhập từ bàn phím.
const findInverseOfNumberInFpEnvironment = (number, environmentVariable) => {
  return findInverseOfNumber(number, environmentVariable);
};

// Câu 39. Cho mảng A nhập từ bàn phím gồm các số nguyên dương. Hãy viết chương trình tìm các
// cặp số (i,j) trong mảng A sao cho ước chung lớn nhất của chúng là một số nguyên tố.
const findCoupleOfNumberInArrayThatTheirGCDIsPrimeNumber = (listNumber) => {
  const result = [];
  listNumber.forEach((item) => {
    const listNumberMatchCondition = listNumber.filter(
      (value) =>
        checkIfNumberIsPrimeNumber(getGCDFromTwoNumber(value, item)) ===
        "Prime Number"
    );
    listNumberMatchCondition.forEach((matchValue) => {
      if (
        result.findIndex(
          (coupleOfValue) =>
            coupleOfValue.pairOfValue.includes(matchValue) &&
            coupleOfValue.pairOfValue.includes(item)
        ) === -1 &&
        matchValue !== item
      ) {
        result.push({ pairOfValue: [matchValue, item] });
      }
    });
  });
  return result;
};

// Câu 40. Cho mảng A nhập từ bàn phím gồm các số nguyên dương. Hãy viết chương trình
// đếm các cặp số (i,j) trong mảng A sao cho ước chung lớn nhất của chúng là một số nguyên tố.
const CountNumberCoupleOfNumberInArrayThatTheirGCDIsPrimeNumber = (
  listNumber
) => {
  const result = [];
  listNumber.forEach((item) => {
    const listNumberMatchCondition = listNumber.filter(
      (value) =>
        checkIfNumberIsPrimeNumber(getGCDFromTwoNumber(value, item)) ===
        "Prime Number"
    );
    listNumberMatchCondition.forEach((matchValue) => {
      if (
        result.findIndex(
          (coupleOfValue) =>
            coupleOfValue.pairOfValue.includes(matchValue) &&
            coupleOfValue.pairOfValue.includes(item)
        ) === -1 &&
        matchValue !== item
      ) {
        result.push({ pairOfValue: [matchValue, item] });
      }
    });
  });
  return result.length;
};

// Câu 41. Cho các số nguyên dương a,k,n, nhập từ bàn phím (0<a,k<n<1000), Viết chương trình
// xác định xem ak mod n có phải là một số nguyên tố hay không (sử dụng thuật toán bình phương
// và nhân có lặp)?
const checkIfValueOfComplicatedModuleIsPrimeNumbber = (a, k, n) => {
  const valueOfModule = getValueFromComplicatedModulo(a, k, n);
  const isPrimeNumber =
    checkIfNumberIsPrimeNumber(valueOfModule) === "Prime Number";
  return isPrimeNumber ? "Prime Number" : "Composite Number";
};

// Câu 42. Viết chương trình sinh ra 2 số nguyên tố 0<p,q<1000 và kiểm tra với với số 0<a<100 thì
// những số nào thoả mãn: ap mod q là số nguyên tố.
const checkIfValueFromComplicatedValueWithRandomNumberIsAPrimeNumber = () => {
  const p = getRandomPrime(1, 999);
  const q = getRandomPrime(1, 999);
  const result = [];
  for (let i = 1; i < 100; i++) {
    if (
      checkIfNumberIsPrimeNumber(getValueFromComplicatedModulo(i, p, q)) ===
      "Prime Number"
    )
      result.push(i);
  }
  return result;
};

// Câu 43. Cho N nhập vào từ bàn phím (0<N<1000), hãy viết chương trình tìm tất cả các số nguyên a<N sao
// cho ap mod N là số nguyên tố.
const findResultFromFixLengthWithModuloIsPrimeNumber = (N) => {
  const result = [];
  const p = getRandomPrime(1, 999);
  for (let i = 1; i < N; i++) {
    if (
      checkIfNumberIsPrimeNumber(getValueFromComplicatedModulo(i, p, N)) ===
      "Prime Number"
    )
      result.push(i);
  }
};

// Câu 44. Cho mảng A gồm các số nguyên thuộc F_p nhập vào từ bàn phím, hãy viết chương trình in
// ra mảng B có các phần tử là nghịch đảo của các phần tử tương ứng trong A.
const getInverseFromListNumber = (arrayNumber, p) => {
  return arrayNumber.map((value) => findInverseOfNumber(value, p));
};

// Câu 45. Viết chương trình sinh một mảng số nguyên tố A gồm N phần tử (N nhập từ bàn phím) sử dụng
// kiểm tra Miller-Rabin. In ra mảng và tính khoảng cách nhỏ nhất giữa 2 số bất kỳ trong mảng.
const findTheSmallestGapOF2PrimeNumberFromArrayWithFixedLength = (N) => {
  const listRandomPrime = [];
  while (listRandomPrime.length !== N) {
    const randomNumber = Math.floor(Math.random() * Math.pow(N, 2));
    if (
      checkIfNumberIsPrimeNumber(randomNumber) === "Prime Number" &&
      !listRandomPrime.includes(randomNumber)
    )
      listRandomPrime.push(randomNumber);
  }
  let minDistance = Infinity;
  let minDistancePair = [];
  for (let i = 0; i < listRandomPrime.length - 1; i++) {
    for (let j = i + 1; j < listRandomPrime.length; j++) {
      let distance = Math.abs(listRandomPrime[i] - listRandomPrime[j]);
      if (distance < minDistance && distance !== 0) {
        minDistancePair = [listRandomPrime[i], listRandomPrime[j]];
        minDistance = distance;
      }
    }
  }
  return {
    listRandomPrime,
    minDistance,
    minDistancePair,
  };
};
