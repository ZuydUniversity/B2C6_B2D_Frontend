"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import { link } from 'fs';

const CreateVerslagPage: React.FC = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const healthComplaintsRef = useRef<HTMLTextAreaElement>(null);
  const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
  const diagnoseRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const dateValue = dateRef.current!.value;
    const healthComplaintsValue = healthComplaintsRef.current!.value;
    const medicalHistoryValue = medicalHistoryRef.current!.value;
    const diagnoseValue = diagnoseRef.current!.value;
    const zorgverlener_id = null;
    const patient_id = null

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
    <div>
      <div>
        <h1>Create Verslag Page</h1>
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
          <Textarea
            variant="bordered"
            placeholder="Voer de gezondheidsklachten in"
            disableAnimation
            disableAutosize
            ref={healthComplaintsRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'resize-y min-h-[40px]',
            }}
          />
        </div>

        <div>
          Medische geschiedenis:
          <Textarea
            variant="bordered"
            placeholder="Voer de medische geschiedenis in"
            disableAnimation
            disableAutosize
            ref={medicalHistoryRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'resize-y min-h-[40px]',
            }}
          />
        </div>

        <div>
          Diagnose:
          <Textarea
            variant="bordered"
            placeholder="Voer de diagnose in"
            disableAnimation
            disableAutosize
            ref={diagnoseRef}
            required
            classNames={{
              base: 'max-w-xs',
              input: 'resize-y min-h-[40px]',
            }}
          />
        </div>

        <div>
          <br />
            <Button type="submit" style={{ backgroundColor: 'lightgreen' }} >
            Verslag aanmaken
          </Button>
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

// toch niet gefixed
