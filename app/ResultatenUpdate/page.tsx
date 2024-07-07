"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Resultaat } from '../models/Resultaat'; // Adjust the path as per your actual file structure
import { Button } from '@nextui-org/react';

export default function UpdateResultaatPage() {
    const [resultaat, setResultaat] = useState<Resultaat>();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<string>('');

    const fetchResultaat = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get<Resultaat>(`/api/resultaten/${id}`);
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
            await axios.put(`/api/resultaten/${resultaat.id}`, updatedResultaat);
            alert('Resultaat updated successfully!');
        } catch (error) {
            console.error('There was an error updating the resultaat!', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Update Resultaat</h2>
            <form onSubmit={handleFetch} style={{ marginBottom: '20px' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <label>
                        ID:
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </label>
                    <Button type="submit" disabled={loading} style={{ marginTop: '10px', backgroundColor: 'lightgreen' }}>
                        Fetch
                    </Button>
                </div>
            </form>

            {resultaat && (
                <form onSubmit={handleSubmit}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={resultaat.name || ''}
                                onChange={(e) => setResultaat({ ...resultaat, name: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </label>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={resultaat.discription || ''}
                                onChange={(e) => setResultaat({ ...resultaat, discription: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </label>
                    </div>
                    <Button type="submit" disabled={loading} style={{ backgroundColor: 'lightgreen' }}>
                        Update
                    </Button>
                </form>
            )}

            {loading && <p>Loading...</p>}
            {!resultaat && !loading && <p>No data found.</p>}
        </div>
    );
};
