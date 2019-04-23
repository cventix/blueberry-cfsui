class Rest {
  private config: any
  private http: any
  private storage: any
  private headers: Map<string, string>
  constructor(config: any, storage: any) {
    this.config = config
    this.storage = storage
    this.http = this.config.get('httpClient')
    this.headers = new Map([['Content-Type', 'application/json'], ['Accept', 'application/json']])
  }

  get(url: string, headers: Map<string, string>) {
    headers.forEach((value, key) => this.headers.set(key, value))
    return this.headers
  }
}

export default Rest
