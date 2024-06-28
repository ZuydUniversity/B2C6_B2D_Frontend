// import { Patient } from "../../models/Patient";
// import React from "react";

// async function fetchPatients(): Promise<Patient[]> {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/patients", {
//       cache: "no-store", // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch patients");
//     }
//     const patients: Patient[] = await response.json();
//     return patients;
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     return [];
//   }
// } 

// const PatientsPage = async () => {
//   const patients: Patient[] = await fetchPatients();
  
//   return (
//     <div>
//       <h1>Patients</h1>
//       <ul>
//         {Array.isArray(patients) && patients.length > 0 ? (
//           patients.map((patient) => (
//             <li key={patient.id}>
//               <strong>Naam:</strong> {patient.name} {patient.surname}
//               <br />
//               <strong>Email:</strong> {patient.email}
//               <br />
//             </li>
//           ))
//         ) : (
//           <li>Geen patienten gevonden</li>
//         )}
//       </ul>
//     </div>
//   );
//   };

// export default PatientsPage;
// app/patients/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import AddPatientForm from '@/components/AddPatientForm';
import { Patient } from '@/models/Patient';

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

const PatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientsData = await fetchPatients();
      setPatients(patientsData);
    };

    fetchData();
  }, []); // Leeg array als tweede argument zorgt ervoor dat useEffect alleen bij mounten wordt uitgevoerd

  return (
    <div>
      <h1>Patiënten</h1>

      {/* Formulier om een nieuwe patiënt toe te voegen */}
      <AddPatientForm />

      {/* Weergeven van bestaande patiënten */}
      <ul>
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient.id}>
              <strong>Naam:</strong> {patient.name} {patient.surname}
              <br />
              <strong>Email:</strong> {patient.email}
              <br />
            </li>
          ))
        ) : (
          <li>Geen patiënten gevonden</li>
        )}
      </ul>
    </div>
  );
};

export default PatientsPage;
