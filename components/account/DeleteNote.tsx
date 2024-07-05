"use client";
import styles from "./DeleteNote.module.css";
import { deleteNote } from "@/serverActions/accountactions";

export default function DeleteNote() {

  return (
    <form className={styles.deleteNote} action={deleteNote}>
      <h1>Notitie verwijderen</h1>
      <p>ID:</p>
      <input name="id" type="text" />
      <button type="submit">Verwijderen</button>
    </form>
  );
}