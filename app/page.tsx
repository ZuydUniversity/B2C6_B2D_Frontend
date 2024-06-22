// app/page.tsx
import { Zorgverlener } from "../models/Zorgverlener "; // Zorg ervoor dat je pad correct is

async function fetchZorgverleners(): Promise<Zorgverlener[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/zorgverleners', {
      cache: 'no-store' // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
    });
    if (!response.ok) {
      throw new Error('Failed to fetch zorgverleners');
    }
    const zorgverleners = await response.json();
    return zorgverleners;
  } catch (error) {
    console.error('Error fetching zorgverleners:', error);
    return [];
  }
}

const Home = async () => {
  const zorgverleners: Zorgverlener[] = await fetchZorgverleners();

  return (
    <div>
      <h1>Zorgverleners</h1>
      <ul>
        {Array.isArray(zorgverleners) && zorgverleners.length > 0 ? (
          zorgverleners.map((zorgverlener) => (
            <li key={zorgverlener.id}>
              <strong>Naam:</strong> {zorgverlener.name} {zorgverlener.achternaam}<br />
              <strong>Email:</strong> {zorgverlener.email}<br />
            </li>
          ))
        ) : (
          <li>Geen zorgverleners gevonden</li>
        )}
      </ul>
    </div>
  );
};

export default Home;

