import axios from 'axios'
class Config {
  private config: any
  constructor() {
    this.config = {
      baseUrl: 'http://mtn.cdn.persiangig.com/cfs/',
      appLanguage: 'fa',
      storage: localStorage,
      httpClient: axios,
      fetchTimeout: 5000
    }
  }

  get(key: string) {
    return this.config[key]
  }
}

export default Config
