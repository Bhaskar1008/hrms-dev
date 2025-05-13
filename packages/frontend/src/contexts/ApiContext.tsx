import React, { createContext, useContext, useCallback } from 'react';

interface ApiContextType {
  get: <T = any>(endpoint: string, params?: Record<string, any>) => Promise<T>;
  post: <T = any>(endpoint: string, data?: any) => Promise<T>;
  put: <T = any>(endpoint: string, data?: any) => Promise<T>;
  delete: <T = any>(endpoint: string) => Promise<T>;
  upload: <T = any>(endpoint: string, file: File, onProgress?: (percent: number) => void) => Promise<T>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // This would be configured from environment variables in production
  const API_BASE_URL = 'https://api.example.com';

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('hrms_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  };

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || 'An error occurred');
      throw error;
    }

    return response.json();
  };

  const get = useCallback(async <T = any>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(),
    });

    return handleResponse(response);
  }, []);

  const post = useCallback(async <T = any>(endpoint: string, data?: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return handleResponse(response);
  }, []);

  const put = useCallback(async <T = any>(endpoint: string, data?: any): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return handleResponse(response);
  }, []);

  const deleteRequest = useCallback(async <T = any>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleResponse(response);
  }, []);

  const upload = useCallback(async <T = any>(
    endpoint: string, 
    file: File, 
    onProgress?: (percent: number) => void
  ): Promise<T> => {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', `${API_BASE_URL}${endpoint}`);
      
      const token = localStorage.getItem('hrms_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      
      xhr.onerror = () => {
        reject(new Error('Network error during upload'));
      };
      
      xhr.send(formData);
    });
  }, []);

  const value = {
    get,
    post,
    put,
    delete: deleteRequest,
    upload,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};