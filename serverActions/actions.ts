"use server";
import { Zorgverlener } from "@/models/Zorgverlener ";
import { revalidatePath } from "next/cache";

export async function createZorgverlener(formData: FormData) {
  try {
    const zorgverlener: Zorgverlener = {
      id: 0,
      name: formData.get("name") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      password: formData.get("password") as string,
      profession: formData.get("profession") as string,
      isActive: formData.get("isActive")?.valueOf() == 'on' ? true : false
    };

    console.log(zorgverlener);

    const response = await fetch("http://127.0.0.1:8000/zorgverleners", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(zorgverlener),
    });

    if (!response.ok) {
      throw new Error("Failed to create zorgverleners");
    }
    // revalidatePath("/zorgverleners");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating zorgverleners:", error);
    return [];
  }
}

export async function fetchZorgverleners(): Promise<Zorgverlener[]> {
  console.log("Fetching...")
  try {
    const response = await fetch("http://127.0.0.1:8000/zorgverleners", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverleners");
    }
    const zorgverleners = await response.json();
    console.log(zorgverleners)
    //revalidatePath("/zorgverleners");
    return zorgverleners;
  } catch (error) {
    console.error("Error fetching zorgverleners:", error);
    return [];
  }
}

export async function deleteZorgverlener(formData: FormData) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/zorgverleners/${formData.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverlener");
    }
    const zorgverlenerData = await response.json();
    console.log(zorgverlenerData);
    // revalidatePath("/zorgverleners");
    return { zorgverlener: zorgverlenerData, error: null };
  } catch (error) {
    console.error(`Error fetching zorgverlener with id ${0}:`, error);
    return {
      zorgverlener: null,
      error: `Error fetching zorgverlener with id ${0}`,
    };
  }
}

export async function updateZorgverlener(formData: FormData) {
  try {
    const zorgverlener: Zorgverlener = {
      id: 0,
      name: formData.get("name") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      password: formData.get("password") as string,
      profession: formData.get("profession") as string,
      isActive: formData.get("isActive")?.valueOf() == 'on' ? true : false,
    };

    const response = await fetch(
      `http://127.0.0.1:8000/zorgverleners/${formData.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(zorgverlener),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch zorgverlener");
    }
    const zorgverlenerData = await response.json();
    console.log(zorgverlenerData);
    // revalidatePath("/zorgverleners");
    return { zorgverlener: zorgverlenerData, error: null };
  } catch (error) {
    console.error(`Error fetching zorgverlener with id ${0}:`, error);
    return {
      zorgverlener: null,
      error: `Error fetching zorgverlener with id ${0}`,
    };
  }
}
