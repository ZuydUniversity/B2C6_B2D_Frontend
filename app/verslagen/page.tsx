"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Verslag } from '../Models/Verslag';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Tooltip } from "@nextui-org/react";
import { getAllVerslagen } from '@/serverActions/verslagactions';

const VerslagenPage = () => {
    const [verslagen, setVerslagen] = useState<Verslag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchDate, setSearchDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllVerslagen();
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
        
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
             <div style={{ marginTop: '0px', marginBottom:'40px' }}>
                <Link href="../dashboard">
                    <Button style={{ backgroundColor: '#000369' }}>
                        <img
                            src="/backiconVerslagen.png"
                            alt="Back"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </Link>
            </div>
            <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '50px' }}>Verslagen</h1>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', width: '300px', border: '1px solid transparent', borderRadius: '4px', paddingLeft: '10px', alignItems: 'center' }}>
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
                <Link href='../verslagen/createverslag'>
                    <Button
                        style={{
                            backgroundColor: '#000369',
                            cursor: 'pointer',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            marginLeft: '20px',
                            border: 'none',
                            borderRadius: '10px',
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
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', border: '1px solid #ccc' }}>
                <Table isStriped aria-label="Lijst van verslagen">
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
                                        <Tooltip content="Verwijderen">
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
            </div>
        </div>
    );
}

export default VerslagenPage;
