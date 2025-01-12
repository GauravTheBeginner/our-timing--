// File validation utilities
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface FileValidationError extends Error {
  code: 'FILE_SIZE' | 'FILE_TYPE';
}

export function validateImageFile(file: File): void {
  if (!file.type.startsWith('image/')) {
    const error = new Error('Please upload an image file') as FileValidationError;
    error.code = 'FILE_TYPE';
    throw error;
  }

  if (file.size > MAX_FILE_SIZE) {
    const error = new Error('File size must be less than 5MB') as FileValidationError;
    error.code = 'FILE_SIZE';
    throw error;
  }
}