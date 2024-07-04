"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importeer de Link-component van Next.js voor navigatie
import { Verslag } from '../Models/Verslag'; // Importeer het Verslag-model
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Tooltip } from "@nextui-org/react"; // Importeer UI-componenten van NextUI
import { getAllVerslagen } from '@/serverActions/verslagactions'; // Importeer de serveracties om verslagen op te halen

const VerslagenPage = () => {
    const [verslagen, setVerslagen] = useState<Verslag[]>([]); // State voor de lijst met verslagen
    const [loading, setLoading] = useState(true); // State om laadstatus bij te houden
    const [error, setError] = useState<string | null>(null); // State om foutmeldingen bij te houden
    const [searchDate, setSearchDate] = useState(""); // State voor het zoekfilter op datum

    useEffect(() => {
        // Effect om data op te halen bij het laden van de pagina
        const fetchData = async () => {
            try {
                const data = await getAllVerslagen(); // Haal alle verslagen op vanuit de server
                setVerslagen(data); // Zet de opgehaalde verslagen in de state
            } catch (error) {
                setError((error as Error).message); // Vang fouten op en zet de foutmelding in de state
            } finally {
                setLoading(false); // Zet laadstatus op false wanneer de operatie is voltooid
            }
        };

        fetchData(); // Roep de fetchData functie aan om data op te halen bij mounten van de component
    }, []); // Lege array als tweede argument zorgt ervoor dat de effect slechts één keer wordt uitgevoerd bij het mounten

    if (loading) {
        return <div>Loading...</div>; // Weergeef een laadboodschap zolang de data aan het laden is
    }

    if (error) {
        return <div>Error fetching verslagen: {error}</div>; // Weergeef een foutboodschap als er een fout optreedt bij het laden van verslagen
    }

    // Filter de verslagen op basis van de zoekdatum
    const filteredVerslagen = verslagen.filter(verslag =>
        verslag.date.toLowerCase().includes(searchDate.toLowerCase())
    );

    return (
        <div style={{ padding: '50px', backgroundColor: 'rgb(216, 234, 255)', minHeight: '100vh' }}>
            {/* Bovenste sectie met titel en navigatieknop */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Link href="../dashboard"> {/* Navigatieknop terug naar dashboard */}
                    <Button style={{ backgroundColor: '#000369', marginRight: '30px', marginTop: '-20px' }}>
                        <img
                            src="/backiconVerslagen.png"
                            alt="Back"
                            style={{ width: '25px', height: '25px' }}
                        />
                    </Button>
                </Link>
                <h1 style={{ fontSize: 'xxx-large', fontWeight: 'bold', borderBottom: '2px solid black', display: 'inline-block', marginBottom: '36px' }}>
                    Verslagen {/* Titel van de pagina */}
                </h1>
            </div>

            {/* Zoek- en toevoegknoppen */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                {/* Zoekveld met icoon */}
                <div style={{ display: 'flex', width: '300px', border: '1px solid transparent', borderRadius: '4px', paddingLeft: '10px', alignItems: 'center' }}>
                    <img src="/searchiconVerslagen.png" alt="Search" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    <Input
                        placeholder="Zoeken op datum..." // Placeholder tekst voor zoekveld
                        value={searchDate} // Waarde van het zoekveld
                        onChange={(e) => setSearchDate(e.target.value)} // Functie om zoekterm bij te werken bij invoer
                        style={{
                            flex: '1',
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                        }}
                    />
                </div>
                <Link href='../verslagen/createverslag'> {/* Knop om een nieuw verslag toe te voegen */}
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

            {/* Tabel met verslagen */}
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
                        {/* Map door gefilterde verslagen en toon elke rij */}
                        {filteredVerslagen.map(verslag => (
                            <TableRow key={verslag.id}>
                                <TableCell>{verslag.date}</TableCell>
                                <TableCell>{verslag.healthcomplaints}</TableCell>
                                <TableCell>{verslag.medicalhistory}</TableCell>
                                <TableCell>{verslag.diagnose}</TableCell>
                                <TableCell>
                                    {/* Actieknoppen voor elk verslag */}
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
