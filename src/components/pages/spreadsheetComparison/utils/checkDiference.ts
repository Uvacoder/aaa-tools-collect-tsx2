function compare(
  dataOne: string | undefined | null,
  dataTwo: string | undefined | null
): boolean {
  if (dataOne && dataTwo) {
    let compareOne;
    let compareTwo;

    if (dataOne.match(/\r?\n|\r/g)) {
      compareOne = dataOne.replace(/\r?\n|\r/g, '');
    } else {
      compareOne = dataOne;
    }

    if (dataTwo.match(/\r?\n|\r/g)) {
      compareTwo = dataTwo.replace(/\r?\n|\r/g, '');
    } else {
      compareTwo = dataTwo;
    }
    return compareOne === compareTwo;
  }

  if ((dataOne === undefined || dataOne === null) && dataTwo) {
    return false;
  }

  if ((dataTwo === undefined || dataTwo === null) && dataOne) {
    return false;
  }

  return true;
}

export default compare;
