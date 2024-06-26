"use client";
import styles from "./UpdateZorgverlenerFrom.module.css";
import { updateZorgverlener } from "@/serverActions/actions";

export default function UpdateZorgverlenerFrom() {

  return (
    <form className={styles.updateZorgverlenerFrom} action={updateZorgverlener}>
      <h1>Zorgverlener updaten</h1>
      <p>id:</p>
      <input name="id" type="text" />
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
      <button type="submit">Update</button>
    </form>
  );
}