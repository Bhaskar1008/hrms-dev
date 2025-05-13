import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  disabled = false,
  accept,
  maxSize
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type if accept is provided
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = `.${file.name.split('.').pop()}`;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          // Extension check
          return fileExtension.toLowerCase() === type.toLowerCase();
        } else {
          // MIME type check
          return fileType.match(new RegExp(type.replace('*', '.*')));
        }
      });
      
      if (!isAccepted) {
        setError(`Invalid file type. Accepted types: ${accept}`);
        return false;
      }
    }
    
    // Check file size if maxSize is provided
    if (maxSize && file.size > maxSize) {
      const sizeMB = maxSize / (1024 * 1024);
      setError(`File size exceeds the maximum limit (${sizeMB} MB)`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !disabled) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveFile = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`border-2 border-dashed rounded-md p-4 ${
          dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={accept}
          disabled={disabled}
        />
        
        {value ? (
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900 truncate">{value.name}</p>
                <p className="text-gray-500">
                  {(value.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={disabled}
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="text-center p-6" onClick={handleButtonClick}>
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Drag and drop your file here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              {accept ? `Accepted formats: ${accept}` : 'All file formats supported'}
              {maxSize ? ` (Max size: ${(maxSize / (1024 * 1024)).toFixed(1)} MB)` : ''}
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};