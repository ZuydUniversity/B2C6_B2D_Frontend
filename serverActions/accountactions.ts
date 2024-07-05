"use server";
import { Note } from "@/models/Note";
import { revalidatePath } from "next/cache";


async function fetchNotes(): Promise<Note[]> {
    try {
        const response = await fetch("http://127.0.0.1:8000/notes", {
            cache: "no-store", // Zorg ervoor dat fetch altijd de nieuwste data ophaalt
        });
        if (!response.ok) {
            throw new Error("Failed to fetch patients");
        }
        const notes = await response.json();
        return notes;
    } catch (error) {
        console.error("Error fetching patients:", error);
        return [];
    }
}

export async function createNote(formData: FormData) {
    try {

        const dateObj = new Date();
        const day = dateObj.getDay
        const datestring = dateObj.toISOString().split('T')[0];

    const note: Note = {
      id: 0,
      patient: formData.get("patient") as string,
      data: formData.get("data") as string,
      date: day.toString() + " " + datestring
    };

    console.log(note);

    const response = await fetch("http://127.0.0.1:8000/notes", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to create new note");
    }
    revalidatePath("/account");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating note:", error);
    return [];
  }
}
export async function deleteNote(formData: FormData) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/notes/${formData.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }
    const fetchedNoteData = await response.json();
      console.log(fetchedNoteData);
    revalidatePath("/account");
      return { note: fetchedNoteData, error: null };
  } catch (error) {
    console.error(`Error fetching note with id ${0}:`, error);
    return {
      note: null,
      error: `Error fetching note with id ${0}`,
    };
  }
}

export async function updateNote(formData: FormData) {
    try {

        const dateObj = new Date();
        const day = dateObj.getDay
        const datestring = dateObj.toISOString().split('T')[0];
        var idstring = formData.get("id") as string
        var idnum: number = +idstring

      const note: Note = {
      id: idnum,
      patient: formData.get("patient") as string,
      date: day.toString() + " " + datestring,
      data: formData.get("data") as string,
    };

    const response = await fetch(
      `http://127.0.0.1:8000/notes/${formData.get("id")}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        method: "PUT",
        body: JSON.stringify(note),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch note");
    }
    const fetchedNoteData = await response.json();
        console.log(fetchedNoteData);
    revalidatePath("/account");
        return { note: fetchedNoteData, error: null };
  } catch (error) {
    console.error(`Error fetching note with id ${0}:`, error);
    return {
      note: null,
      error: `Error fetching note with id ${0}`,
    };
  }
}

export async function getSearch(formData: FormData) {
    try {
        var search = formData.get("search") as string;
        return search
    } catch (error) {
        console.error("Error getting search:", error);
        return [];
    }
}