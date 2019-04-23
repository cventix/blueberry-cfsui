import Bottle from 'bottlejs'
import Rest from './external/rest/rest'
import Storage from './external/storage/storage'
import Config from './internal/config/config'

const bottle = new Bottle()
bottle.service('Config', Config)
bottle.service('Storage', Storage, 'Config')
bottle.service('Rest', Rest, 'Config', 'Storage')

export { bottle }
