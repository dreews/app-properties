import {
  observable, action, decorate, computed,
} from 'mobx';

class ZapStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  isRental = businessType => (
    businessType === 'RENTAL'
  );
}

decorate(ZapStore, {
  isRental: action,
});

export default ZapStore;
