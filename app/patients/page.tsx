'use client'
import React, { useState, useEffect } from 'react';
import AddPatientForm from '@/components/AddPatientForm';
import FetchPatientsList from '@/components/FetchPatientsList';
import UpdatePatientForm from '@/components/UpdatePatientForm';
import { Patient } from '@/models/Patient';
import styles from '@/components/AddPatientForm.module.css';

async function fetchPatients(): Promise<Patient[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/patients', {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    const patients: Patient[] = await response.json();
    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
}

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };

    fetchData();
  }, []);

  return (
    <div>

      <h1 className={styles.dikgroot} style={{ textAlign: 'center'}}>Patiënten</h1>
      <br />

      <h2 className={styles.streep}>Patiënt Aanmaken</h2>
      <AddPatientForm />
      <br />

      <h2 className={styles.streep}>Patiënt Aanpassen</h2>
      <UpdatePatientForm />
      <br /><br />

      <FetchPatientsList patients={patients} />
    </div>
  );
};

export default PatientsPage;
