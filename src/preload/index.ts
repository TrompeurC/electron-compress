import { IFile } from '../main/ffpmeg';
import { IpcMainEvent, IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  compress(file:IFile) {
    ipcRenderer.invoke('compress', file)
  },
  async selectDirectory() {
    return ipcRenderer.invoke('selectDirectory')
  },
  progress(callback: (progress: number) => void) {
    ipcRenderer.on('progress',(_event: IpcRendererEvent, progress: number) => {
      callback(progress)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
