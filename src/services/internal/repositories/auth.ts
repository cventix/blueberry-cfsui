import { SHA1 } from 'crypto-js'
import { RestInterface } from '../../external/rest/rest'

export interface AuthInterface {
  login(email: string, password: string): Promise<object>
  register(email: string, username: string, password: string,reCaptcha:string): Promise<object>
  signout(): Promise<object>
}

class Auth implements AuthInterface {
  private _rest: RestInterface
  constructor(rest: RestInterface) {
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

  async register(email: string, username: string, password: string,reCaptcha:string) {
    const url = '/rest/users/signup'

    const body = {
      email,
      username,
      password: SHA1(password).toString(),
      reCaptcha
    }
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }

  async forgetPassword(email: string) {
    const url = `/rest/users/resetPassword?email=${email}`
    try {
      return await this._rest.get({ url })
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
