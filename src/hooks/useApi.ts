import { useCallback } from 'react';
import { apiService } from '../services/apiService';

interface ApiHookResult {
  getData: <T = unknown>(link: string) => Promise<T | undefined>;
  postData: <T = unknown, R = unknown>(link: string, req: T) => Promise<R | undefined>;
  putData: <T = unknown, R = unknown>(link: string, update: T) => Promise<R | undefined>;
  patchData: <T = unknown, R = unknown>(link: string, patch: T) => Promise<R | undefined>;
  deleteData: <R = unknown>(link: string, id?: string | number) => Promise<R | undefined>;
}

const useApi = (): ApiHookResult => {
  const getData = useCallback(async <T = unknown>(link: string): Promise<T | undefined> => {
    return apiService.getData<T>(link);
  }, []);

  const postData = useCallback(async <T = unknown, R = unknown>(
    link: string,
    req: T
  ): Promise<R | undefined> => {
    return apiService.postData<T, R>(link, req);
  }, []);

  const putData = useCallback(async <T = unknown, R = unknown>(
    link: string,
    update: T
  ): Promise<R | undefined> => {
    return apiService.putData<T, R>(link, update);
  }, []);

  const patchData = useCallback(async <T = unknown, R = unknown>(
    link: string,
    patch: T
  ): Promise<R | undefined> => {
    return apiService.patchData<T, R>(link, patch);
  }, []);

  const deleteData = useCallback(async <R = unknown>(
    link: string,
    id?: string | number
  ): Promise<R | undefined> => {
    return apiService.deleteData<R>(link, id);
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