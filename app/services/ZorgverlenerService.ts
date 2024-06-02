import axios from 'axios';
import { Zorgverlener } from '../models/Zorgverlener ';

const BASE_URL = 'http://localhost:8000/zorgverleners';

type NewZorgverlener = Omit<Zorgverlener, 'id'>;

export const getListZorgverleners = async (): Promise<Zorgverlener[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getZorgverlener = async (id: number): Promise<Zorgverlener> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createZorgverlener = async (data: NewZorgverlener): Promise<Zorgverlener> => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const deleteZorgverlener = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};