"use client";

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
        <div>
            <h1>Data Table</h1>
            <table border={1}>
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.entries(item).map(([key, value], i) => (
                                <td key={i}>
                                    <a href={`/Resultaten/${item['id']}`}>
                                        {renderCellValue(value)}
                                    </a>
                                </td>
                            ))}
                            <td>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}