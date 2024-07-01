"use client";  // Ensure this directive is at the top of the file

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Verslag } from '../Models/Verslag';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react"; // Nieuwe import van de tabelcomponenten

const VerslagenPage = () => {
    const [verslagen, setVerslagen] = useState<Verslag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchDate, setSearchDate] = useState("");

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

    const filteredVerslagen = verslagen.filter(verslag =>
        verslag.date.toLowerCase().includes(searchDate.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: 'xx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '20px' }}>Verslagen</h1>
            <Input
                placeholder="Zoeken op datum..."
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                style={{ marginBottom: '10px' }}  // Voeg hier margin toe naar wens
            />
            <Table removeWrapper aria-label="Lijst van verslagen" style={{ marginBottom: '20px' }}>
                <TableHeader>
                    <TableColumn>Datum</TableColumn>
                    <TableColumn>Klachten</TableColumn>
                    <TableColumn>Medische geschiedenis</TableColumn>
                    <TableColumn>Diagnose</TableColumn>
                    <TableColumn>Acties</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredVerslagen.map(verslag => (
                        <TableRow key={verslag.id}>
                            <TableCell>{verslag.date}</TableCell>
                            <TableCell>{verslag.healthcomplaints}</TableCell>
                            <TableCell>{verslag.medicalhistory}</TableCell>
                            <TableCell>{verslag.diagnose}</TableCell>
                            <TableCell>
                                <Link href={`../verslagen/updateverslag?id=${verslag.id}`}>
                                    <button style={{ color: 'grey' }}>&nbsp; aanpassen</button>
                                </Link>
                                <Link href={`../verslagen/deleteverslag?id=${verslag.id}`}>
                                    <button style={{ color: 'red' }}>&nbsp; verwijderen</button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <Link href='../verslagen/createverslag'>
                    <button style={{ backgroundColor: 'lightgreen' }}>Maak een nieuw verslag</button>
                </Link>
            </div>
        </div>
    );
}

export default VerslagenPage;
