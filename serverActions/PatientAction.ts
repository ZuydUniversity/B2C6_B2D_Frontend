'use server'
import { Patient } from "@/models/Patient";
import { revalidatePath } from "next/cache";

export async function createPatient(formData: FormData) {
    const patient: Patient = {
      id: 0,
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      age: Number(formData.get('age')), 
      gender: formData.get('gender') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      email: formData.get('email') as string,
      diagnosis: formData.get('diagnosis') as string,
      medication: formData.get('medication') as string,
      phonenumber: Number(formData.get('phonenumber')) 
    };
  console.log(patient)
    try {
      const resp = await fetch('http://127.0.0.1:8000/patients', {
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(patient)
      });
  
      if (!resp.ok) {
        throw new Error('Failed to create patient');
      }
      revalidatePath("/patients");
      const data = await resp.json();
      console.log(data);
      return { patient: data, error: null };
    } catch (error) {
      console.error('Error creating patient:', error);
      return { patient: null, error: "create errorfoutje" };
    }


  //   console.log(patient); 

  // const resp = await fetch('http://127.0.0.1:8000/patients',{
  //   cache: "no-store",
  //   headers: {
  //     'Content-Type':'application/json',
  //     'accept': 'application/json'
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(patient)
  // })

  // const data = await resp.json()
  // console.log(data)
}

export async function deletePatient(formData: FormData) {
  const id = formData.get('id');

  if (!id) {
    console.error('ID is required to delete a patient');
    return { patient: null, error: 'ID is required to delete a patient' };
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete patient');
    }

    const patientData = await response.json();
    console.log(patientData);
    return { patient: patientData, error: null };
  } catch (error) {
    console.error(`Error deleting patient with id ${id}:`, error);
    return { patient: null, error: 'delete errorfoutje' };
  }

  // try {   
  //   const response = await fetch(`http://127.0.0.1:8000/patients/${formData.get("id")}`, {
  //     cache: "no-store",
  //     headers: {
  //       'Content-Type':'application/json',
  //       'accept': 'application/json'
  //     },
  //     method: 'DELETE'
  //   });
  //   if (!response.ok) {
  //     throw new Error("Could not fetch patient!");
  //   }
  //   const patientData = await response.json();
  //   console.log(patientData)
  //   return { patient: patientData, error: null };
  // } catch (error) {
  //   console.error(`Error fetching patient with id ${0}:`, error);
  //   return { patient: null, error: `Error fetching patient with id ${0}` };
  // }
}


export async function updatePatient(formData: FormData) {
  const id = formData.get('id');

  if (!id) {
    console.error('ID is required to update a patient');
    return { patient: null, error: 'ID is required to update a patient' };
  }

  const patient: Patient = {
    id: parseInt(id as string, 10),
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
    age: parseInt(formData.get('age') as string, 10),
    gender: formData.get('gender') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    email: formData.get('email') as string,
    diagnosis: formData.get('diagnosis') as string,
    medication: formData.get('medication') as string,
    phonenumber: parseInt(formData.get('phonenumber') as string, 10)
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/patients/${id}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(patient)
    });

    if (!response.ok) {
      throw new Error('Failed to update patient');
    }
    const patientData = await response.json();
    console.log(patientData);
    return { patient: patientData, error: null };
  } catch (error) {
    console.error(`Error updating patient with id ${id}:`, error);
    return { patient: null, error: 'update errorfoutje' };
  }

  // try {

  //   const patient: Patient= {
  //       id: 0,
  //       name: formData.get('name') as string,
  //       surname: formData.get('surname') as string,
  //       age: Number(formData.get('age')), 
  //       gender: formData.get('gender') as string,
  //       address: formData.get('address') as string,
  //       city: formData.get('city') as string,
  //       email: formData.get('email') as string,
  //       diagnosis: formData.get('diagnosis') as string,
  //       medication: formData.get('medication') as string,
  //       phonenumber: Number(formData.get('phonenumber')) 
  //   }

  //   const response = await fetch(`http://127.0.0.1:8000/patients/${formData.get("id")}`, {
  //     cache: "no-store",
  //     headers: {
  //       'Content-Type':'application/json',
  //       'accept': 'application/json'
  //     },
  //     method: 'PUT',
  //     body: JSON.stringify(patient)

  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch patient");
  //   }
  //   const patientData = await response.json();
  //   console.log(patientData)
  //   return { patient: patientData, error: null };
  // } catch (error) {
  //   console.error(`Error fetching patient with id ${0}:`, error);
  //   return { patient: null, error: `Error fetching patient with id ${0}` };
  // }
}