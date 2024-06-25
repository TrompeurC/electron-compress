import ffmpeg ,{type FfmpegCommand}  from 'fluent-ffmpeg'
import ffmpegI from '@ffmpeg-installer/ffmpeg'
import ffprobe  from '@ffprobe-installer/ffprobe'
import path, { join } from 'node:path'
import { FileEnum, ProgressType } from '../../types'
import { BrowserWindow } from 'electron'
import { existsSync, renameSync } from 'node:fs'

ffmpeg.setFfmpegPath(ffmpegI.path)
ffmpeg.setFfprobePath(ffprobe.path)

export interface IFile {
  filename: string
  filepath: string
  progress: number
  finished: boolean
  size: string
  fps: number
  directory: string
  status: FileEnum
}

export class FfmpegUtils {
  private ffmpeg:FfmpegCommand
  // private window: BrowserWindow
  constructor (private window: BrowserWindow, private file: IFile) {
    this.ffmpeg = ffmpeg(this.file.filepath)
  }
  getFileInfoName() {
    const info = path.parse(this.file.filepath)
    return path.join(this.file.directory ,`${info.name}-${this.file.size}-${this.file.fps}fps${info.ext}`)
  }
  checkDirectory() {
    return existsSync(this.file.directory)
  }
  private tempFile() {
    return join(this.file.directory , '.temp')
  }
  renameFile() {
    renameSync(this.tempFile() , this.getFileInfoName())
  }
  run() {
    if(!this.checkDirectory()) {
      this.window.webContents.send('progressNotice',ProgressType.CHECK_DIRECTORY )
      return null
    }
    return this.ffmpeg.videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size(this.file.size)
    .fps(this.file.fps)
    .on('progress', this.onPregress.bind(this))
    .on('error', this.onError.bind(this))
    .on('end', this.onEnd.bind(this))
    // .format('mp4')
    .save(this.getFileInfoName());
  }

  private onError(err) {
    if(err.message === "ffmpeg was killed with signal SIGKILL") {
      this.window.webContents.send('progressNotice', ProgressType.STOP ,{error: err.message || err} )
    } else {
      this.window.webContents.send('progressNotice', ProgressType.ERROR ,{error: err.message || err} )
    }
  }
  private onPregress(progress) {
    this.window.webContents.send('progressNotice', ProgressType.PROGRESS , {progress:progress.percent})
    // console.log('Processing: ' + progress.percent + '% done');
  }
  private onEnd() {
    // console.log('Processing finished !');
    this.window.webContents.send('progressNotice', ProgressType.END )
  }
}
