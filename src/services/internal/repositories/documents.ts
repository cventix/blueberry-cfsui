import { RestInterface } from '../../external/rest/rest'

export interface IGetDocumentsInput {
  isChildren?: boolean
  path?: string
  headers?: object
}

export interface ICreateFolderInput {
  name: string
  description?: string
  parentId?: number
}

export interface IRenameFolderInput {
  folderId: number
  name: string
}

export interface IMoveDocumentsInput {
  documentIds: Array<number>
  targetId: number
}

export interface IShareDocumentsInput {
  documentIds: Array<number>
  userEmails: Array<string>
}

export interface DocumentsInterface {
  getDocuments(input?: IGetDocumentsInput): Promise<object>
  createFolder(input: ICreateFolderInput): Promise<object>
  renameFolder(input: IRenameFolderInput): Promise<object>
  moveDocuments(input: IMoveDocumentsInput): Promise<object>
  shareDocuments(input: IShareDocumentsInput): Promise<object>
}

class Documents implements DocumentsInterface {
  private _rest: RestInterface
  constructor(rest: RestInterface) {
    this._rest = rest
  }

  async getDocuments({ isChildren, path, headers }: IGetDocumentsInput = { isChildren: false, path: '', headers: {} }) {
    const url = `/rest/documents${isChildren ? '/children' : ''}?sort=+discriminator,+name${isChildren ? `&path=${path}` : ''}`
    try {
      return await this._rest.get({ url, headers })
    } catch (error) {
      throw error
    }
  }

  async createFolder({ name, description, parentId }: ICreateFolderInput = { name: 'Untitled' }) {
    const url = '/rest/documents'
    const body = {
      description,
      discriminator: 'D',
      name,
      subdomain: 'false'
    }
    if (parentId) {
      ;(body as any).parent = { id: parentId }
    }
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }

  async renameFolder({ folderId, name }: IRenameFolderInput) {
    const url = `/rest/documents/rename?id=${folderId}`
    const body = {
      name
    }
    try {
      return await this._rest.put({ url, body })
    } catch (error) {
      throw error
    }
  }
  async removeFolder({ folderId, name }: IRenameFolderInput) {
    const url = `/rest/documents/remove?id=${folderId}`
    try {
      return await this._rest.delete({ url })
    } catch (error) {
      throw error
    }
  }
  async moveDocuments({ documentIds, targetId }: IMoveDocumentsInput) {
    const url = `/rest/documents/move?ids=${documentIds.join()}&targetId=${targetId}`
    try {
      return await this._rest.put({ url })
    } catch (error) {
      throw error
    }
  }

  async shareDocuments({ documentIds, userEmails }: IShareDocumentsInput) {
    const url = `/rest/documents/share?ids=${documentIds.join()}`
    const body = { userEmails }
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }
}

export default Documents
