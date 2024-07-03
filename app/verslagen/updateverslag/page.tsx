"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { Verslag } from '../../Models/Verslag'; 

const UpdateVerslagpage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dateRef = useRef<HTMLInputElement>(null);
    const healthComplaintsRef = useRef<HTMLInputElement>(null);
    const medicalHistoryRef = useRef<HTMLInputElement>(null);
    const diagnoseRef = useRef<HTMLInputElement>(null);

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
        event.preventDefault();

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

            router.push('/verslagen');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            <div>
                <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Update Verslag</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Datum
                    </label>
                    <input
                        type="date"
                        ref={dateRef}
                        required
                        defaultValue={verslag?.date}
                        style={{
                            display: 'block',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                            fontSize: '16px',
                            marginBottom: '10px'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Gezondheidsklachten
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de gezondheidsklachten in"
                        ref={healthComplaintsRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                        defaultValue={verslag?.healthcomplaints}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Medische geschiedenis
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de medische geschiedenis in"
                        ref={medicalHistoryRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                        defaultValue={verslag?.medicalhistory}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Diagnose
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de diagnose in"
                        ref={diagnoseRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                        defaultValue={verslag?.diagnose}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Button
                        type="submit"
                        style={{
                            backgroundColor: '#000369',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Verslag bijwerken
                        <img
                            src="/editicon2Verslagen.png"
                            alt="Add"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </div>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link href="/verslagen">
                    <Button style={{ backgroundColor: '#000369' }}>
                        <img
                            src="/backiconVerslagen.png"
                            alt="Add"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UpdateVerslagpage;
