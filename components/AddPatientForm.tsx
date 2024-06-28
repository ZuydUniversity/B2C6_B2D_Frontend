// import { useState } from 'react';
// import { createPatient } from '../serverActions/PatientAction';

// const AddPatientForm = () => {
//   const initialFormData = {
//     name: '',
//     surname: '',
//     age: '',
//     gender: '',
//     address: '',
//     city: '',
//     email: '',
//     diagnosis: '',
//     medication: '',
//     phonenumber: ''
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
    
//     try {
//       await createPatient(formData);
//       setFormData(initialFormData); // Reset het formulier
//       alert('Patiënt toegevoegd!');
//     } catch (error) {
//       console.error('Fout bij het toevoegen van patiënt:', error);
//       alert('Er is een fout opgetreden bij het toevoegen van de patiënt.');
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name" value={formData.name}  placeholder="Naam" required />
//       <input type="text" name="surname" value={formData.surname}  placeholder="Achternaam" required />
//       <input type="number" name="age" value={formData.age}  placeholder="Leeftijd" required />
//       <input type="text" name="gender" value={formData.gender}  placeholder="Geslacht" required />
//       <input type="text" name="address" value={formData.address}  placeholder="Adres" required />
//       <input type="text" name="city" value={formData.city}  placeholder="Stad" required />
//       <input type="email" name="email" value={formData.email}  placeholder="E-mail" required />
//       <input type="text" name="diagnosis" value={formData.diagnosis}  placeholder="Diagnose" required />
//       <input type="text" name="medication" value={formData.medication}  placeholder="Medicatie" required />
//       <input type="number" name="phonenumber" value={formData.phonenumber}  placeholder="Telefoonnummer" required />
//       <button type="submit">Patiënt Toevoegen</button>
//     </form>
//   );
// };

// export default AddPatientForm;


// import { useState } from 'react';
// import { createPatient } from '../serverActions/PatientAction';

// const AddPatientForm = () => {
//   const initialFormData = new FormData(); // Nieuwe FormData voor het formulier

//   const [formData, setFormData] = useState(initialFormData);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       await createPatient(formData);
//       setFormData(new FormData()); // Reset het formulier
//       alert('Patiënt toegevoegd!');
//     } catch (error) {
//       console.error('Fout bij het toevoegen van patiënt:', error);
//       alert('Er is een fout opgetreden bij het toevoegen van de patiënt.');
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     formData.set(name, value); // Update het FormData-object
//     setFormData(new FormData(formData)); // Zet het bijgewerkte FormData terug
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="name"  placeholder="Naam" required />
//       <input type="text" name="surname"  placeholder="Achternaam" required />
//       <input type="number" name="age"  placeholder="Leeftijd" required />
//       <input type="text" name="gender"  placeholder="Geslacht" required />
//       <input type="text" name="address"  placeholder="Adres" required />
//       <input type="text" name="city"  placeholder="Stad" required />
//       <input type="email" name="email"  placeholder="E-mail" required />
//       <input type="text" name="diagnosis"  placeholder="Diagnose" required />
//       <input type="text" name="medication"  placeholder="Medicatie" required />
//       <input type="number" name="phonenumber"  placeholder="Telefoonnummer" required />
//       <button type="submit">Patiënt Toevoegen</button>
//     </form>
//   );
// };

// export default AddPatientForm;
'use client'
import { useState } from 'react';
import { createPatient } from '../serverActions/PatientAction';

const AddPatientForm = () => {
  const initialFormData = new FormData(); // Initialisatie van FormData

  // const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData)

    try {
      await createPatient(formData);
      // setFormData(new FormData()); // Reset het formulier
      alert('Patiënt toegevoegd!');
    } catch (error) {
      console.error('Fout bij het toevoegen van patiënt:', error);
      alert('Er is een fout opgetreden bij het toevoegen van de patiënt.');
    }
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   formData.set(name, value); // Gebruik FormData.set om waarden in te stellen
  //   setFormData(new FormData(formData)); // Werk state bij met nieuwe FormData
  // };

  return (
    <form action={handleSubmit}>
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
      <button type="submit">Patiënt Toevoegen</button>
    </form>
  );
};

export default AddPatientForm;

