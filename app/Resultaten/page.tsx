"use client";

import { useEffect, useState } from 'react';
import { Resultaat } from '../models/Resultaat';

export default function GetResultaten() {
  const [data, setData] = useState<Resultaat[]>([]);

  useEffect(() => {
    // Replace with your API endpoint
    fetch('http://localhost:8000/resultaten')
      .then(response => response.json())
      .then((data: Resultaat[]) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Data Table</h1>
      <table border={1}>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                    <td key={i}><a href={`http://localhost:3000/Resultaten/${item['id']}`}>{value}</a></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}