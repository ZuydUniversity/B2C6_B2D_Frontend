"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Importeer useRouter en useSearchParams
import { Verslag } from '../../Models/Verslag'; 

const UpdateVerslagpage = () => {
    const router = useRouter(); // Haal router object op
    const searchParams = useSearchParams(); // Haal query parameters op
    const id = searchParams.get('id'); // Haal 'id' parameter op uit query
    const [verslag, setVerslag] = useState<Verslag | null>(null); // State voor het huidige verslag
    const [loading, setLoading] = useState(true); // State om laadstatus weer te geven
    const [error, setError] = useState<string | null>(null); // State om foutmeldingen weer te geven

    // Refs voor het ophalen van waarden uit formuliervelden
    const dateRef = useRef<HTMLInputElement>(null);
    const healthComplaintsRef = useRef<HTMLTextAreaElement>(null);
    const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
    const diagnoseRef = useRef<HTMLTextAreaElement>(null);

    // Effect om het verslag op te halen bij het laden van de pagina
    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/verslag/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch verslag');
                    }
                    return response.json();
                })
                .then(data => {
                    setVerslag(data); // Zet het opgehaalde verslag in de state
                    setLoading(false); // Zet laadstatus op false
                })
                .catch(error => {
                    setError(error.message); // Zet foutmelding als er een fout optreedt
                    setLoading(false); // Zet laadstatus op false
                });
        }
    }, [id]); // Voer effect uit wanneer 'id' verandert

    // Functie om formulier te verwerken bij verzending
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Voorkom standaard formuliergedrag

        // Haal waarden op uit de referenties naar de formuliervelden
        const dateValue = dateRef.current!.value;
        const healthComplaintsValue = healthComplaintsRef.current!.value;
        const medicalHistoryValue = medicalHistoryRef.current!.value;
        const diagnoseValue = diagnoseRef.current!.value;

        try {
            // Doe een PUT request naar de API om het verslag bij te werken
            const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
                method: 'PUT', // Methode voor bijwerken van gegevens
                headers: {
                    'Content-Type': 'application/json', // Type van de te verzenden data
                },
                body: JSON.stringify({ // Zet de te verzenden data om in JSON formaat
                    date: dateValue,
                    healthcomplaints: healthComplaintsValue,
                    medicalhistory: medicalHistoryValue,
                    diagnose: diagnoseValue,
                    zorgverlener_id: verslag?.zorgverlener_id, // Optionele data vanuit de state
                    patient_id: verslag?.patient_id, // Optionele data vanuit de state
                }),
                cache: "no-store", // Geen cache gebruiken voor het verzoek
            });

            if (!response.ok) { // Controleren of het verzoek gelukt is
                throw new Error('Failed to update verslag');
            }

            router.push('/verslagen'); // Ga terug naar de lijst met verslagen
        } catch (error) {
            setError((error as Error).message); // Vang foutmelding op en zet in de state
        }
    };

    // Functie om terug te gaan naar de lijst met verslagen
    const handleBack = () => {
        router.push('/verslagen');
    };

    // Toon een laadindicator als de data nog wordt geladen
    if (loading) {
        return <div>Loading...</div>;
    }

    // Toon foutmelding als er een fout optreedt bij het laden van data
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render het formulier om het verslag bij te werken
    return (
        <div>
            <div>
                <h1>Update Verslag Page</h1>
            </div>

            <form onSubmit={handleSubmit}> {/* Formulier voor het bijwerken van het verslag */}
                <div>
                    <label>
                        Datum:
                        <input
                            type="date"
                            ref={dateRef} // Verwijzing naar de input voor datum
                            required
                            defaultValue={verslag?.date} // Standaardwaarde instellen (optioneel)
                        />
                    </label>
                </div>

                <div>
                    Gezondheidsklachten:
                    <textarea
                        defaultValue={verslag?.healthcomplaints} // Standaardwaarde instellen (optioneel)
                        ref={healthComplaintsRef} // Verwijzing naar textarea voor gezondheidsklachten
                        required
                        className='max-w-xs resize-y min-h-[40px]'
                    />
                </div>

                <div>
                    Medische geschiedenis:
                    <textarea
                        ref={medicalHistoryRef} // Verwijzing naar textarea voor medische geschiedenis
                        required
                        defaultValue={verslag?.medicalhistory} // Standaardwaarde instellen (optioneel)
                        className='max-w-xs resize-y min-h-[40px]'
                    />
                </div>

                <div>
                    Diagnose:
                    <textarea
                        ref={diagnoseRef} // Verwijzing naar textarea voor diagnose
                        required
                        defaultValue={verslag?.diagnose} // Standaardwaarde instellen (optioneel)
                        className='max-w-xs resize-y min-h-[40px]'
                    />
                </div>

                <div>
                    <br />
                    <button type="submit" style={{ backgroundColor: 'lightgreen' }}>
                        Verslag aanpassen {/* Knop om het verslag bij te werken */}
                    </button>
                </div>
            </form>

            <br />
            <br />
            <div>
                <Link href="../verslagen"> {/* Link terug naar de lijst met verslagen */}
                    <button style={{ backgroundColor: 'lightgreen' }}>Terug</button>
                </Link>
            </div>
        </div>
    );
};

export default UpdateVerslagpage;
