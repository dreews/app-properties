import PropertiesStore from './propertiesStore';
import rootStore from './rootStore';

const store = new PropertiesStore(rootStore);

describe('PropertiesStore', () => {
  it('#isRental', () => {
    expect(store.isRental('RENTAL')).toBeTruthy();
    expect(store.isRental('SALE')).toBeFalsy();
    expect(store.isRental(undefined)).toBeFalsy();
  });

  it('#isSale', () => {
    expect(store.isSale('SALE')).toBeTruthy();
    expect(store.isSale('RENTAL')).toBeFalsy();
    expect(store.isSale(undefined)).toBeFalsy();
  });

  it('#isPricingInfos', () => {
    expect(store.isPricingInfos({ pricingInfos: {} })).toBeTruthy();
    expect(store.isPricingInfos({})).toBeFalsy();
    expect(store.isPricingInfos(undefined)).toBeFalsy();
  });

  it('#isLocation', () => {
    expect(store.isLocation({ geoLocation: { location: { } } })).toBeTruthy();
    expect(store.isLocation({ geoLocation: { } })).toBeFalsy();
    expect(store.isLocation({ })).toBeFalsy();
    expect(store.isLocation(undefined)).toBeFalsy();
  });

  it('#isLatLog', () => {
    const mock = { address: { geoLocation: { location: { lat: 1, lon: 1 } } } };

    expect(store.isLatLog(mock)).toBeTruthy();
    expect(store.isLatLog({ address: { geoLocation: { location: { } } } })).toBeFalsy();

    mock.address.geoLocation.location.lat = 0;
    mock.address.geoLocation.location.lon = 0;
    expect(store.isLatLog(mock)).toBeFalsy();
  });

  it('#isValidToFilter', () => {
    const item = {
      address: { geoLocation: { location: { lat: 1, lon: 1 } } },
      pricingInfos: {},
    };

    expect(store.isValidToFilter(item)).toBeTruthy();
    expect(store.isValidToFilter(undefined)).toBeFalsy();
    expect(store.isValidToFilter(item.pricingInfos)).toBeFalsy();
    expect(store.isValidToFilter(item.address)).toBeFalsy();
  });

  it('#isBoundingBox', () => {
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

    expect(store.isBoundingBox(item)).toBeFalsy();

    item.address.geoLocation.location.lat = -23.558704;
    item.address.geoLocation.location.lon = -46.653419;
    expect(store.isBoundingBox(item)).toBeTruthy();

    item.address.geoLocation.location.lat = -23.558704;
    item.address.geoLocation.location.lon = 1;
    expect(store.isBoundingBox(item)).toBeFalsy();

    item.address.geoLocation.location.lat = 1;
    item.address.geoLocation.location.lon = -46.653419;
    expect(store.isBoundingBox(item)).toBeFalsy();
  });

  describe('#isValidToZap', () => {
    const item = {
      pricingInfos: {
        businessType: 'RENTAL',
        rentalTotalPrice: 3500,
      },
      address: {
        geoLocation: {
          location: {},
        },
      },
    };

    it('set BoundingBox', () => {
      expect(store.rootStore.zapStore.isBoundingBox()).toEqual(null);
      store.isValidToZap(item);
      expect(store.rootStore.zapStore.isBoundingBox(item)).not.toEqual(null);
    });

    it('rental', () => {
      item.pricingInfos.rentalTotalPrice = 3501;
      expect(store.isValidToZap(item)).toBeTruthy();
    });

    it('sale', () => {
      item.pricingInfos.businessType = 'SALE';
      item.pricingInfos.price = 600000;
      store.saleValidUsableAreasPrice = () => true;
      expect(store.isValidToZap(item)).toBeTruthy();

      store.saleValidUsableAreasPrice = () => false;
      expect(store.isValidToZap(item)).toBeFalsy();
    });
  });

  describe('#isValidToVivareal', () => {
    const item = {
      pricingInfos: {
        businessType: 'SALE',
        price: 700000,
      },
      address: {
        geoLocation: {
          location: {},
        },
      },
    };

    it('set BoundingBox', () => {
      expect(store.rootStore.vivarealStore.isBoundingBox()).toEqual(null);
      store.isValidToVivareal(item);
      expect(store.rootStore.vivarealStore.isBoundingBox(item)).not.toEqual(null);
    });

    it('sale', () => {
      expect(store.isValidToVivareal(item)).toBeTruthy();
    });

    it('rental', () => {
      item.pricingInfos.businessType = 'RENTAL';
      item.pricingInfos.rentalTotalPrice = 4000;
      store.rentValidMonthlyCondoFee = () => true;
      expect(store.isValidToVivareal(item)).toBeTruthy();

      store.rentValidMonthlyCondoFee = () => false;
      expect(store.isValidToVivareal(item)).toBeFalsy();
    });
  });
});
