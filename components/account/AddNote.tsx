"use client";
import styles from "./AddNote.module.css";
import { createNote } from "@/serverActions/accountactions";

export default function AddNote() {

  return (
    <form className={styles.createNote} action={createNote}>
      <h1>Notitie Toevoegen</h1>
      <p>Patient naam:</p>
      <input name="patient" type="text" />
      <p>Notitie:</p>
      <input name="data" type="text" />
      <button type="submit">Toevoegen</button>
    </form>
  );
}
