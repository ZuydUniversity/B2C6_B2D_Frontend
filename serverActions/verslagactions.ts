export const createVerslag = async (verslag: any) => {
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
};

export const getVerslag = async (id: string) => {
    const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch verslag');
    }
    return response.json();
};

export const getAllVerslagen = async () => {
    const response = await fetch('http://127.0.0.1:8000/verslag');
    if (!response.ok) {
        throw new Error('Failed to fetch verslagen');
    }
    return response.json();
};

export const updateVerslag = async (id: string, verslag: any) => {
    const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(verslag),
    });

    if (!response.ok) {
        throw new Error('Failed to update verslag');
    }

    return response.json();
};

export const deleteVerslag = async (id: string) => {
    const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete verslag');
    }

    return response.json();
};