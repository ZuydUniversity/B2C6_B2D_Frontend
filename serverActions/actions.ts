'use server'
import { Zorgverlener } from "@/models/Zorgverlener ";
 
export async function createZorgverlener(formData: FormData) {
  const zorgverlener: Zorgverlener= {
    id: 0,
    name: formData.get('name') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    password: formData.get('password') as string,
    profession: formData.get('profession') as string
  }

  console.log(zorgverlener)

  const resp = await fetch('http://127.0.0.1:8000/zorgverleners',{
    cache: "no-store",
    headers: {
      'Content-Type':'application/json',
      'accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(zorgverlener)
  })

  
  
  const data = await resp.json()
  console.log(data)
}

export async function deleteZorgverlener(formData: FormData) {
  try {
    
    const response = await fetch(`http://127.0.0.1:8000/zorgverleners/${formData.get("id")}`, {
      cache: "no-store",
      headers: {
        'Content-Type':'application/json',
        'accept': 'application/json'
      },
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverlener");
    }
    const zorgverlenerData = await response.json();
    console.log(zorgverlenerData)
    return { zorgverlener: zorgverlenerData, error: null };
  } catch (error) {
    console.error(`Error fetching zorgverlener with id ${0}:`, error);
    return { zorgverlener: null, error: `Error fetching zorgverlener with id ${0}` };
  }
}

export async function updateZorgverlener(formData: FormData) {
  try {

    const zorgverlener: Zorgverlener= {
      id: 0,
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      password: formData.get('password') as string,
      profession: formData.get('profession') as string
    }

    const response = await fetch(`http://127.0.0.1:8000/zorgverleners/${formData.get("id")}`, {
      cache: "no-store",
      headers: {
        'Content-Type':'application/json',
        'accept': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(zorgverlener)

    });
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverlener");
    }
    const zorgverlenerData = await response.json();
    console.log(zorgverlenerData)
    return { zorgverlener: zorgverlenerData, error: null };
  } catch (error) {
    console.error(`Error fetching zorgverlener with id ${0}:`, error);
    return { zorgverlener: null, error: `Error fetching zorgverlener with id ${0}` };
  }
}