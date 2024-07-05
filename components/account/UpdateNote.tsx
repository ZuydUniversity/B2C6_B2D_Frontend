"use client";
import styles from "./UpdateNote.module.css";
import { updateNote } from "@/serverActions/accountactions";

export default function UpdateNote() {

  return (
    <form className={styles.updateNote} action={updateNote}>
      <h1>Notitie aanpassen</h1>
      <p>ID:</p>
      <input name="id" type="text" />
      <p>Patient naam:</p>
      <input name="patient" type="text" />
      <p>Notitie:</p>
      <input name="data" type="text" />
      <button type="submit">Update</button>
    </form>
  );
}