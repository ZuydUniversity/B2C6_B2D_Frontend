import { UUID } from "crypto";
import { Resultaat } from "./Models/Resultaat";

async function fetchResultaten(): Promise<Resultaat[]> {
    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/Resultaten`, { //check if link is right
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

async function fetchResultaatById(uuid: UUID): Promise<Resultaat|undefined> {
    try {
        const response = await fetch(`${process.env.BACKEND_BASE_URL}/resultaat/${uuid}`, {
            cache: 'no-store'
        });

        if (!response.ok)
            throw new Error('Failed to fetch results');  // jmp to catcher

        const JSON_CONTENT = await response.json();

        return JSON_CONTENT;
    } catch (error) {
        console.error('Error fetching results:', error);
        return;
    }
}