'use client';

import { useEffect, useState } from 'react';
import { Resultaat } from '../../models/Resultaat';

export default function GetResultaatById({ params }: { params: { id: BigInteger } }) {
  const [item, setData] = useState<Resultaat>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState<Partial<Resultaat>>({});
  const OBJ_ID = params["id"]

  useEffect(() => {
    fetch(`http://localhost:8000/resultaten/${OBJ_ID}`)
      .then(response => response.json())
      .then((data: Resultaat) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

    const handleUpdateClick = () => {
        setIsUpdating(true);
        setUpdateData(item || {});
    };

    const handleSaveClick = () => {
        fetch(`http://localhost:8000/resultaten/${OBJ_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then(response => response.json())
            .then((data: Resultaat) => {
                setData(data);
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
    
  // wait for fetch to be completed
  if (item == undefined)
    return <p>loading...</p>;

  return (
        <div>
            <h1>Object {OBJ_ID}</h1>
            <table border={1}>
                <thead>
                    <tr>
                        {Object.keys(item).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr key={`${OBJ_ID}`}>
                        {Object.values(item).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <button onClick={handleUpdateClick}>Update</button>
            {isUpdating && (
                <div>
                    <h2>Update Object</h2>
                    <table border={1}>
                        <tbody>
                            {Object.keys(item).map((key) => (
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
        </div>
    );
}