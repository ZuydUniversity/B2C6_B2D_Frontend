"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import { Button, Textarea } from '@nextui-org/react';

export default function CreateResultaatPage() {
    const nameRef = useRef<HTMLInputElement>(null);
    const dateRef = useRef<HTMLInputElement>(null);
    const discriptionRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const nameValue = nameRef.current!.value;
        const dateValue = dateRef.current!.value;
        const discriptionValue = discriptionRef.current!.value;

        try {
            const response = await fetch('/api/resultaten/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameValue,
                    date: dateValue,
                    discription: discriptionValue,
                    // patient_id: null
                }),
            });

            if (response.ok) {
                console.log('Resultaat succesvol aangemaakt');
                // Add navigation logic here if you want to navigate to another page
            } else {
                console.error('Fout bij aanmaken van resultaat:', response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Netwerkfout bij aanmaken van resultaat:', error.message);
            } else {
                console.error('Onverwachte fout:', error);
            }
        }
    };

    return (
        <div>
            <div>
                <h1>Create Resultaat Page</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    Name:
                    <label>
                        <input
                            type="text"
                            ref={nameRef}
                            required
                            className="max-w-xs"
                        />
                    </label>
                </div>
                <div>
                    Date:
                    <label>
                        <input
                            type="text"
                            ref={dateRef}
                            required
                            className="max-w-xs"
                        />
                    </label>
                </div>
                <div>
                    Discription:
                    <Textarea
                        variant="bordered"
                        placeholder="Voer de beschrijving van het resultaat in"
                        disableAnimation
                        disableAutosize
                        ref={discriptionRef}
                        required
                        classNames={{
                            base: 'max-w-xs',
                            input: 'resize-y min-h-[40px]',
                        }}
                    />
                </div>

                <div>
                    <br />
                    <button type="submit" style={{
                        backgroundColor: 'lightgreen',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer'
                    }}>
                        Resultaat aanmaken
                    </button>
                </div>
            </form>

            <br />
            <br />
            <div>
                <Link href="../Resultaten">
                    <button style={{
                        backgroundColor: 'lightgreen',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer'
                    }}>
                        Terug
                    </button>
                </Link>
            </div>
            <br />
        </div>
    );
}
