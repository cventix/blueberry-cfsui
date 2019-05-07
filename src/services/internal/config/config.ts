import axios from 'axios'
interface IConfig {
  baseUrl?: string
  appLanguage?: string
  storage?: any
  httpClient: any
  fetchTimeout?: number
  [key: string]: any
}
export interface ConfigInterface {
  get(key: string): any
}
class Config implements ConfigInterface {
  private _config: IConfig
  constructor() {
    this._config = {
      baseUrl: 'http://mtn.cdn.persiangig.com/cfs/',
      appLanguage: 'fa',
      storage: localStorage,
      httpClient: axios,
      fetchTimeout: 15000
    }
  }

  get(key: string) {
    return this._config[key]
  }
}

export default Config
