import { Patient } from "../app/Models/Patient"; // Zorg ervoor dat je pad correct is

async function fetchPatients(): Promise<Patient[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/patients', {
      cache: 'no-store' // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
    });
    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }
    const patients = await response.json();
    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
}

// async function fetchPatients(): Promise<Patient[]> {
//   try {
//     const response = await fetch('http://52.232.64.59:8000/patients', {
//       cache: 'no-store' // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
//     });
//     if (!response.ok) {
//       throw new Error('Failed to fetch patients');
//     }
//     const patients = await response.json();
//     return patients;
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     return [];
//   }
// }

const PatientsPage = async () => {
  const patients: Patient[] = await fetchPatients();

  return (
    <div>
      <h1>Patients</h1>
      <ul>
        {Array.isArray(patients) && patients.length > 0 ? (
          patients.map((patient) => (
            <li key={patient.id}>
              <strong>Naam:</strong> {patient.name} {patient.surname}<br />
              <strong>Email:</strong> {patient.email}<br />
            </li>
          ))
        ) : (
          <li>Geen patienten gevonden!</li>
        )}
      </ul>
    </div>
  );
};

export default PatientsPage;