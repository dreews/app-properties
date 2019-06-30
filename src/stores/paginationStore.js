import {
  observable, action, decorate, computed,
} from 'mobx';

class PaginationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.itemsPerPage = 20;
    this.lastItem = 20;
    this.pageSelected = 0;
    this.firstItem = 0;
  }

  get getPageCount() {
    const { appStore } = this.rootStore;
    const total = appStore.getCurrentProperties.length;
    return (total / this.itemsPerPage);
  }

  get calcFirstItem() {
    return (this.pageSelected * this.itemsPerPage);
  }

  get calcLastItem() {
    return (this.firstItem + this.itemsPerPage);
  }

  setPageSelected(pageSelected) {
    this.pageSelected = pageSelected;
    this.firstItem = this.calcFirstItem;
    this.lastItem = this.calcLastItem;
  }
}

decorate(PaginationStore, {
  firstItem: observable,
  lastItem: observable,
  pageSelected: observable,
  itemsPerPage: observable,
  setPageSelected: action,
  getPageCount: computed,
  calcFirstItem: computed,
  calcLastItem: computed,
});

export default PaginationStore;
