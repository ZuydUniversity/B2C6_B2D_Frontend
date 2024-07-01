import { UUID } from "crypto";

export interface Verslag {
    id: number;
    date: string;
    healthcomplaints: string;
    medicalhistory: string;
    diagnose: string;
    zorgverlener_id: number;
    patient_id: number;
}