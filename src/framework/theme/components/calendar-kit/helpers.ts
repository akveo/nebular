/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const batch = (target: any[], batchSize: number, offset: number = 0) => {
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
export const range = (bound: number) => Array.from(Array(bound).keys());
