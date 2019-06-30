import AppStore from './appStore';
import PaginationStore from './paginationStore';

class RootStore {
  appStore = new AppStore(this);

  paginationStore = new PaginationStore(this);
}

export default new RootStore();
