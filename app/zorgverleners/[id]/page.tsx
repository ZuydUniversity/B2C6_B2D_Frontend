"use client"
import { useState, useEffect, FC } from "react";
import { Zorgverlener } from "@/models/Zorgverlener "; // Zorg ervoor dat het pad naar je model correct is

interface PageProps {
  params: { id: number };
}

const ZorgverlenerPage: FC<PageProps> = ({ params }) => {
  const [zorgverlener, setZorgverlener] = useState<Zorgverlener | null>(null);
  const [error, setError] = useState<string | null>(null); // State voor foutmelding toegevoegd

  useEffect(() => {
    const fetchZorgverlenerData = async () => {
      try {
        const response = await fetch(`/api/zorgverleners/${params.id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch zorgverlener");
        }
        const zorgverlenerData = await response.json();
        setZorgverlener(zorgverlenerData);
      } catch (error) {
        console.error(`Error fetching zorgverlener with id ${params.id}:`, error);
        setError(`Error fetching zorgverlener with id ${params.id}`);
        setZorgverlener(null);
      }
    };

    fetchZorgverlenerData();
  }, [params.id]);

  return (
    <div>
      <p>Hello daar</p>
      {error ? (
        <p>{error}</p>
      ) : zorgverlener ? (
        <div>
          <p>Zorgverlener naam: {zorgverlener.name}</p>
          {/* Toon andere eigenschappen van de zorgverlener */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ZorgverlenerPage;
