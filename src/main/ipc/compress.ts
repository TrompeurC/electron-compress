import { FfmpegCommand } from 'fluent-ffmpeg';
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent, ipcMain } from "electron";
import { FfmpegUtils, IFile } from "../ffpmeg";



let ffmpegCommand:FfmpegCommand | null =  null

ipcMain.handle('compress', (_event: IpcMainInvokeEvent , file: IFile) => {

  const ffmpeg = new FfmpegUtils(BrowserWindow.fromWebContents(_event.sender)!,file)
  ffmpegCommand = ffmpeg.run()
  // ffmpeg(file.filepath)
  // .videoCodec('libx264')
  // .audioCodec('libmp3lame')
  // .size(file.size)
  // .fps(file.fps)
  // .on('progress', function(progress) {
  //   console.log('Processing: ' + progress.percent + '% done');
  // })
  // .on('error', function(err) {
  //   console.log('An error occurred: ' + err.message);
  // })
  // .on('end', function() {
  //   console.log('Processing finished !');
  // })
  // .save('/Users/huenzhi/work/fe_workspace/electron/compressed-video/videos/out.mp4');
})

ipcMain.on('stop', (_event: IpcMainEvent) => {
  ffmpegCommand?.kill('SIGKILL')
})
