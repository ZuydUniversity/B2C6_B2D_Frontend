
export const createVerslag = async (verslag: any) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/verslag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(verslag),
        });

        if (!response.ok) {
            throw new Error('Failed to create verslag');
        }

        return response.json();
    } catch (error) {
        console.error('Error creating verslag:', error);
        throw error; // Rethrow de fout om deze door te geven aan de caller
    }
};

export const getVerslag = async (id: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch verslag');
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching verslag with id ${id}:`, error);
        throw error; // Rethrow de fout om deze door te geven aan de caller
    }
};

export const getAllVerslagen = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/verslag');

        if (!response.ok) {
            throw new Error('Failed to fetch verslagen');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching verslagen:', error);
        throw error; // Rethrow de fout om deze door te geven aan de caller
    }
};

export const deleteVerslag = async (id: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete verslag');
        }

        return response.json();
    } catch (error) {
        console.error(`Error deleting verslag with id ${id}:`, error);
        throw error; // Rethrow de fout om deze door te geven aan de caller
    }
};


