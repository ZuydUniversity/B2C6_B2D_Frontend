"use client";
import { useState, useEffect } from 'react';
import { Zorgverlener } from './models/Zorgverlener ';

const ZorgverlenersPage = () => {
  const [zorgverleners, setZorgverleners] = useState<Zorgverlener[]>([]);

  useEffect(() => {
    const fetchZorgverleners = async () => {
      try {
        const response = await fetch('http://52.166.135.125:8000/zorgverleners');
        if (!response.ok) {
          throw new Error('Failed to fetch zorgverleners');
        }
        const data = await response.json();
        setZorgverleners(data);
      } catch (error) {
        console.error('Error fetching zorgverleners:', error);
      }
    };

    fetchZorgverleners();
  }, []);

  return (
    <div>
      <h1>Zorgverleners</h1>
      <ul>
        {Array.isArray(zorgverleners) && zorgverleners.length > 0 ? (
          zorgverleners.map((zorgverlener) => (
            <li key={zorgverlener.id}>
              <strong>Naam:</strong> {zorgverlener.naam} {zorgverlener.achternaam}<br />
              <strong>Email:</strong> {zorgverlener.email}<br />
              {/* Als je de wachtwoorden van de zorgverleners niet wilt weergeven, kun je dit weghalen */}
            </li>
          ))
        ) : (
          <li>Geen zorgverleners gevonden</li>
        )}
      </ul>
    </div>
  );
};

export default ZorgverlenersPage;
