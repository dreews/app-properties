import {
  observable, action, decorate, computed,
} from 'mobx';
import {
  allProperties as AllPropertiesApi,
} from '../services/api';

class AppStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.allPropertiesApi = AllPropertiesApi;
    this.properties = [];
    this.portal = 'vivareal';
    this.propertyIdSelected = null;
    this.isValidToZap = rootStore.propertiesStore.isValidToZap;
    this.isValidToVivareal = rootStore.propertiesStore.isValidToVivareal;
    this.isValidToFilter = rootStore.propertiesStore.isValidToFilter;
  }

  setProperties(properties) {
    this.properties = properties;
  }

  setPropertyIdSelected(propertyId) {
    this.propertyIdSelected = propertyId;
  }

  setPortal(portal) {
    const { paginationStore } = this.rootStore;
    paginationStore.setPageSelected(0);
    this.portal = portal;
  }

  doRequestProperties() {
    const api = async (resolve, reject) => {
      try {
        const res = await this.allPropertiesApi();
        this.setProperties(res.data);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    };
    return new Promise((resolve, reject) => api(resolve, reject));
  }

  get getCurrentProperties() {
    if (this.isVivareal) {
      return this.getAllVivarealProperties;
    }

    return this.getAllZapProperties;
  }

  get getAllZapProperties() {
    return this.properties.filter(item => (
      this.isValidToFilter(item) && this.isValidToZap(item)
    ));
  }

  get getAllVivarealProperties() {
    return this.properties.filter(item => (
      this.isValidToFilter(item) && this.isValidToVivareal(item)
    ));
  }

  get isVivareal() {
    return this.portal === 'vivareal';
  }

  get getPropertySelected() {
    return this.getCurrentProperties.filter(item => (
      item.id === this.propertyIdSelected
    ));
  }
}

decorate(AppStore, {
  propertyIdSelected: observable,
  portal: observable,
  properties: observable,
  setPortal: action,
  doRequestProperties: action,
  setProperties: action,
  setPropertyIdSelected: action,
  getCurrentProperties: computed,
  getPropertySelected: computed,
  isVivareal: computed,
});

export default AppStore;
