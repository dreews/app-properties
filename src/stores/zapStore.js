import {
  action, decorate,
} from 'mobx';

class ZapStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  saleValidUsableAreasPrice = (item) => {
    const hasUsableAreas = item.usableAreas && item.usableAreas > 0;
    const usableAreasPrice = hasUsableAreas && (item.pricingInfos.price / item.usableAreas);
    return usableAreasPrice > this.saleVerifyBoundingBox(3500, item);
  }

  saleVerifyBoundingBox = (minNumber, item) => {
    if (this.isBoundingBox(item)) {
      const lowerPercentage = (minNumber * 0.10);
      return minNumber - lowerPercentage;
    }
    return minNumber;
  }

  rentalTotalPricePermitted = price => price >= 3500;

  salePricePermitted = price => price >= 600000;
}

decorate(ZapStore, {
  saleValidUsableAreasPrice: action,
  rentalTotalPrice: action,
  rentalTotalPricePermitted: action,
  salePricePermitted: action,
});

export default ZapStore;
