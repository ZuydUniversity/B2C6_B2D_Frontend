import { useState } from 'react';
import { updatePatient } from '../serverActions/PatientAction';
import styles from '@/components/AddPatientForm.module.css';


const AddPatientForm = () => {
  const initialFormData = new FormData();

  const handleSubmit = async (formData: FormData) => {
    console.log(formData)
    try {
      await updatePatient(formData);
      alert('Patiënt Aangepast!');
    } catch (error) {
      console.error('Fout bij het aanpassen van patiënt:', error);
      alert('Er is een fout opgetreden bij het aanpassen van de patiënt.');
    }
  };

  return (
    <form action={handleSubmit}>
      <input type="number" name="id"  placeholder="Id" required />
      <input type="text" name="name"  placeholder="Naam" required />
      <input type="text" name="surname"  placeholder="Achternaam" required />
      <input type="number" name="age"  placeholder="Leeftijd" required />
      <input type="text" name="gender"  placeholder="Geslacht" required />
      <input type="text" name="address"  placeholder="Adres" required />
      <input type="text" name="city"  placeholder="Stad" required />
      <input type="email" name="email"  placeholder="E-mail" required />
      <input type="text" name="diagnosis"  placeholder="Diagnose" required />
      <input type="text" name="medication"  placeholder="Medicatie" required />
      <input type="number" name="phonenumber"  placeholder="Telefoonnummer" required />
      <button type="submit"><h2 className={styles.buttonPatient}>Aanpassen</h2></button>

    </form>
  );
};
export default AddPatientForm;