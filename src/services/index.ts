import { Container } from 'inversify'
import { TYPES } from './types'
import Rest from './external/rest/rest'
import Storage from './external/storage/storage'
import Config from './internal/config/config'

const myContainer = new Container()
myContainer.bind(TYPES.Config).to(Storage)
myContainer.bind(TYPES.Config).to(Rest)
myContainer.bind(TYPES.Storage).to(Rest)

export { myContainer }
