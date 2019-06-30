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
    item && item.pricingInfos
  );

  isLatLog = (item) => {
    if (
      !item.address
      && !item.address.geoLocation
      && !item.address.geoLocation.location
    ) {
      return false;
    }

    return (
      item.address.geoLocation.location.lon !== 0
      && item.address.geoLocation.location.lat !== 0
    );
  };

  isValidToFilter = item => (
    this.isPricingInfos(item) && this.isLatLog(item)
  );

  zapSaleValidUsableAreasPrice = (item) => {
    const hasUsableAreas = item.usableAreas && item.usableAreas > 0;
    const usableAreasPrice = hasUsableAreas && (item.pricingInfos.price / item.usableAreas);
    return usableAreasPrice > 3500;
  }

  isValidToZap = (item) => {
    if (this.isRental(item.pricingInfos.businessType)) {
      const validPrice = item.pricingInfos.rentalTotalPrice >= 3500;
      return validPrice;
    }

    const validPrice = item.pricingInfos.price >= 600000;
    return (
      validPrice && this.zapSaleValidUsableAreasPrice(item)
    );
  };

  vivarealRentalValid = (item) => {
    const calcPercentRentalTotalPrice = parseFloat(item.pricingInfos.rentalTotalPrice) * 0.3;
    const monthlyCondoFee = parseFloat(item.pricingInfos.monthlyCondoFee);
    return monthlyCondoFee && monthlyCondoFee < calcPercentRentalTotalPrice;
  }

  isValidToVivareal = (item) => {
    if (this.isRental(item.pricingInfos.businessType)) {
      const validPrice = item.pricingInfos.rentalTotalPrice <= 4000;
      return (
        validPrice && this.vivarealRentalValid(item)
      );
    }

    const validPrice = item.pricingInfos.price <= 700000;
    return validPrice;
  }

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
    return this.getAllPropeties.filter(item => (
      this.isValidToFilter(item) && this.isValidToZap(item)
    ));
  }

  get getAllVivarealProperties() {
    return this.getAllPropeties.filter(item => (
      this.isValidToFilter(item) && this.isValidToVivareal(item)
    ));
  }

  get getAllPropeties() {
    return this.properties;
  }

  get getCurrentProperties() {
    if (this.isVivareal) {
      return this.getAllVivarealProperties;
    }

    return this.getAllZapProperties;
  }

  get getPortal() {
    return this.portal;
  }

  get isVivareal() {
    return this.getPortal === 'vivareal';
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
  isVivareal: computed,
});

export default AppStore;
