"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resultaat } from '../Models/Resultaat'; // Adjust the path as per your actual file structure


export default function UpdateResultaatPage(result: Resultaat) {
    const [resultaat, setResultaat] = useState<Resultaat | null>(result);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<string>('');

    const fetchResultaat = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get<Resultaat>(`http://localhost:8000/resultaten/${id}`);
            setResultaat(response.data);
        } catch (error) {
            console.error('There was an error fetching the resultaat!', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = (event: React.FormEvent) => {
        event.preventDefault();
        if (id) {
            fetchResultaat(id);
        } else {
            alert('Please enter an ID.');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!resultaat) {
            console.error('Resultaat data is not loaded yet.');
            return;
        }

        const updatedResultaat: Resultaat = {
            ...resultaat,
            name: resultaat.name,
            discription: resultaat.discription
        };

        try {
            setLoading(true);
            await axios.put(`http://localhost:8000/resultaten/${resultaat.id}`, updatedResultaat);
            alert('Resultaat updated successfully!');
        } catch (error) {
            console.error('There was an error updating the resultaat!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Resultaat</h2>
            <form onSubmit={handleFetch}>
                <div>
                    <label>
                        ID:
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </label>
                    <button type="submit" disabled={loading}>Fetch</button>
                </div>
            </form>

            {resultaat && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={resultaat.name || ''}
                                onChange={(e) => setResultaat({ ...resultaat, name: e.target.value })}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={resultaat.discription || ''}
                                onChange={(e) => setResultaat({ ...resultaat, discription: e.target.value })}
                            />
                        </label>
                    </div>
                    <button type="submit" disabled={loading}>Update</button>
                </form>
            )}

            {loading && <p>Loading...</p>}
            {!resultaat && !loading && <p>No data found.</p>}
        </div>
    );
};


