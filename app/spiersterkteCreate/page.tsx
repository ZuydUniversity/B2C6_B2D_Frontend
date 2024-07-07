"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button, Textarea } from '@nextui-org/react';

export default function CreateSpiersterktePage() {
    const spiernaamRef = useRef<HTMLInputElement>(null);
    const spiermyometrieRef = useRef<HTMLInputElement>(null);
    const resultaatIdRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const spiernaamValue = spiernaamRef.current!.value;
        const spiermyometrieValue = spiermyometrieRef.current!.value;
        const resultaatIdValue = resultaatIdRef.current!.value;

        try {
            const response = await fetch('/api/spiersterkte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spiernaam: spiernaamValue,
                    spiermyometrie: spiermyometrieValue,
                    resultaatid: parseInt(resultaatIdValue, 10),
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
                            ref={resultaatIdRef}
                            required
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
                <Link href="../Spiersterktes">
                    <Button style={{ backgroundColor: 'lightgreen' }}>Terug</Button>
                </Link>
            </div>
            <br />
        </div>
    );
}
