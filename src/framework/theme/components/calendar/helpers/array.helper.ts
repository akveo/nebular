import { Injectable } from '@angular/core';

@Injectable()
export class NbArrayHelper {
  
  splitToChunks(arr, chunkSize) {
    return arr.reduce((res, item, index) => {
      const chunkIndex = Math.floor(index/chunkSize);
      if (!res[chunkIndex]) {
        res[chunkIndex] = [];
      }
      res[chunkIndex].push(item);
      return res;
    }, [])
  }
}
