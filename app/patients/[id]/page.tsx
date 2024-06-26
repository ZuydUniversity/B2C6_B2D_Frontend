
"use client"
import { useState, useEffect, FC } from "react";
import { Patient } from "../../../Models/Patient"; // Zorg ervoor dat het pad naar je model correct is

interface PageProps {
  params: { id: number };
}

const PatientPage: FC<PageProps> = ({ params }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null); // State voor foutmelding toegevoegd

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/patients/${params.id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch patient");
        }
        const patientData = await response.json();
        setPatient(patientData);
      } catch (error) {
        console.error(`Error fetching patient with id ${params.id}:`, error);
        setError(`Error fetching patient with id ${params.id}`);
        setPatient(null);
      }
    };

    fetchPatientData();
  }, [params.id]);

  return (
    <div>
      <p>Hallootjes</p>
      {error ? (
        <p>{error}</p>
      ) : patient ? (
        <div>
          <p>Patient naam: {patient.name}</p>
          {/* Toon andere eigenschappen van de zorgverlener */}
        </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientPage;
