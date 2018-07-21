export const batch = (target: any[], batchSize: number) => {
  return target.reduce((res, item, index) => {
    const chunkIndex = Math.floor(index / batchSize);
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
