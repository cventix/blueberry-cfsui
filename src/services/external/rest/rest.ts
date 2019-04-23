interface InputInterface {
  url: string
  headers?: object
  body?: object
}
class Rest {
  private _config: any
  private _http: any
  private _storage: any
  private _headers: object
  constructor(config: any, storage: any) {
    this._config = config
    this._storage = storage
    this._storage.setItem('token', 'VhtGvHrtO/rwlxwRV4LfEw==')
    window.document.cookie = `token="${this._storage.getItem('token')}"`
    this._headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: this._storage.getItem('token')
    }
    this._http = this._config.get('httpClient').create({
      headers: this._headers,
      timeout: this._config.get('fetchTimeout')
    })
  }

  private async _base({ method = 'GET', url = '', headers = {}, body = {} }) {
    try {
      this._headers = { ...this._headers, headers }
      const { data, status, statusText } = await this._http({ method, url, headers: this._headers, data: body })
      if (status === 200 && statusText === 'OK') return data
    } catch (error) {
      throw error
    }
  }

  async get({ url, headers = {} }: InputInterface) {
    try {
      return await this._base({ method: 'GET', url, headers })
    } catch (error) {
      throw error
    }
  }

  async post({ url, headers = {}, body }: InputInterface) {
    try {
      return await this._base({ method: 'POST', url, headers, body })
    } catch (error) {
      throw error
    }
  }

  async put({ url, headers = {}, body }: InputInterface) {
    try {
      return await this._base({ method: 'PUT', url, headers, body })
    } catch (error) {
      throw error
    }
  }

  async delete({ url, headers = {} }: InputInterface) {
    try {
      return await this._base({ method: 'DELETE', url, headers })
    } catch (error) {
      throw error
    }
  }
}

export default Rest
