var localStorageManager= {
    setStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    getStorage(key) {
      return JSON.parse(localStorage.getItem(key))
    },
    clearStorage() {
      localStorage.clear()
    },
    removeStorage(key) {
      localStorage.removeItem(key)
    }
  }
export {localStorageManager}
