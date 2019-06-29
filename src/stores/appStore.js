import {
  observable, action, decorate,
} from 'mobx';
import {
  allProperties as AllPropertiesApi,
} from '../services/api';

class AppStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.title = '...loading...';
    this.allPropertiesApi = AllPropertiesApi;
  }

  setTitle(title) {
    this.title = title;
  }

  doRequestProperties() {
    const api = async (resolve, reject) => {
      try {
        const res = await this.allPropertiesApi();
        console.log(res.data);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    };
    return new Promise((resolve, reject) => api(resolve, reject));
  }
}

decorate(AppStore, {
  title: observable,
  setTitle: action,
});

export default AppStore;
