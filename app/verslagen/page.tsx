import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Verslag {
    id: number;
    date: string;
    healthcomplaints: string;
    medicalhistory: string;
    diagnose: string;
    zorgverlener_id: number;
    patient_id: number;
}

const VerslagenPage = async() => {
    try {
        const res = await fetch('http://127.0.0.1:8000/verslag', {
            cache: "no-store"
        });

        if (!res.ok) {
            console.error("Failed to fetch verslagen:", res.statusText);
            return <div>Error fetching verslagen: {res.statusText}</div>;
        }

        
        

        const verslag: Verslag[] = await res.json();
        return (
            <div>
                <div>
                    <h1>Verslagen</h1>
                    <ul style={{backgroundColor:'paleturquoise'}}>
                        {verslag.map(verslag => (
                            <li key={verslag.id}>
                                {verslag.date}, {verslag.healthcomplaints}, {verslag.medicalhistory}, {verslag.diagnose}
                                <button style={{color: 'grey'}}>&nbsp; &nbsp; aanpassen</button>
                                <Link href='../verslagen/deleteverslag'>
                                <button style={{color: 'red'}}>&nbsp; verwijderen</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <br />
                    <Link href='../verslagen/createverslag'>
                        <button style={{backgroundColor: 'lightgreen'}}>Maak een nieuw verslag</button>
                    </Link>
                </div>
            </div>
        );
    } 
    catch (error) {
        console.error("An error occurred while fetching verslagen:", error);
        // return <div>Error fetching verslagen: {error.message}</div>;
    }
}

export default VerslagenPage;
