import {getDeepFromObject} from '@nebular/auth/helpers';


describe('getDeepFromObject', () => {
  it('extract the the value', () => {
    expect(getDeepFromObject({result: {data: 1}}, 'result.data', 2)).toBe(1);
  });

  it('extract the the whole object', () => {
    expect(getDeepFromObject({result: {data: 1}}, '', 2)).toEqual({result: {data: 1}});
  });
});
