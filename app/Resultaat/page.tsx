"use client";
import { useState } from "react";

import { UUID } from "crypto";
import { Resultaat } from "../Models/Resultaat";
import '../globals.css';


const DeleteResultaat = () => {
    const [resultaatId, setResultaatId] = useState<number | null>(null);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const deleteResultaat = async (id: number): Promise<boolean> => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/resultaat/${id}`, {
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
    };

    const handleDelete = async () => {
        if (resultaatId === null || isNaN(resultaatId) || resultaatId <= 0) {
            setResponseMessage('Please enter a valid Resultaat ID.');
            return;
        }

        const success = await deleteResultaat(resultaatId);
        if (success) {
            setResponseMessage(`Resultaat with ID ${resultaatId} has been successfully deleted.`);
        } else {
            setResponseMessage(`Failed to delete Resultaat with ID ${resultaatId}.`);
        }
    };

    return (
        <div className="container">
            <h1>Delete Resultaat</h1>
            <input
                type="number"
                value={resultaatId !== null ? resultaatId : ''}
                onChange={(e) => setResultaatId(parseInt(e.target.value))}
                placeholder="Enter Resultaat ID"
            />
            <button onClick={handleDelete}>Delete Resultaat</button>
            <p>{responseMessage}</p>
        </div>
    );
};

export default DeleteResultaat;
