import { IpcMainInvokeEvent, dialog, ipcMain } from "electron";


ipcMain.handle('selectDirectory',async (_event: IpcMainInvokeEvent) => {
  const res = await dialog.showOpenDialog({
    title: '选择文件夹',
    properties: ['openDirectory', 'createDirectory'],
  })
  if(res.canceled) return ''
  return res.filePaths[0]
})
