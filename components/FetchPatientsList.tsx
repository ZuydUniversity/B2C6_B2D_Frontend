import React from 'react';
import { Patient } from '@/models/Patient';
import styles from '@/components/AddPatientForm.module.css';

interface FetchPatientsListProps {
  patients: Patient[];
}

const FetchPatientsList: React.FC<FetchPatientsListProps> = ({ patients }) => {
  if (!patients || patients.length === 0) {
    return <p>Geen patiënten gevonden</p>;
  }
 
  const deletePatient = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
      alert('Patiënt verwijderd!');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Er is een fout opgetreden bij het verwijderen van de patiënt.');
    }
  };

  return (
    <div>
      <h1><strong>Aangemaakte Patients</strong></h1>
      <ul>
        {patients.map((patient) => (
          <form key={patient.id} onSubmit={(e) => { e.preventDefault(); deletePatient(patient.id); }}>
            <li key={patient.id} style={{marginBottom: '20px'}}>
              <strong>ID:</strong> {patient.id}
              <br />
              <strong>Naam:</strong> {patient.name} {patient.surname}
              <br />
              <strong>Email:</strong> {patient.email}
              <br />
              <button type="submit"><h2 className={styles.buttonDelete}>Verwijder Patiënt</h2></button>

            </li>
          </form>
        ))}
      </ul>
    </div>
  );
};

export default FetchPatientsList;