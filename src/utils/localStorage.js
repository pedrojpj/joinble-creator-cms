class LocalStorage {
  constructor() {
    this.error = 'localStorage is not available in this browser';
    this.item = {};
  }

  get(itemName) {
    try {
      return localStorage.getItem(itemName);
    } catch (e) {
      console.warn(this.error);
      return this.item[itemName];
    }
  }

  set(itemName, itemValue) {
    try {
      localStorage.setItem(itemName, itemValue);
    } catch (e) {
      console.warn(this.error);
      return (this.item[itemName] = itemValue);
    }
  }

  remove(itemName) {
    try {
      localStorage.removeItem(itemName);
    } catch (e) {
      console.warn(this.error);
      return (this.item[itemName] = null);
    }
  }
}

export default new LocalStorage();
