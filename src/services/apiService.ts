// apiService.ts - A service layer for API requests
import { toast } from "react-toastify";
import apiClient from "./apiClient";

class ApiService {
  async getData<T = unknown>(link: string): Promise<T | undefined> {
    try {
      const response = await apiClient.get<T>(link);
      return response.data;
    } catch (err) {
      console.error('GET api:', err);
      toast.error('Failed to fetch data from the server');
      return undefined;
    }
  }

  async postData<T = unknown, R = unknown>(link: string, req: T): Promise<R | undefined> {
    try {
      const response = await apiClient.post<R>(link, req);
      return response.data;
    } catch (err) {
      console.error('POST api:', err);
      toast.error('Failed to send data to the server');
      return undefined;
    }
  }

  async putData<T = unknown, R = unknown>(link: string, update: T): Promise<R | undefined> {
    try {
      const response = await apiClient.put<R>(link, update);
      return response.data;
    } catch (err) {
      console.error('PUT api:', err);
      toast.error('Failed to update data on the server');
      return undefined;
    }
  }

  async patchData<T = unknown, R = unknown>(link: string, patch: T): Promise<R | undefined> {
    try {
      const response = await apiClient.patch<R>(link, patch);
      return response.data;
    } catch (err) {
      console.error('PATCH api:', err);
      toast.error('Failed to update data on the server');
      return undefined;
    }
  }

  async deleteData<R = unknown>(link: string, id?: string | number): Promise<R | undefined> {
    try {
      const url = id ? `${link}/${id}` : link;
      const response = await apiClient.delete<R>(url);
      return response.data;
    } catch (err) {
      console.error('DELETE api:', err);
      toast.error('Failed to delete data on the server');
      return undefined;
    }
  }
}

// export a singleton instance
export const apiService = new ApiService();

// export the class for inheritance or testing
export default ApiService;