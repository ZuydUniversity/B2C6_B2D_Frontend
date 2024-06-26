'use client';

import { useEffect, useState } from 'react';
import { Resultaat } from '../../Models/Resultaat';

const ResultPageById = ({ params }: { params: { id: BigInteger } }) => {
  const [item, setData] = useState<Resultaat>();
  const OBJ_ID = params.id;

  useEffect(() => {
    fetch(`http://localhost:8000/resultaten/${OBJ_ID}`)
      .then(response => response.json())
      .then((data: Resultaat) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [OBJ_ID]);

  // wait for fetch to be completed
  if (item === undefined) return <p>Loading...</p>;

  return (
    <div>
      <h1>Object {OBJ_ID}</h1>
      <table border={1}>
        <thead>
          <tr>
            {Object.keys(item).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr key={`${OBJ_ID}`}>
            {Object.values(item).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ResultPageById.displayName = 'ResultPageById';

export default ResultPageById;
