import { Resultaat } from "./Models/Resultaat";

async function fetchResultaten(): Promise<Resultaat[]> {
    try {
        const response = await fetch('http://127.0.0.1:8000/Resultaten', { //check if link is right
            cache: 'no-store' // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
        });
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        const resultaten = await response.json();
        return resultaten;
    } catch (error) {
        console.error('Error fetching results:', error);
        return [];
    }
}