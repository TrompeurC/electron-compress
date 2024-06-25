import { ElectronAPI } from '@electron-toolkit/preload'
import { IFile, ProgressType } from 'src/types'



declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      compress (file: IFile) :void
      selectDirectory (): Promise<string>
      progressNotice: (callback: (type:ProgressType,  data:any) => void) => void
      stop: () => void
    }
  }
}
