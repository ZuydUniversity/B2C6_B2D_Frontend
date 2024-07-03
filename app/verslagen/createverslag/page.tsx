"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';

const CreateVerslagPage: React.FC = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const healthComplaintsRef = useRef<HTMLInputElement>(null);
  const medicalHistoryRef = useRef<HTMLInputElement>(null);
  const diagnoseRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Voorkom standaard formulierinzending

    const dateValue = dateRef.current!.value;
    const healthComplaintsValue = healthComplaintsRef.current!.value;
    const medicalHistoryValue = medicalHistoryRef.current!.value;
    const diagnoseValue = diagnoseRef.current!.value;

    try {
      const response = await fetch('http://127.0.0.1:8000/verslag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateValue,
          healthcomplaints: healthComplaintsValue,
          medicalhistory: medicalHistoryValue,
          diagnose: diagnoseValue,
          zorgverlener_id: null,
          patient_id: null
        }),
      });

      if (response.ok) {
        console.log('Verslag succesvol aangemaakt');
        // Voeg hier navigatielogica toe als je terug wilt gaan naar een andere pagina
      } else {
        console.error('Fout bij aanmaken van verslag:', response.statusText);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Netwerkfout bij aanmaken van verslag:', error.message);
      } else {
        console.error('Onverwachte fout:', error);
      }
    }
  };

  return (
    <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
      <div>
        <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Nieuw Verslag</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Datum:
            <input
              type="date"
              ref={dateRef}
              required
            />
          </label>
        </div>

        <div>
          Gezondheidsklachten:
          <Input
            type="text"
            placeholder="Voer de gezondheidsklachten in"
            ref={healthComplaintsRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            }}
          />
        </div>

        <div>
          Medische geschiedenis:
          <Input
            type="text"
            placeholder="Voer de medische geschiedenis in"
            ref={medicalHistoryRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            }}
          />
        </div>

        <div>
          Diagnose:
          <Input
            type="text"
            placeholder="Voer de diagnose in"
            ref={diagnoseRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
            }}
          />
        </div>

        <div>
          <br />
          <Link  href="../verslagen" >
            <Button type="submit" style={{ backgroundColor: 'lightgreen' }}>
              Verslag aanmaken
            </Button>
          </Link>
        </div>
      </form>

      <br />
      <br />
      <div>
        <Link href="../verslagen">
          <Button style={{ backgroundColor: 'lightgreen' }}>Terug</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateVerslagPage;
