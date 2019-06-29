import rootStore from './rootStore';

describe('RootStore', () => {
  it('should have stores like children', () => {
    expect(rootStore.appStore).not.toBeUndefined();
  });
});
