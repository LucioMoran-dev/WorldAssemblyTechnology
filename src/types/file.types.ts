/**
 * Tipos relacionados con upload de archivos
 */

export interface IUploadImageResponse {
  id: string;
  url: string;
}

export interface IUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
