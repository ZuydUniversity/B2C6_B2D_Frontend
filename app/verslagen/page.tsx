
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
interface Verslag {
    id: number;
    date: string;
    healthcomplaints: string;
    medicalhistory: string;
    diagnose: string;

}

const VerslagenPage = async() => {
  const res = await fetch('http://127.0.0.1:8000/verslag')
  const verslag: Verslag[] = await res.json();
  return (
    <div>
        <div>
            <h1>Verslagen</h1>
            <ul style={{backgroundColor:'paleturquoise'}}>
                {verslag.map(verslag => <li key={verslag.id}>{verslag.date}, {verslag.healthcomplaints}, {verslag.medicalhistory}, {verslag.diagnose} <button style={{color: 'grey'}}>&nbsp; &nbsp; aanpassen</button> <button style={{color: 'red'}}> &nbsp; verwijderen</button></li>)}
            </ul>
        </div>
        <div>
            <br></br>
            <Link href='../verslagen/createverslag'><button style={{backgroundColor: 'lightgreen'}} >Maak een nieuw verslag </button></Link>
            
        </div>
    </div>
    
  )
}

export default VerslagenPage
