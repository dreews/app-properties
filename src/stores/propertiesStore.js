import {
  observable, action, decorate, computed,
} from 'mobx';

class PropertiesStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
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
    if (this.isRental(item.pricingInfos.businessType)) {
      const validPrice = item.pricingInfos.rentalTotalPrice >= 3500;
      return validPrice;
    }

    const validPrice = item.pricingInfos.price >= 600000;
    return (
      validPrice && this.zapSaleValidUsableAreasPrice(item)
    );
  };

  zapSaleValidUsableAreasPrice = (item) => {
    const hasUsableAreas = item.usableAreas && item.usableAreas > 0;
    const usableAreasPrice = hasUsableAreas && (item.pricingInfos.price / item.usableAreas);
    return usableAreasPrice > this.zapSaleVerifyBoundingBox(3500, item);
  }

  zapSaleVerifyBoundingBox = (minNumber, item) => {
    if (this.isBoundingBox(item)) {
      const lowerPercentage = (minNumber * 0.10);
      return minNumber - lowerPercentage;
    }
    return minNumber;
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

  vivarealRentalValid = (item) => {
    const calcPercentRentalTotalPrice = parseFloat(item.pricingInfos.rentalTotalPrice) * 0.3;
    const monthlyCondoFee = parseFloat(item.pricingInfos.monthlyCondoFee);
    return (
      monthlyCondoFee
      && monthlyCondoFee < this.vivaRentVerifyBoundBox(calcPercentRentalTotalPrice, item)
    );
  }

  vivaRentVerifyBoundBox = (value, item) => {
    if (this.isBoundingBox(item)) {
      const higherPercentage = (value * 0.50);
      return value + higherPercentage;
    }
    return value;
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
