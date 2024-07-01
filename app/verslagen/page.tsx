// Ensure this directive is at the top of the file
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Verslag } from '../Models/Verslag';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, CircularProgress, Button } from "@nextui-org/react";

const VerslagenPage = () => {
    const [verslagen, setVerslagen] = useState<Verslag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchDate, setSearchDate] = useState("");
    const [creatingNewVerslag, setCreatingNewVerslag] = useState(false);

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

    const handleCreateNewVerslagClick = () => {
        setCreatingNewVerslag(true);
        // Simulate asynchronous creation process
        setTimeout(() => {
            // Reset state and perform any necessary actions after creating new verslag
            setCreatingNewVerslag(false);
        }, 4000); // Example: Simulate 2 seconds loading time
    };

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
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            <h1 style={{ fontSize: 'xx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Verslagen</h1>
            <div style={{ display: 'flex', marginBottom: '10px', width: '300px', border: '1px solid transparent', borderRadius: '4px', paddingLeft: '10px', alignItems: 'center' }}>
                <img src="/searchiconVerslagen.png" alt="Search" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                <Input
                    placeholder="Zoeken op datum..."
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    style={{
                        flex: '1',
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                    }}
                />
            </div>

            <Table isStriped aria-label="Lijst van verslagen" style={{ marginBottom: '20px' }}>
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
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                {creatingNewVerslag ? (
                    <CircularProgress aria-label="Loading..." />
                ) : (
                    <Link href='../verslagen/createverslag'>
                        <Button
                            onClick={handleCreateNewVerslagClick}
                            radius="full"
                            style={{
                                backgroundColor: '#000369', // Achtergrondkleur
                                cursor: 'pointer',
                                backgroundImage: `url("/addiconVerslagen.png")`, // Achtergrondafbeelding
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'left', // Positie van het icoon
                                backgroundSize: '25px', // Grootte van het icoon
                                paddingLeft: '20px', // Ruimte toevoegen voor het icoon
                                paddingRight: '20px', // Ruimte rechts van de tekst
                                marginLeft: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between', // Ruimte tussen icoon en tekst
                            }}
                        >
                            <span style={{ marginLeft: '10px', color: "white" }}>Maak een nieuw verslag</span> {/* Extra ruimte voor tekst aan de linkerkant */}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default VerslagenPage;
