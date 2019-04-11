import createSpy = jasmine.createSpy;
import objectContaining = jasmine.objectContaining;
import { NbSearchService } from '@nebular/theme';

describe('NbSearchService', () => {
  it('should emit onSearchInput when searchInput called', () => {
    const term = 'term';
    const tag = 'tag';
    const searchService = new NbSearchService();
    const onSearchInputSpy = createSpy('onSearchInput');
    searchService.onSearchInput().subscribe(onSearchInputSpy);

    searchService.searchInput(term, tag);

    expect(onSearchInputSpy).toHaveBeenCalledTimes(1);
    expect(onSearchInputSpy.calls.first().args).toEqual(objectContaining([{ term, tag }]));
  });
});
