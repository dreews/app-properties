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
  }

  isRental = businessType => (
    businessType === 'RENTAL'
  );

  isSale = businessType => (
    !this.isRental(businessType)
  );

  isPricingInfos = item => (
    !item && !item.pricingInfos
  );

  isValidToZap = pricingInfos => (
    this.isRental(pricingInfos.businessType)
      ? pricingInfos.rentalTotalPrice >= 3500
      : pricingInfos.price >= 600000
  );

  isValidToVivareal = pricingInfos => (
    this.isRental(pricingInfos.businessType)
      ? pricingInfos.rentalTotalPrice <= 4000
      : pricingInfos.price <= 700000
  );

  setProperties(properties) {
    this.properties = properties;
  }

  setPortal(portal) {
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

  get getAllZapProperties() {
    return this.getAllPropeties.filter((item) => {
      if (this.isPricingInfos(item)) {
        return false;
      }

      return this.isValidToZap(item.pricingInfos);
    });
  }

  get getAllVivarealProperties() {
    return this.getAllPropeties.filter((item) => {
      if (this.isPricingInfos(item)) {
        return false;
      }

      return this.isValidToVivareal(item.pricingInfos);
    });
  }

  get getAllPropeties() {
    return this.properties;
  }

  get getCurrentProperties() {
    if (this.getPortal === 'zap') {
      return this.getAllZapProperties;
    }

    if (this.getPortal === 'vivareal') {
      return this.getAllVivarealProperties;
    }

    return this.getAllPropeties;
  }

  get getPortal() {
    return this.portal;
  }
}

decorate(AppStore, {
  portal: observable,
  properties: observable,
  setPortal: action,
  doRequestProperties: action,
  setProperties: action,
  isRental: action,
  isSale: action,
  getPortal: computed,
  getCurrentProperties: computed,
});

export default AppStore;
