import { IFile } from '../main/ffpmeg';
import {  IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ProgressType } from '../main/types';
// import { ProgressType } from '../main/types';

// import { ProgressType } from '@renderer/types';

// Custom APIs for renderer
const api = {
  compress(file:IFile) {
    ipcRenderer.invoke('compress', file)
  },
  async selectDirectory() {
    return ipcRenderer.invoke('selectDirectory')
  },
  progressNotice(callback: (type: ProgressType ,data: any) => void) {
    ipcRenderer.on('progressNotice',(_event: IpcRendererEvent, type: ProgressType, data:any) => {
      callback(type , data)
    })
  },
  stop() {
    ipcRenderer.send('stop')
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
