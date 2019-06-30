import {
  action, decorate,
} from 'mobx';

class VivarealStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  rentValidMonthlyCondoFee = (item) => {
    const calcPercentRentalTotalPrice = parseFloat(item.pricingInfos.rentalTotalPrice) * 0.3;
    const monthlyCondoFee = parseFloat(item.pricingInfos.monthlyCondoFee);
    return (
      monthlyCondoFee
      && monthlyCondoFee < this.rentVerifyBoundBox(calcPercentRentalTotalPrice, item)
    );
  }

  rentVerifyBoundBox = (value, item) => {
    if (this.isBoundingBox(item)) {
      const higherPercentage = (value * 0.50);
      return value + higherPercentage;
    }
    return value;
  }

  rentalTotalPricePermitted = price => price <= 4000;

  salePricePermitted = price => price <= 700000;
}

decorate(VivarealStore, {
  rentValidMonthlyCondoFee: action,
  rentalTotalPricePermitted: action,
});

export default VivarealStore;
