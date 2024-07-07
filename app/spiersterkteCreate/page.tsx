'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Spiersterkte } from '../models/Spiersterkte';

export default function AddSpiersterkte() {
    const router = useRouter();
    const { id } = router.query; // Get the ID from query parameters
    const [spiersterkteData, setSpiersterkteData] = useState<Partial<Spiersterkte>>({ resultaatid: Number(id) });

    const handleInputChange = (key: keyof Spiersterkte, value: string) => {
        setSpiersterkteData({
            ...spiersterkteData,
            [key]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/spiersterkte`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(spiersterkteData),
            });

            if (response.ok) {
                console.log('Spiersterkte succesvol toegevoegd');
                router.push(`/resultaten/${id}`);
            } else {
                console.error('Fout bij toevoegen van spiersterkte:', response.statusText);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Netwerkfout bij toevoegen van spiersterkte:', error.message);
            } else {
                console.error('Onverwachte fout:', error);
            }
        }
    };

    return (
        <div>
            <h1>Voeg Spiersterkte toe aan Resultaat {id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <span>Spiernaam:</span>
                        <input
                            type="text"
                            onChange={(e) => handleInputChange('spiernaam', e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Spiermyometrie:</span>
                        <input
                            type="text"
                            onChange={(e) => handleInputChange('spiermyometrie', e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Toevoegen</button>
                </div>
            </form>
        </div>
    );
}