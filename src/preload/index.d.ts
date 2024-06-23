import { ElectronAPI } from '@electron-toolkit/preload'
import { IFile } from '@renderer/types'



declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress (file: IFile) :void
    }
  }
}
