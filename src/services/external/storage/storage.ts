import { ConfigInterface } from '../../internal/config/config'

export interface StorageInterface {
  getItem(key: string): string
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

class Storage implements StorageInterface {
  private config: ConfigInterface
  private storage: StorageInterface
  constructor(config: ConfigInterface) {
    this.config = config
    this.storage = this.config.get('storage')
  }
  getItem = (key: string) => {
    try {
      return this.storage.getItem(key)
    } catch (error) {
      throw error
    }
  }

  setItem = (key: string, value: string) => {
    try {
      return this.storage.setItem(key, value)
    } catch (error) {
      throw error
    }
  }

  clear = () => {
    try {
      return this.storage.clear()
    } catch (error) {
      throw error
    }
  }

  removeItem = (key: string) => {
    try {
      return this.storage.removeItem(key)
    } catch (error) {
      throw error
    }
  }
}

export default Storage
