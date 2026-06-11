declare module 'axios' {
  export interface AxiosInstance {
    get<T = any>(url: string, config?: any): Promise<{ data: T }>;
    post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
    put<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }>;
    delete<T = any>(url: string, config?: any): Promise<{ data: T }>;
    interceptors: any;
  }
  
  export function create(config?: any): AxiosInstance;
  export const default: {
    create(config?: any): AxiosInstance;
  };
}
