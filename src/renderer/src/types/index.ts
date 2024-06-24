import { FileEnum } from "src/types"

export type ConfigProps  = 'size' | 'size'


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
