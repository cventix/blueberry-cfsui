import { RestInterface } from '../../external/rest/rest'
import { removeFolder } from '../store/sagas/documents'

export interface IGetDocumentsInput {
  isChildren?: boolean
  path?: string
  headers?: object
  id?: number
  modal?: boolean
}
export interface IGenerateLinkInput {
  uuid?: string
  headers?: object
  name?: string
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
export interface IUrlUploadInput {
  parentId?: number
  path?: string
}
export interface IDownloadDirectoryInput {
  documentIds: Array<number>
  type: string
}

export interface IRestoreFileInput {
  documentIds: Array<number>
}

export interface IRemoveFolderInput {
  folderId: Array<number>
}

export interface IShareStatusInput {
  sharingStatus: string
  id: number
}
export interface IUploadServerInput {
  name: any
  size: any
  id: any
  uuid: any
  parent: any
  mode: any
  origin: any
}

export interface DocumentsInterface {
  getDocuments(input?: IGetDocumentsInput): Promise<object>
  createFolder(input: ICreateFolderInput): Promise<object>
  renameFolder(input: IRenameFolderInput): Promise<object>
  moveDocuments(input: IMoveDocumentsInput): Promise<object>
  shareDocuments(input: IShareDocumentsInput): Promise<object>
  downloadDirectory(input: IDownloadDirectoryInput): Promise<object>
  generateDownloadLink(input: IGenerateLinkInput): Promise<object>
  changeSharingStatus(input: IShareStatusInput): Promise<object>
}

class Documents implements DocumentsInterface {
  private _rest: RestInterface
  constructor(rest: RestInterface) {
    this._rest = rest
  }

  async getDocuments({ isChildren, path, headers }: IGetDocumentsInput = { isChildren: false, path: '', headers: {} }) {
    //console.log(path)
    const url = `/cfs/rest/documents${isChildren ? '/children' : ''}?sort=+discriminator,+name${isChildren ? `&path=${path}` : ''}`
    try {
      return await this._rest.get({ url, headers })
    } catch (error) {
      throw error
    }
  }

  async getTrashDocuments({ headers }: IGetDocumentsInput = {}) {
    const url = `/cfs/rest/documents/trash?sort=+discriminator,+name`
    try {
      return await this._rest.get({ url, headers })
    } catch (error) {
      throw error
    }
  }
  async getSharedDocuments({ headers }: IGetDocumentsInput = {}) {
    const url = `/cfs/rest/sharedwithme?sort=+discriminator,+name`
    try {
      return await this._rest.get({ url, headers })
    } catch (error) {
      throw error
    }
  }

  async urlUpload({ path, parentId = 0 }: IUrlUploadInput) {
    let headers = { 'Content-Type': 'text/html' }
    const url = `/cfs/rest/upload/url`
    let body = `url=${path}&path-id=${parentId}&token=${localStorage.getItem('token')}&dlc=false&`
    //console.log(body)
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }

  async createFolder({ name, description, parentId }: ICreateFolderInput = { name: 'Untitled' }) {
    const url = '/cfs/rest/documents'
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
    const url = `/cfs/rest/documents/rename?id=${folderId}`
    const body = {
      name
    }
    try {
      return await this._rest.put({ url, body })
    } catch (error) {
      throw error
    }
  }
  async removeFolder({ folderId }: any) {
    const url = `/cfs/rest/documents/trash?sort=+discriminator,+name&ids=${folderId}`
    try {
      return await this._rest.put({ url })
    } catch (error) {
      throw error
    }
  }
  async moveDocuments({ documentIds, targetId }: IMoveDocumentsInput) {
    const url = `/cfs/rest/documents/move?ids=${documentIds.join()}&targetId=${targetId}`
    try {
      return await this._rest.put({ url })
    } catch (error) {
      throw error
    }
  }

  async shareDocuments({ documentIds, userEmails }: IShareDocumentsInput) {
    const url = `/cfs/rest/documents/share?ids=${documentIds.join()}`
    const body = { userEmails }
    //console.log(url)
    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }
  async addDescription({ id, description }: any) {
    const url = `/cfs/rest/documents/${id}}`
    const body = { id, description }

    try {
      return await this._rest.post({ url, body })
    } catch (error) {
      throw error
    }
  }
  async generateDownloadLink({ uuid, headers }: IGenerateLinkInput = {}) {
    const url = `/cfs/rest/publicAccess/${uuid}/generateDownloadLink`
    try {
      let result = await this._rest.get({ url, headers })
      return result
    } catch (error) {
      throw error
    }
  }
  async downloadDirectory({ documentIds, type }: IDownloadDirectoryInput) {
    //console.log(documentIds, type)
    let url = `/cfs/rest/documents/archive?ids=${documentIds.join()}&format=${type}`
    //console.log(url)
    try {
      return await this._rest.get({ url })
    } catch (error) {
      throw error
    }
  }
  async restoreFiles({ documentIds }: IRestoreFileInput) {
    //console.log(documentIds)
    let url = `/cfs/rest/documents/restore?ids=${documentIds.join()}`

    try {
      return await this._rest.put({ url })
    } catch (error) {
      throw error
    }
  }
  async deleteDocument({ documentIds }: IRestoreFileInput) {
    //console.log(documentIds)
    let url = `/cfs/rest/documents?ids=${documentIds.join()}`
    try {
      return await this._rest.delete({ url })
    } catch (error) {
      throw error
    }
  }

  async uploadDocument({ body, fileSize, fileName, pathId }: any) {
    let url = `/cfs/rest/upload/binary?name=${fileName}&size=${fileSize}&path-id=${pathId}`
    let headers = { 'Content-Type': 'application/octet-stream' }
    //console.log(body)
    try {
      return await this._rest.post({ url, body, headers })
    } catch (error) {
      throw error
    }
  }
  async changeSharingStatus({ id, sharingStatus }: IShareStatusInput) {
    const url = `/cfs/rest/documents/${id}/changeSharingStatus`
    const body = {
      id: id,
      sharingStatus: sharingStatus
    }
    try {
      return await this._rest.put({ url, body })
    } catch (error) {
      throw error
    }
  }
  async uploadServer({ name, size, id, uuid, parent, mode, origin }: IUploadServerInput) {
    const url = `${process.env.REACT_APP_URL}:9234/server_upload?pathId=${parent}&name=${name}&size=${size}&id=${id}&uuid=${uuid}&${
      mode == 'cdn' ? 'subdomain=true' : 'subdomain=false'
    }`

    try {
      return await this._rest.post({ url })
    } catch (error) {
      throw error
    }
  }
}

export default Documents
