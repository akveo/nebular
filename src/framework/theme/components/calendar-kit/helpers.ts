/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const batch = <T>(target: T[], batchSize: number, offset: number = 0): T[][] => {
  return target.reduce((res, item, index) => {
    const chunkIndex = Math.floor((index + offset) / batchSize);
    if (!res[chunkIndex]) {
      res[chunkIndex] = [];
    }
    res[chunkIndex].push(item);
    return res;
  }, [])
};

/**
 * returns array with numbers from zero to bound.
 * */
export const range = <T>(bound: number, producer: (number) => T = i => i) => {
  const range = [];

  for (let i = 0; i < bound; i++) {
    range.push(producer(i));
  }

  return range;
};
