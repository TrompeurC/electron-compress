
import ffmpeg ,{type FfmpegCommand}  from 'fluent-ffmpeg'
import ffmpegI from '@ffmpeg-installer/ffmpeg'
import ffprobe  from '@ffprobe-installer/ffprobe'

ffmpeg.setFfmpegPath(ffmpegI.path)
ffmpeg.setFfprobePath(ffprobe.path)

export interface IFile {
  filename: string
  filepath: string
  progress: number
  finished: boolean
  size: string
  fps: number
}

export class FfmpegUtils {
  private ffmpeg:FfmpegCommand

  constructor (private file: IFile) {
    this.ffmpeg = ffmpeg(this.file.filepath)
  }
  run() {
    this.ffmpeg.videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size(this.file.size)
    .fps(this.file.fps)
    .on('progress', this.onPregress.bind(this))
    .on('error', this.onError.bind(this))
    .on('end', this.onEnd.bind(this))
    .save('/Users/huenzhi/work/fe_workspace/electron/compressed-video/videos/out.mp4');
  }
  private onError(err) {
    console.log('An error occurred: ' + err.message);
  }
  private onPregress(progress) {
    console.log('Processing: ' + progress.percent + '% done');
  }
  private onEnd() {
    console.log('Processing finished !');
  }
}
