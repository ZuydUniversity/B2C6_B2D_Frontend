"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { Verslag } from '../../Models/Verslag';
import { updateVerslag, getVerslag } from '@/serverActions/verslagactions';

const UpdateVerslagPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [date, setDate] = useState('');
    const [healthComplaints, setHealthComplaints] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [diagnose, setDiagnose] = useState('');

    useEffect(() => {
        if (id) {
            getVerslag(id)
                .then(data => {
                    setVerslag(data);
                    setDate(data.date);
                    setHealthComplaints(data.healthcomplaints);
                    setMedicalHistory(data.medicalhistory);
                    setDiagnose(data.diagnose);
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

        try {
            await updateVerslag(id!, {
                date,
                healthcomplaints: healthComplaints,
                medicalhistory: medicalHistory,
                diagnose,
                zorgverlener_id: verslag?.zorgverlener_id,
                patient_id: verslag?.patient_id,
            });
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
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
                        value={healthComplaints}
                        onChange={(e) => setHealthComplaints(e.target.value)}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Medische geschiedenis
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de medische geschiedenis in"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px'}}>
                        Diagnose
                    </label>
                    <Input
                        type="text"
                        placeholder="Voer de diagnose in"
                        value={diagnose}
                        onChange={(e) => setDiagnose(e.target.value)}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500'
                        }}
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

export default UpdateVerslagPage;
