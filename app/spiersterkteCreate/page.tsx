'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Resultaat } from '../models/Resultaat';
import { Spiersterkte } from '../models/Spiersterkte';
import { Button } from '@nextui-org/react';

export default function GetResultaatById({ params }: { params: { id: BigInteger } }) {
    const [resultaat, setResultaatData] = useState<Resultaat | undefined>(undefined);
    const [spiersterkte, setSpiersterkte] = useState<Spiersterkte[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateData, setUpdateData] = useState<Partial<Resultaat>>({});
    const OBJ_ID = params["id"];

    useEffect(() => {
        // Fetch Resultaat data
        fetch(`/api/resultaten/${OBJ_ID}`)
            .then(response => response.json())
            .then((data: Resultaat) => {
                setResultaatData(data);
            });

        // Fetch Spiersterkte data
        fetch(`/api/spiersterkte/?resultaatid=${OBJ_ID}`)
            .then(response => response.json())
            .then((data: Spiersterkte[]) => {
                setSpiersterkte(data);
            });
    }, [OBJ_ID]);

    const handleUpdateClick = () => {
        setIsUpdating(true);
        setUpdateData(resultaat || {});
    };

    const handleSaveClick = () => {
        fetch(`/api/resultaten/${OBJ_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then(response => response.json())
            .then((data: Resultaat) => {
                setResultaatData(data);
                setIsUpdating(false);
            })
            .catch(error => console.error('Error updating data:', error));
    };

    const handleInputChange = (key: keyof Resultaat, value: string | number) => {
        setUpdateData({
            ...updateData,
            [key]: value,
        });
    };

    const handleDeleteClick = (id: number) => {
        fetch(`/api/spiersterkte/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    setSpiersterkte(spiersterkte.filter(spier => spier.id !== id));
                } else {
                    console.error('Failed to delete spiersterkte:', response.statusText);
                }
            })
            .catch(error => console.error('Error deleting spiersterkte:', error));
    };

    // Wait for fetch to be completed
    if (resultaat === undefined) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Object {OBJ_ID}</h1>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <table border={1}>
                    <thead>
                        <tr>
                            {Object.keys(resultaat).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={`${OBJ_ID}`}>
                            {Object.values(resultaat).map((value, i) => (
                                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            {spiersterkte.length > 0 && (
                <>
                    <h2>Spiersterkte</h2>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Spiernaam</th>
                                    <th>Spiermyometrie</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {spiersterkte.map((spier, index) => (
                                    <tr key={index}>
                                        <td>{spier.spiernaam}</td>
                                        <td>{spier.spiermyometrie}</td>
                                        <td>
                                            <button onClick={() => handleDeleteClick(spier.id)} style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '10px 20px',
                                                cursor: 'pointer'
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <button onClick={handleUpdateClick} style={{
                backgroundColor: 'lightblue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 20px',
                cursor: 'pointer',
                margin: '20px 0'
            }}>Update</button>
            {isUpdating && (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    marginBottom: '20px'
                }}>
                    <h2>Update Object</h2>
                    <table border={1}>
                        <tbody>
                            {Object.keys(resultaat).map((key) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={updateData[key as keyof Resultaat] as string || ''}
                                            onChange={(e) => handleInputChange(key as keyof Resultaat, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleSaveClick} style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}>Save</button>
                </div>
            )}
            <div>
                <Link href={`/spiersterkteCreate?id=${OBJ_ID}`}>
                    <button style={{
                        backgroundColor: 'lightblue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer'
                    }}>Voeg Spiersterkte toe</button>
                </Link>
            </div>
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
                    }}>Terug</button>
                </Link>
            </div>
            <br />
        </div>
    );
}
