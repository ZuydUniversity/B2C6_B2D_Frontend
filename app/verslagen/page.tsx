// Ensure this directive is at the top of the file
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Verslag } from '../Models/Verslag';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, CircularProgress, Button, Tooltip } from "@nextui-org/react";

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
            <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Verslagen</h1>
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
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Tooltip content="Aanpassen">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Link href={`../verslagen/updateverslag?id=${verslag.id}`}>
                                                <img src="/editiconVerslagen.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
                                            </Link>
                                        </span>
                                    </Tooltip>
                                    <Tooltip  content="Verwijderen">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <Link href={`../verslagen/deleteverslag?id=${verslag.id}`}>
                                                <img src="/deleteiconVerslagen.png" alt="Delete" style={{ width: '20px', height: '20px' }} />
                                            </Link>
                                        </span>
                                    </Tooltip>
                                </div>
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
                                paddingLeft: '20px', // Ruimte voor de tekst
                                paddingRight: '20px', // Ruimte rechts van de tekst
                                marginLeft: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ color: "white" }}>Maak een nieuw verslag</span>
                            <img 
                                src="/addiconVerslagen.png" 
                                alt="Add" 
                                style={{ width: '25px', height: '25px', marginLeft: '10px' }} 
                            />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default VerslagenPage;
