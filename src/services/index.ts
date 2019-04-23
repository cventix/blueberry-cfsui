import Bottle from 'bottlejs'
import Rest from './external/rest/rest'
import Storage from './external/storage/storage'
import Config from './internal/config/config'
import Auth from './internal/repositories/auth'

const bottle = new Bottle()
bottle.service('Config', Config)
bottle.service('Storage', Storage, 'Config')
bottle.service('Rest', Rest, 'Config', 'Storage')
bottle.service('Auth', Auth, 'Rest')

export { bottle }

declare module 'bottlejs' {
  interface IContainer {
    Config: Config
    Storage: Storage
    Rest: Rest
    Auth: Auth
  }
}
