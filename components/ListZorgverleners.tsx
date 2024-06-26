import { Zorgverlener } from "@/models/Zorgverlener ";
import styles from "./ListZorgverleners.module.css";
import { deleteZorgverlener } from "@/serverActions/actions";

async function fetchZorgverleners(): Promise<Zorgverlener[]> {
  try {
    const response = await fetch("http://127.0.0.1:8000/zorgverleners", {
      cache: "no-store", // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
    });
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverleners");
    }
    const zorgverleners = await response.json();
    return zorgverleners;
  } catch (error) {
    console.error("Error fetching zorgverleners:", error);
    return [];
  }
}

export default async function ListZorgverleners() {
  const zorgverleners: Zorgverlener[] = await fetchZorgverleners();

  return (
    <div className={styles.list}>
      <h1>Zorgverleners</h1>
      <ul>
        {Array.isArray(zorgverleners) && zorgverleners.length > 0 ? (
          zorgverleners.map((zorgverlener) => (
            <form key={zorgverlener.id} action={deleteZorgverlener}>
              <li key={zorgverlener.id}>
                <input type="hidden" name="id" value={zorgverlener.id} />
                <strong>Id:</strong> {zorgverlener.id}
                <br />
                <strong>Naam:</strong> {zorgverlener.name}{" "}{zorgverlener.lastName} 
                <br />
                <strong>Email:</strong> {zorgverlener.email}
                <br />
                <button type="submit">Delete</button>
              </li>
            </form>
          ))
        ) : (
          <li>Geen zorgverleners gevonden</li>
        )}
      </ul>
    </div>
  );
}
