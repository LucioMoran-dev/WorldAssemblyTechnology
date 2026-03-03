/**
 * Tipos relacionados con upload de archivos
 */

export interface IUploadImageResponse {
  secure_url: string;
  message: string;
}

export interface IUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
