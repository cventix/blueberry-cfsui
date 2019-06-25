import { StorageInterface } from '../storage/storage'
import { ConfigInterface } from '../../internal/config/config'
interface InputInterface {
  url: string
  headers?: object
  body?: object | string
}

interface IBaseInput {
  method?: string
  url: string
  headers?: object
  body?: object | string
}

export interface RestInterface {
  get(input: InputInterface): Promise<object>
  post(input: InputInterface): Promise<object>
  put(input: InputInterface): Promise<object>
  delete(input: InputInterface): Promise<object>
}
class Rest implements RestInterface {
  private _config: ConfigInterface
  private _http: any
  private _storage: StorageInterface
  private _headers: any
  constructor(config: ConfigInterface, storage: StorageInterface) {
    this._config = config
    this._storage = storage
    window.document.cookie = `token="${localStorage.getItem('token')}"`
    this._headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // token: this._storage.getItem('token')
      token: localStorage.getItem('token')
    }
    this._http = this._config.get('httpClient').create({
      headers: this._headers,
      timeout: this._config.get('fetchTimeout')
    })
  }

  private async _base({ method = 'GET', url, headers = {}, body }: IBaseInput) {
    try {
      if (headers) this._headers = { ...this._headers, ...headers }
      console.log(`%c[HEADERS]:`, 'font-weight: bold; color: green;', this._headers)
      console.log(`%c[${method}]: ${url}`, 'font-weight: bold; color: #3e3e3e;')

      if (this._headers.token == null) {
        this._headers.token = localStorage.getItem('token')
      }
      const httpInput = { method, url, headers: this._headers }
      if (body) {
        ;(httpInput as any).data = body
      }
      console.log('httpInput', httpInput)
      const { data, status } = await this._http(httpInput)

      return data ? data : status
    } catch ({ response: { data } }) {
      if (data.errors[0].code === 403) window.location.replace('/login')
      throw data
    }
  }

  async get({ url, headers }: InputInterface) {
    try {
      return await this._base({ method: 'GET', url, headers })
    } catch (error) {
      throw error
    }
  }

  async post({ url, headers, body }: InputInterface) {
    try {
      return await this._base({ method: 'POST', url, headers, body })
    } catch (error) {
      throw error
    }
  }
  
  async put({ url, headers, body }: InputInterface) {
    try {
      return await this._base({ method: 'PUT', url, headers, body })
    } catch (error) {
      throw error
    }
  }

  async delete({ url, headers }: InputInterface) {
    try {
      return await this._base({ method: 'DELETE', url, headers })
    } catch (error) {
      throw error
    }
  }
}

export default Rest
