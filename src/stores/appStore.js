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

  isLocation = address => (
    address
    && address.geoLocation
    && address.geoLocation.location
  );

  isLatLog = (item) => {
    if (!this.isLocation(item.address)) {
      return false;
    }
    const { location } = item.address.geoLocation;
    return location.lon !== 0 && location.lat !== 0;
  };

  isValidToFilter = item => (
    this.isPricingInfos(item) && this.isLatLog(item)
  );

  isBoundingBox = (item) => {
    const zapGroupGeo = {
      lat: { min: -23.568704, max: -23.546686 },
      lon: { min: -46.693419, max: -46.641146 },
    };
    const geoLocation = item.address.geoLocation.location;
    const latBetween = (
      geoLocation.lat <= zapGroupGeo.lat.max
      && geoLocation.lat >= zapGroupGeo.lat.min
    );
    const lonBetween = (
      geoLocation.lon <= zapGroupGeo.lon.max
      && geoLocation.lon >= zapGroupGeo.lon.min
    );

    return latBetween && lonBetween;
  }

  zapSaleVerifyBoundingBox = (minNumber, item) => {
    if (this.isBoundingBox(item)) {
      const lowerPercentage = (minNumber * 0.10);
      return minNumber - lowerPercentage;
    }
    return minNumber;
  }

  zapSaleValidUsableAreasPrice = (item) => {
    const hasUsableAreas = item.usableAreas && item.usableAreas > 0;
    const usableAreasPrice = hasUsableAreas && (item.pricingInfos.price / item.usableAreas);
    return usableAreasPrice > this.zapSaleVerifyBoundingBox(3500, item);
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

  vivaRentVerifyBoundBox = (value, item) => {
    if (this.isBoundingBox(item)) {
      const higherPercentage = (value * 0.50);
      return value + higherPercentage;
    }
    return value;
  }

  vivarealRentalValid = (item) => {
    const calcPercentRentalTotalPrice = parseFloat(item.pricingInfos.rentalTotalPrice) * 0.3;
    const monthlyCondoFee = parseFloat(item.pricingInfos.monthlyCondoFee);
    return (
      monthlyCondoFee
      && monthlyCondoFee < this.vivaRentVerifyBoundBox(calcPercentRentalTotalPrice, item)
    );
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
  isRental: action,
  isSale: action,
  setPropertyIdSelected: action,
  getCurrentProperties: computed,
  getPropertySelected: computed,
  isVivareal: computed,
});

export default AppStore;
