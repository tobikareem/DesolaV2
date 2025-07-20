
import { useCallback } from 'react';
import apiClient from '../services/apiClient';

interface ApiHookResult {
  getData: <T = unknown>(link: string) => Promise<T | undefined>;
  postData: <T = unknown, R = unknown>(link: string, req: T) => Promise<R | undefined>;
  putData: <T = unknown, R = unknown>(link: string, update: T) => Promise<R | undefined>;
  patchData: <T = unknown, R = unknown>(link: string, patch: T) => Promise<R | undefined>;
  deleteData: <R = unknown>(link: string, id?: string | number) => Promise<R | undefined>;
}

const useApi = (): ApiHookResult => {

  const getData = useCallback(async <T = unknown>(link: string): Promise<T | undefined> => {
    try {
      const response = await apiClient.get<T>(link);
      return response.data;
    } catch (err) {
      console.error('get api:', err);
      return undefined;
    }
  }, []);

  const postData = useCallback(async <T = unknown, R = unknown>(link: string, req: T): Promise<R | undefined> => {
    try {
      const response = await apiClient.post<R>(link, req);
      return response.data;
    } catch (err) {
      console.error('post api:', err);
      return undefined;
    }
  }, []);

  const putData = useCallback(async <T = unknown, R = unknown>(link: string, update: T): Promise<R | undefined> => {
    try {
      const response = await apiClient.put<R>(link, update);
      return response.data;
    } catch (err) {
      console.error('put api:', err);
      return undefined;
    }
  }, []);

  const patchData = useCallback(async <T = unknown, R = unknown>(link: string, patch: T): Promise<R | undefined> => {
    try {
      const response = await apiClient.patch<R>(link, patch);
      return response.data;
    } catch (err) {
      console.error('patch api:', err);
      return undefined;
    }
  }, []);

  const deleteData = useCallback(async <R = unknown>(link: string, id?: string | number): Promise<R | undefined> => {
    try {
      const url = id ? `${link}/${id}` : link;
      const response = await apiClient.delete<R>(url);
      return response.data;
    } catch (err) {
      console.error('delete api:', err);
      return undefined;
    }
  }, []);

  return {
    getData,
    postData,
    putData,
    patchData,
    deleteData
  };
};

export default useApi;







