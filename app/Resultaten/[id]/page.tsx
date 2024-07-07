'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Resultaat } from '../../models/Resultaat';
import { Spiersterkte } from '../../models/Spiersterkte';

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
        <div>
            <h1>Object {OBJ_ID}</h1>
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
            {spiersterkte.length > 0 && (
                <>
                    <h2>Spiersterkte</h2>
                    <table border={1}>
                        <thead>
                            <tr>
                                {Object.keys(spiersterkte[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {spiersterkte.map((spier, index) => (
                                <tr key={index}>
                                    {Object.values(spier).map((value, i) => (
                                        <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                                    ))}
                                    <td>
                                        <button onClick={() => handleDeleteClick(spier.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <button onClick={handleUpdateClick}>Update</button>
            {isUpdating && (
                <div>
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
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            )}
            <div>
                <Link href={`/spiersterkteCreate?id=${OBJ_ID}`}>
                    <button>Voeg Spiersterkte toe</button>
                </Link>
            </div>
        </div>
    );
}
