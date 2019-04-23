import { SHA1 } from 'crypto-js'

interface AuthInterface {
  login(): void
}

class Auth {
  private _rest: any
  constructor(rest: any) {
    this._rest = rest
  }

  async login(email: string, password: string) {
    const url = `/auth?email=${encodeURIComponent(email)}&userPassword=${SHA1(password).toString()}`
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }

  async register(email: string, username: string, password: string) {
    const url = 'rest/users/signup'
    const body = {
      email,
      username,
      password: SHA1(password).toString()
    }
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }

  async signout() {
    const url = `rest/users/signout`
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
}

export default Auth
