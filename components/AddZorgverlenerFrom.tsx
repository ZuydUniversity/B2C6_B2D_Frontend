"use client";
import styles from "./AddZorgverlenerFrom.module.css";
import { createZorgverlener } from "@/serverActions/actions";

export default function AddZorgverlenerFrom() {

  return (
    <form className={styles.createZorgverlenerFrom} action={createZorgverlener}>
      <h1>Zorgverlener aanmaken</h1>
      <p>name:</p>
      <input name="name" type="text" />
      <p>lastName:</p>
      <input name="lastName" type="text" />
      <p>email:</p>
      <input name="email" type="text" />
      <p>phoneNumber:</p>
      <input name="phoneNumber" type="text" />
      <p>password:</p>
      <input name="password" type="text" />
      <p>profession:</p>
      <input name="profession" type="text" />
      <p>is Active:</p> 
      <input name="isActive" type="checkbox" />
      <button type="submit">Toevoegen</button>
    </form>
  );
}
