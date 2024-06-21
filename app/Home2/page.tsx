import { UUID } from "crypto";
import { Resultaat } from "../Models/Resultaat";
export default function Home2()
{
    return <h1>welkome on home page2</h1>
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

    async function fetchResultaatById(uuid: UUID): Promise<Resultaat | undefined> {
        try {
            const response = await fetch(`http://127.0.0.1:8000/resultaat/${uuid}`, {
                cache: 'no-store'
            });

            if (!response.ok)
                throw new Error('Failed to fetch results');

            const JSON_CONTENT = await response.json();

            return JSON_CONTENT;
        } catch (error) {
            console.error('Error fetching results:', error);
            return;
        }
    }
}
  
