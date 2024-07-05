"use server";
import { Verslag } from "@/app/Models/Verslag";
import { revalidatePath } from "next/cache";


// Function to create a new Verslag
export const createVerslag = async (verslag: any) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/verslag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verslag),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create verslag: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Created Verslag:', data);
  
      // Revalidate the path to ensure the frontend gets updated data
      revalidatePath('/verslagen');
      return data;
    } catch (error) {
      console.error('Error creating verslag:', error);
      throw error;
    }
  };
  
  // Function to fetch a specific Verslag by ID
  export const getVerslag = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch verslag: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Fetched Verslag:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching verslag with id ${id}:`, error);
      throw error;
    }
  };
  
  // Function to fetch all Verslagen
  export const getAllVerslagen = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/verslag');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch verslagen: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Fetched All Verslagen:', data);
      return data;
    } catch (error) {
      console.error('Error fetching all verslagen:', error);
      throw error;
    }
  };
  
  // Function to update a specific Verslag by ID
  export const updateVerslag = async (id: string, verslag: any) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verslag),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update verslag: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Updated Verslag:', data);
  
      // Revalidate the path to ensure the frontend gets updated data
      revalidatePath(`/verslag/${id}`);
      return data;
    } catch (error) {
      console.error(`Error updating verslag with id ${id}:`, error);
      throw error;
    }
  };
  
  // Function to delete a specific Verslag by ID
  export const deleteVerslag = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/verslag/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete verslag: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Deleted Verslag:', data);
  
      // Revalidate the path to ensure the frontend gets updated data
      revalidatePath('/verslagen');
      return data;
    } catch (error) {
      console.error(`Error deleting verslag with id ${id}:`, error);
      throw error;
    }
  };
  