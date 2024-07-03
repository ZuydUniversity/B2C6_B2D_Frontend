"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Verslag } from '../../Models/Verslag'; // Controleer of dit het juiste pad is naar Verslag.ts
import { getVerslag, deleteVerslag } from '@/serverActions/verslagactions'; // Zorg ervoor dat dit pad correct is

const DeleteVerslagPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const data = await getVerslag(id);
                    setVerslag(data);
                } catch (error) {
                    setError((error as Error).message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        if (id) {
            try {
                await deleteVerslag(id);
                router.push('/verslagen'); // Terug naar de verslagen pagina
            } catch (error) {
                setError((error as Error).message);
            }
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
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Verwijder Verslag</h1>
            {verslag && (
                <div>
                    <p>Datum: {verslag.date}</p>
                    <p>Gezondheidsklachten: {verslag.healthcomplaints}</p>
                    <p>Medische geschiedenis: {verslag.medicalhistory}</p>
                    <p>Diagnose: {verslag.diagnose}</p>
                    <button onClick={handleDelete} style={{ color: 'red' }}>Verwijder</button>
                    <button onClick={handleBack} style={{ marginLeft: '10px' }}>Terug</button>
                </div>
            )}
        </div>
    );
};

export default DeleteVerslagPage;
