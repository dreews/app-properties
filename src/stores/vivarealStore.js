import {
  observable, action, decorate, computed,
} from 'mobx';

class VivarealStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  isRental = businessType => (
    businessType === 'RENTAL'
  );
}

decorate(VivarealStore, {
  isRental: action,
});

export default VivarealStore;
