interface IItemOfDuplicateStringValue {
  value: string;
  duplicateIndex: number;
}

const checkIfArrayIsIncreasingSequence = (arrayNumber: number[]): boolean => {
  return arrayNumber.length !== 0
    ? arrayNumber.every((item, index) => item === index + 1)
    : true;
};

const generateDuplicateIndexInArray = (
  value: string
): IItemOfDuplicateStringValue[] => {
  let existArray: number[] = [];
  const result: IItemOfDuplicateStringValue[] = value
    .split("")
    .map((item, index, array) => {
      let duplicateIndex = array.findIndex(
        (stringValue) => stringValue === item
      );
      if (duplicateIndex === index) {
        existArray = [];
        return {
          value: item,
          duplicateIndex: 0,
        };
      }
      if (existArray.includes(duplicateIndex + 1)) {
        let isNotIncludeItemInExistArray: boolean = true;
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
        if (index === 3) console.log(duplicateIndex);
      }
      existArray.push(duplicateIndex + 1);
      if (checkIfArrayIsIncreasingSequence(existArray)) {
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

const handleCheckStringMatching = (
  stringBase: string,
  stringCompare: string
) => {
  if (stringBase.length < stringCompare.length)
    return new Error("stringBase must have longer length then stringCompare");
  const arrayStringBase = stringBase.split("");
  const arrayStringCompare = generateDuplicateIndexInArray(stringCompare);
  let indexOfStringCompare: number = 0;
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
      if(arrayStringBase[indexOfStringBase] ===
        arrayStringCompare[indexOfStringCompare].value) ++(indexOfStringCompare);
    }
    if (indexOfStringCompare === arrayStringCompare.length)
      return indexOfStringBase - arrayStringCompare.length + 1;
  }
  return -1;
};

