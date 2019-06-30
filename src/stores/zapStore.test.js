import ZapStore from './zapStore';
import rootStore from './rootStore';

const store = new ZapStore(rootStore);

describe('ZapStore', () => {
  it('#saleValidUsableAreasPrice', () => {
    const item = {
      usableAreas: 60,
      pricingInfos: {
        price: 300000,
      },
    };

    expect(store.saleValidUsableAreasPrice(item)).toBeTruthy();

    item.pricingInfos.price = 100000;
    expect(store.saleValidUsableAreasPrice(item)).toBeFalsy();
  });

  it('#saleVerifyBoundingBox', () => {
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

    expect(store.saleVerifyBoundingBox(3500, item)).toEqual(3500);

    item.address.geoLocation.location.lat = -23.558704;
    item.address.geoLocation.location.lon = -46.653419;
    expect(store.saleVerifyBoundingBox(3500, item)).toEqual(3150);
  });

  it('#rentalTotalPricePermitted', () => {
    expect(store.rentalTotalPricePermitted(3500)).toBeTruthy();
    expect(store.rentalTotalPricePermitted(3501)).toBeTruthy();
    expect(store.rentalTotalPricePermitted(3499)).toBeFalsy();
  });

  it('#salePricePermitted', () => {
    expect(store.salePricePermitted(600000)).toBeTruthy();
    expect(store.salePricePermitted(600001)).toBeTruthy();
    expect(store.salePricePermitted(599999)).toBeFalsy();
  });
});
