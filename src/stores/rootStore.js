import AppStore from './appStore';
import PaginationStore from './paginationStore';
import PropertiesStore from './propertiesStore';

class RootStore {
  propertiesStore = new PropertiesStore(this);

  appStore = new AppStore(this);

  paginationStore = new PaginationStore(this);
}

export default new RootStore();
