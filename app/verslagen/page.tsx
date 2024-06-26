"use client";  // Ensure this directive is at the top of the file

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Verslag } from '../Models/Verslag'; 

const VerslagenPage = () => {
    const [verslagen, setVerslagen] = useState<Verslag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/verslag', {
                    cache: "no-store"
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch verslagen: ${res.statusText}`);
                }

                const data: Verslag[] = await res.json();
                setVerslagen(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching verslagen: {error}</div>;
    }

    return (
        <div>
            <div>
                <h1>Verslagen</h1>
                <ul style={{ backgroundColor: 'paleturquoise' }}>
                    {verslagen.map(verslag => (
                        <li key={verslag.id}>
                            {verslag.date}, {verslag.healthcomplaints}, {verslag.medicalhistory}, {verslag.diagnose}
                            <Link href={`../verslagen/updateverslag?id=${verslag.id}`}>
                                <button style={{ color: 'grey' }}>&nbsp; aanpassen</button>
                            </Link>
                            <Link href={`../verslagen/deleteverslag?id=${verslag.id}`}>
                                <button style={{ color: 'red' }}>&nbsp; verwijderen</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <br />
                <Link href='../verslagen/createverslag'>
                    <button style={{ backgroundColor: 'lightgreen' }}>Maak een nieuw verslag</button>
                </Link>
            </div>
        </div>
    );
}

export default VerslagenPage;
