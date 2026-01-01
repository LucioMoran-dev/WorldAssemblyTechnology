/**
 * Tipos relacionados con upload de archivos
 */

export interface UploadImageResponse {
  secure_url: string;
  message: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
