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
      baseUrl: `${process.env.REACT_APP_URL}`,
      // baseUrl: `http://persiangig.test`,
      appLanguage: 'fa',
      storage: localStorage,
      httpClient: axios,
      fetchTimeout: 150000
    }
  }

  get(key: string) {
    return this._config[key]
  }
}

export default Config
