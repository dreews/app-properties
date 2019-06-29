import {
  observable, action, decorate, computed,
} from 'mobx';
import {
  allProperties as AllPropertiesApi,
} from '../services/api';

class AppStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.title = '...loading...';
    this.allPropertiesApi = AllPropertiesApi;
    this.properties = [];
  }

  setTitle(title) {
    this.title = title;
  }

  setProperties(properties) {
    this.properties = properties;
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

  get getAllPropeties() {
    return this.properties;
  }
}

decorate(AppStore, {
  properties: observable,
  title: observable,
  setTitle: action,
  doRequestProperties: action,
  setProperties: action,
  getAllPropeties: computed,
});

export default AppStore;
