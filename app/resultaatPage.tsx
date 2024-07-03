import { Resultaat } from "./models/Resultaat";

async function updateResultaat(resultaat: Resultaat): Promise<Resultaat | null> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/Resultaten/${resultaat.id}`, { // Adjust the endpoint as necessary
            method: 'PUT', // Use PUT method for updating
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is set to JSON
            },
            body: JSON.stringify(resultaat), // Send the updated result as JSON
        });
        if (!response.ok) {
            throw new Error('Failed to update result');
        }
        const updatedResultaat = await response.json();
        return updatedResultaat;
    } catch (error) {
        console.error('Error updating result:', error);
        return null;
    }
}