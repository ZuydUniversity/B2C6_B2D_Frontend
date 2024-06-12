import axios from 'axios';
import { Patient } from '../Models/Patient';

const BASE_URL = 'http://localhost:8000/patients';

type NewPatient = Omit<Patient, 'id'>;

export const getListPatients = async (): Promise<Patient[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getPatient = async (id: number): Promise<Patient> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createPatient = async (data: NewPatient): Promise<Patient> => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};