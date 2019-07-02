import { RestInterface } from '../../external/rest/rest'

export interface AccountInterface {
  getUserInfo(email: string, password: string): Promise<object>
  getProducts(email: string, username: string, password: string, reCaptcha: string): Promise<object>
}

class Account implements AccountInterface {
  private _rest: RestInterface
  constructor(rest: RestInterface) {
    this._rest = rest
  }

  async getUserInfo() {
    const url = '/rest/users/currentUser'
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
  async getProducts() {
    const url = '/rest/products/user/products?category=CFS'
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
  async changePlan(id: number, additionalInfo: string, applyNow: boolean) {
    const url = '/rest/users/changePlan'
    const body = {
      additionalInfo,
      applyNow,
      id
    }
    try {
      return await this._rest.put({ url, body })
    } catch (error) {
      throw error
    }
  }
}

export default Account
