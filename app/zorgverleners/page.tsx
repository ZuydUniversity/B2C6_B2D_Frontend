import { Zorgverlener } from "@/models/Zorgverlener ";
import styles from "./page.module.css";
import AddZorgverlenerFrom from "@/components/AddZorgverlenerFrom";
import ListZorgverleners from "@/components/ListZorgverleners";
import UpdateZorgverlenerFrom from "@/components/UpdateZorgverlenerFrom";

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

const ZorgverlenersPage = async () => {
  const zorgverleners: Zorgverlener[] = await fetchZorgverleners();

  return (
    
      <div className={styles.crudView}>
        <ListZorgverleners/>
        <AddZorgverlenerFrom />
        <UpdateZorgverlenerFrom/>
      </div>
  );
};

export default ZorgverlenersPage;
