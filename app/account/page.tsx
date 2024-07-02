import { Note } from "@/models/Note";
import styles from "./page.module.css";

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

const NotesPage = async () => {
    const notes: Note[] = await fetchNotes();

    return (
        <div>
            <div className="container">
                <div className="header">
                    <div className="logo">
                        <img className={styles.logo} src="/Logo_JDB_2.png" alt="Logo" />
                    </div>
                    <div className="title">
                        <strong>Hallo, Mr. Goedelen</strong>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-1 text-center bg-opacity-75">
                <img className={styles.logo} src="/icon_zorgverlener.png" height="100" width="100" alt="Logo" />
                <h2 className="font-semibold mb-4 text-gray-600">tel: +3149731949</h2>
                <h2 className="font-semibold mb-4 text-gray-600">mail: fysiobijgoedelen@gmail.com</h2>
                <h2 className="font-semibold mb-4 text-gray-600">specialisatie: Munuele Therapie - Fysio</h2>
            </div>
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 text-center bg-opacity-75">
                <strong className="font-semibold mb-4 text-gray-600">Kies een notitie</strong>
                <h1 className="font-semibold mb-4 text-gray-600">Toevoegen</h1>
                <ul>
                    {Array.isArray(notes) && notes.length > 0 ? (
                        notes.map((note) => (
                            <li key={note.id}>
                                {note.date} {note.patient}
                                <br />
                            </li>
                        ))
                    ) : (
                        <li>Geen notities gevonden</li>
                    )}
                </ul>
            </div>
            
            
        </div>
    );
};

export default NotesPage;
