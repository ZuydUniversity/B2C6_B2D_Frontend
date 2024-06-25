"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { Verslag } from '../../Models/Verslag';
import { Button } from '@nextui-org/react';
import { Textarea } from '@nextui-org/react';
import Link from 'next/link';

const UpdateVerslagpage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dateRef = useRef<HTMLInputElement>(null);
    const healthComplaintsRef = useRef<HTMLTextAreaElement>(null);
    const medicalHistoryRef = useRef<HTMLTextAreaElement>(null);
    const diagnoseRef = useRef<HTMLTextAreaElement>(null);

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
                    setVerslag(data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const dateValue = dateRef.current!.value;
        const healthComplaintsValue = healthComplaintsRef.current!.value;
        const medicalHistoryValue = medicalHistoryRef.current!.value;
        const diagnoseValue = diagnoseRef.current!.value;

        try {
            const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: dateValue,
                    healthcomplaints: healthComplaintsValue,
                    medicalhistory: medicalHistoryValue,
                    diagnose: diagnoseValue,
                    zorgverlener_id: verslag?.zorgverlener_id,
                    patient_id: verslag?.patient_id,
                }),
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error('Failed to update verslag');
            }

            router.push('/verslagen'); // Terug naar de verslagen pagina
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleBack = () => {
        router.push('/verslagen');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <h1>Update Verslag Page</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Datum:
                        <input
                            type="date"
                            ref={dateRef}
                            required
                            defaultValue={verslag?.date}
                        />
                    </label>
                </div>

                <div>
                    Gezondheidsklachten:
                    <Textarea
                        variant="bordered"
                        defaultValue={verslag?.healthcomplaints}
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
                        disableAnimation
                        disableAutosize
                        ref={medicalHistoryRef}
                        required
                        defaultValue={verslag?.medicalhistory}
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
                        disableAnimation
                        disableAutosize
                        ref={diagnoseRef}
                        required
                        defaultValue={verslag?.diagnose}
                        classNames={{
                            base: 'max-w-xs',
                            input: 'resize-y min-h-[40px]',
                        }}
                    />
                </div>

                <div>
                    <br />
                    <Button type="submit" style={{ backgroundColor: 'lightgreen' }}>
                        Verslag aanpassen
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

export default UpdateVerslagpage;
