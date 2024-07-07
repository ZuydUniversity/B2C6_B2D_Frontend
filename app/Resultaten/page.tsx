'use client';

import { useEffect, useState } from 'react';
import { Resultaat } from '../models/Resultaat';

export default function GetResultaten() {
    const [data, setData] = useState<Resultaat[]>([]);

    function fetchData() {
        // Replace with your API endpoint
        fetch('/api/resultaten/')
            .then(response => response.json())
            .then((data: Resultaat[]) => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderCellValue = (value: any) => {
        if (typeof value === 'object' && value !== null) {
            // If the value is an object, convert it to a string representation
            return JSON.stringify(value);
        }
        return value;
    };

    const handleDelete = (id: number) => {
        fetch(`/api/resultaten/${id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                // If deletion is successful, fetch updated data
                fetchData();
            } else {
                throw new Error('Failed to delete item');
            }
        }).catch(error => console.error('Error deleting item:', error));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Data Table</h1>
            <div>
                <a href="/ResultatenCreate">
                    <button style={{ backgroundColor: 'lightgreen', marginBottom: '20px' }}>Resultaat aanmaken</button>
                </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {data.map((item, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        width: '300px',
                        boxSizing: 'border-box'
                    }}>
                        {Object.entries(item).map(([key, value], i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <strong>{key}:</strong> {renderCellValue(value)}
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <a href={`/Resultaten/${item['id']}`}>
                                <button style={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '10px 20px',
                                    cursor: 'pointer'
                                }}>View</button>
                            </a>
                            <button onClick={() => handleDelete(item.id)} style={{
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 20px',
                                cursor: 'pointer'
                            }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
