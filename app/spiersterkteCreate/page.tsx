'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Textarea } from '@nextui-org/react';

export default function CreateSpiersterktePage() {
    const spiernaamRef = useRef<HTMLInputElement>(null);
    const spiermyometrieRef = useRef<HTMLInputElement>(null);
    const [resultaatId, setResultaatId] = useState<string | undefined>();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('id');
        if (id) {
            setResultaatId(id);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const spiernaamValue = spiernaamRef.current!.value;
        const spiermyometrieValue = spiermyometrieRef.current!.value;

        try {
            const response = await fetch('/api/spiersterkten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spiernaam: spiernaamValue,
                    spiermyometrie: spiermyometrieValue,
                    resultaatid: parseInt(resultaatId || '0', 10),
                }),
            });

            if (response.ok) {
                console.log('Spiersterkte succesvol aangemaakt');
                // Add navigation logic here if you want to navigate to another page
            } else {
                console.error('Fout bij aanmaken van spiersterkte:', response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Netwerkfout bij aanmaken van spiersterkte:', error.message);
            } else {
                console.error('Onverwachte fout:', error);
            }
        }
    };

    return (
        <div>
            <div>
                <h1>Create Spiersterkte Page</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    Spiernaam:
                    <label>
                        <input
                            type="text"
                            ref={spiernaamRef}
                            required
                            className="max-w-xs"
                        />
                    </label>
                </div>
                <div>
                    Spiermyometrie:
                    <label>
                        <input
                            type="text"
                            ref={spiermyometrieRef}
                            required
                            className="max-w-xs"
                        />
                    </label>
                </div>
                <div>
                    Resultaat ID:
                    <label>
                        <input
                            type="number"
                            value={resultaatId || ''}
                            readOnly
                            className="max-w-xs"
                        />
                    </label>
                </div>

                <div>
                    <br />
                    <Button type="submit" style={{ backgroundColor: 'lightgreen' }} >
                        Spiersterkte aanmaken
                    </Button>
                </div>
            </form>

            <br />
            <br />
            <div>
                <Link href="../Resultaten">
                    <Button style={{ backgroundColor: 'lightgreen' }}>Terug</Button>
                </Link>
            </div>
            <br />
        </div>
    );
}
