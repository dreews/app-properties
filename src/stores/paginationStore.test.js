import PaginationStore from './paginationStore';
import rootStore from './rootStore';

const store = new PaginationStore(rootStore);

describe('PaginationStore', () => {
  store.setPageSelected(1);

  it('#setPageSelected', () => {
    expect(store.pageSelected).toEqual(1);
    expect(store.firstItem).toEqual(20);
    expect(store.lastItem).toEqual(40);
  });

  it('#calcFirstItem', () => {
    expect(store.calcFirstItem).toEqual(20);
  });

  it('#calcLastItem', () => {
    expect(store.calcLastItem).toEqual(40);
  });

  it('#getPageCount', () => {
    store.rootStore.appStore.setProperties([
      { kind: 'vivareal' },
      { kind: 'vivareal' },
      { kind: 'vivareal' },
      { kind: 'vivareal' },
      { kind: 'vivareal' },
      { kind: 'vivareal' },
    ]);
    store.rootStore.appStore.isValidToFilter = item => item.kind === 'vivareal';
    store.rootStore.appStore.isValidToVivareal = item => item.kind === 'vivareal';
    store.itemsPerPage = 2;

    expect(store.getPageCount).toEqual(3);
  });
});
