import axios from 'axios'
import { injectable, inject } from 'inversify'

@injectable()
class Config {
  private config: any
  constructor() {
    this.config = {
      baseUrl: 'http://us.cdn.persiangig.com/cfs/rest',
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
