import { Resultaat } from "./Models/Resultaat";

async function deleteResultaat(resultaatId: number): Promise<boolean> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/resultaat/${resultaatId}`,
            { 
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete result');
        }
        return true;
    } catch (error) {
        console.error('Error deleting result:', error);
        return false;
    }
}