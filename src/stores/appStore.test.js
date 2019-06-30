import AppStore from './appStore';
import rootStore from './rootStore';

const store = new AppStore(rootStore);

describe('AppStore', () => {
  it('#doRequestProperties #setProperties', async () => {
    const mockResponse = {
      data: [{
        id: 1,
      }],
    };

    store.allPropertiesApi = () => (
      new Promise((resolve) => {
        resolve(mockResponse);
      })
    );

    const res = await store.doRequestProperties();

    expect(res[0].id).toEqual(1);
    expect(store.properties.length).toEqual(1);
  });

  it('#setPropertyIdSelected', async () => {
    store.setPropertyIdSelected(2);
    expect(store.propertyIdSelected).toEqual(2);
  });

  it('#setPortal', async () => {
    store.setPortal('portal');
    expect(store.portal).toEqual('portal');
  });

  it('#setPortal', async () => {
    store.setPortal('portal');
    expect(store.portal).toEqual('portal');
    expect(store.rootStore.paginationStore.pageSelected).toEqual(0);
  });

  it('#getCurrentProperties portal vivareal', async () => {
    store.setPortal('vivareal');
    store.setProperties([
      { id: 'vivareal' },
      { id: 'zap' },
    ]);

    store.isValidToFilter = item => item.id === 'vivareal';
    store.isValidToVivareal = item => item.id === 'vivareal';

    expect(store.isVivareal).toBeTruthy();
    expect(store.getCurrentProperties[0].id).toEqual('vivareal');
  });

  it('#getPropertySelected vivareal', async () => {
    store.setPropertyIdSelected('vivareal');
    expect(store.getPropertySelected[0].id).toEqual('vivareal');
  });

  it('#getCurrentProperties portal zap', async () => {
    store.setPortal('zap');
    store.isValidToFilter = item => item.id === 'zap';
    store.isValidToZap = item => item.id === 'zap';

    expect(store.isVivareal).toBeFalsy();
    expect(store.getCurrentProperties[0].id).toEqual('zap');
  });

  it('#getPropertySelected zap', async () => {
    store.setPropertyIdSelected('zap');
    expect(store.getPropertySelected[0].id).toEqual('zap');
  });
});
