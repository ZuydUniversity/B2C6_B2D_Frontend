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
      cache: 'no-store', // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
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






// import React, { useState, useEffect } from 'react';
// import AddPatientForm from '@/components/AddPatientForm';
// import FetchPatientsList from '@/components/FetchPatientsList';
// import UpdatePatientForm from '@/components/UpdatePatientForm';
// import { Patient } from '@/models/Patient';

// async function fetchPatients(): Promise<Patient[]> {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/patients', {
//       cache: 'no-store', // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch patients');
//     }
//     const patients: Patient[] = await response.json();
//     return patients;
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     return [];
//   }
// }

// const PatientsPage: React.FC = () => {
//   // const [patients, setPatients] = useState<Patient[]>([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const patientsData = await fetchPatients();
//   //     setPatients(patientsData);
//   //   };

//   //   fetchData();
//   // }, []);

//   return (
//     <div>
//       <h1>Patiënten</h1>
  
//       {/* Formulier om een nieuwe patiënt toe te voegen */}
//       <AddPatientForm />
      
//       <UpdatePatientForm />
//       <FetchPatientsList />
//       <br />
//       {/* Weergeven van bestaande patiënten
//       {patients.length > 0 && (
//         <ul>
//           {patients.map((patient) => (
//             <li key={patient.id}>
//               <strong>Naam:</strong> {patient.name} {patient.surname}
//               <br />
//               <strong>Email:</strong> {patient.email}
//               <br />
//             </li>
//           ))}
//         </ul>
//       )} */}
//     </div>
//   );
// };

// export default PatientsPage;
