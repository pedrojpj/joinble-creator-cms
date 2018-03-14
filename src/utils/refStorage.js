class RefsStore {
  store(name, value) {
    this[name] = value;
  }
  get(name) {
    return this[name];
  }
}

export default new RefsStore();
