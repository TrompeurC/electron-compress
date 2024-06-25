
export type ConfigProps  = 'size' | 'size'


export enum FileEnum {
  READY,
  COMPRESS,
  ERROE,
  DONE,
  STOP
}

export enum ProgressType {
  ERROR,
  PROGRESS,
  END,
  CHECK_DIRECTORY,
  STOP
}


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


