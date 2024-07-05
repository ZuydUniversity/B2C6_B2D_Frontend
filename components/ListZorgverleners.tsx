import { Zorgverlener } from "@/models/Zorgverlener ";
import styles from "./ListZorgverleners.module.css";
import { deleteZorgverlener, fetchZorgverleners } from "@/serverActions/actions";


export default async function ListZorgverleners() {
  const zorgverleners: Zorgverlener[] = await fetchZorgverleners();
  console.log(zorgverleners)
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
