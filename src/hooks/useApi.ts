
import { useCallback } from 'react';
import apiClient from '../services/apiClient';
import authService from '../services/authService';



const useApi =()=> {

  const token = import.meta.env.MODE === 'development' ? 'mymocktokenstring' : authService.getAccessToken();
  console.log('token',token)

  
  const getData = useCallback(
    async(link: string)=> {
      try {
        if(token){
          const response = await apiClient.get(`${link}`);
          return response.data;
        }
      } catch (err) {
        console.log('get api:',err)
      }

  },
  [token]
);

  const postData = async(link:string, req: never) =>  {
    
    try {
      const response  = await apiClient.post(`${link}`, req );
      return response.data;
    } catch (err) {
      console.error('post api:',err)
    } 
  }

  const putData = async(link:string, update:never) => {
    
    try {
      const response = await apiClient.put(`${link}`, update)
      return response.data;
    } catch (err) {
      console.error('put api:', err) 
    }
  }

  const patchData = async(link:string, patch:never) => {
    
    try{
      const response = await apiClient.patch(`${link}`, patch);
      return response.data;
    } catch(err) {
      console.error('patch api:', err)
    } 
  }

  const deleteData = async(link:string, id:string | number) => {
    
    try{
      const response = await apiClient.patch(`${link}`, id);
      return response.data;
    } catch(err) {
      console.error('delete api:', err)
    } 
  };

  return {
    getData, postData, putData, patchData, deleteData
  }
}

export default useApi;







