import AppStore from './appStore';

class RootStore {
  appStore = new AppStore(this);
}

export default new RootStore();
