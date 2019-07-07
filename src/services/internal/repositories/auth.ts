import { SHA1 } from 'crypto-js'
import { RestInterface } from '../../external/rest/rest'

export interface AuthInterface {
  login(email: string, password: string): Promise<object>
  register(email: string, username: string, password: string, reCaptcha: string): Promise<object>
  signout(): Promise<object>
}

class Auth implements AuthInterface {
  private _rest: RestInterface
  constructor(rest: RestInterface) {
    this._rest = rest
  }

  async login(email: string, password: string) {
    const url = `/cfs/auth?email=${encodeURIComponent(email)}&userPassword=${SHA1(password).toString()}`
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }

  async register(email: string, username: string, password: string, reCaptcha: string) {
    const url = '/cfs/rest/users/signup'

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
  async changePassword(currentPassword: string, newPassword: string) {
    const url = '/cfs/rest/users/changePassword'

    const body = {
      currentPassword: SHA1(currentPassword).toString(),
      newPassword: SHA1(newPassword).toString()
    }
    try {
      return await this._rest.put({ url, body })
    } catch (error) {
      throw error
    }
  }

  async forgetPassword(email: string) {
    const url = `/cfs/rest/users/resetPassword?email=${email}`
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }

  async getUserInfo() {
    const url = '/cfs/rest/users/currentUser'
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
  async getProducts() {
    const url = '/cfs/rest/products/user/products?category=CFS'
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }

  async signout() {
    const url = `/cfs/rest/users/signout`
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
}

export default Auth
