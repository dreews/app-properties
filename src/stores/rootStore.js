import AppStore from './appStore';
import PaginationStore from './paginationStore';
import PropertiesStore from './propertiesStore';
import ZapStore from './zapStore';
import VivarealStore from './vivarealStore';

class RootStore {
  vivarealStore = new VivarealStore(this);

  zapStore = new ZapStore(this);

  propertiesStore = new PropertiesStore(this);

  appStore = new AppStore(this);

  paginationStore = new PaginationStore(this);
}

export default new RootStore();
