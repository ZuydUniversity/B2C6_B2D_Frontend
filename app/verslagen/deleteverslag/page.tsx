"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Verslag } from '../../Models/Verslag'; // Pas het pad aan naar waar je Verslag.ts bestand zich bevindt

const DeleteVerslagPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [verslag, setVerslag] = useState<Verslag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/verslag/${id}`, {
            method: 'DELETE',
            cache: "no-store",
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete verslag');
            }
            router.push('/verslagen'); // Terug naar de verslagen pagina
        })
        .catch(error => {
            setError(error.message);
        });
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
            <h1>Verwijder Verslag</h1>
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
}

export default DeleteVerslagPage;
