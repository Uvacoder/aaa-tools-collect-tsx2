import Store from 'electron-store';

class UserSettings {
  store = new Store();

  Save(key: string, value: unknown) {
    this.store.set(key, value);
  }

  Get(key: string): any {
    return this.store.get(key);
  }
}

export default new UserSettings();
