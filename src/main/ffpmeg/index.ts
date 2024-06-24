
import ffmpeg ,{type FfmpegCommand}  from 'fluent-ffmpeg'
import ffmpegI from '@ffmpeg-installer/ffmpeg'
import ffprobe  from '@ffprobe-installer/ffprobe'
import path from 'node:path'
import { FileEnum } from '../../types'
import { BrowserWindow } from 'electron'

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
  run() {
    this.ffmpeg.videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size(this.file.size)
    .fps(this.file.fps)
    .on('progress', this.onPregress.bind(this))
    .on('error', this.onError.bind(this))
    .on('end', this.onEnd.bind(this))
    .save(this.getFileInfoName());
  }
  private onError(err) {
    console.log('An error occurred: ' + err.message);
  }
  private onPregress(progress) {
    this.window.webContents.send('progress' , progress.percent)
    // console.log('Processing: ' + progress.percent + '% done');
  }
  private onEnd() {
    console.log('Processing finished !');
  }
}
