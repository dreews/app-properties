import {
  action, decorate,
} from 'mobx';

class PropertiesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.saleValidUsableAreasPrice = rootStore.zapStore.saleValidUsableAreasPrice;
    this.rentValidMonthlyCondoFee = rootStore.vivarealStore.rentValidMonthlyCondoFee;
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

  isValidToZap = (item) => {
    const { zapStore } = this.rootStore;
    zapStore.setBoundingBox(this.isBoundingBox);

    if (this.isRental(item.pricingInfos.businessType)) {
      return zapStore.rentalTotalPricePermitted(item.pricingInfos.rentalTotalPrice);
    }

    return (
      zapStore.salePricePermitted(item.pricingInfos.price)
      && this.saleValidUsableAreasPrice(item)
    );
  };

  isValidToVivareal = (item) => {
    const { vivarealStore } = this.rootStore;
    vivarealStore.setBoundingBox(this.isBoundingBox);

    if (this.isRental(item.pricingInfos.businessType)) {
      return (
        vivarealStore.rentalTotalPricePermitted(item.pricingInfos.rentalTotalPrice)
        && this.rentValidMonthlyCondoFee(item)
      );
    }

    return vivarealStore.salePricePermitted(item.pricingInfos.price);
  }
}

decorate(PropertiesStore, {
  isRental: action,
  isSale: action,
  isValidToZap: action,
  isValidToVivareal: action,
  isValidToFilter: action,
});

export default PropertiesStore;
