import VivarealStore from './vivarealStore';
import rootStore from './rootStore';

const store = new VivarealStore(rootStore);

describe('VivarealStore', () => {
  it('#rentValidMonthlyCondoFee', () => {
    const item = {
      pricingInfos: {
        rentalTotalPrice: '4000',
        monthlyCondoFee: '900',
      },
    };

    expect(store.rentValidMonthlyCondoFee(item)).toBeTruthy();

    item.pricingInfos.monthlyCondoFee = '3000';
    expect(store.rentValidMonthlyCondoFee(item)).toBeFalsy();
  });

  it('#rentVerifyBoundBox', () => {
    const item = {
      address: {
        geoLocation: {
          location: {
            lat: 1,
            lon: 1,
          },
        },
      },
    };

    store.setBoundingBox(store.rootStore.propertiesStore.isBoundingBox);

    expect(store.rentVerifyBoundBox(2000, item)).toEqual(2000);

    item.address.geoLocation.location.lat = -23.558704;
    item.address.geoLocation.location.lon = -46.653419;
    expect(store.rentVerifyBoundBox(2000, item)).toEqual(3000);
  });

  it('#rentalTotalPricePermitted', () => {
    expect(store.rentalTotalPricePermitted(4000)).toBeTruthy();
    expect(store.rentalTotalPricePermitted(3999)).toBeTruthy();
    expect(store.rentalTotalPricePermitted(4001)).toBeFalsy();
  });

  it('#salePricePermitted', () => {
    expect(store.salePricePermitted(700000)).toBeTruthy();
    expect(store.salePricePermitted(699999)).toBeTruthy();
    expect(store.salePricePermitted(700001)).toBeFalsy();
  });
});
