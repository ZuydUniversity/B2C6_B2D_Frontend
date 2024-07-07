import { Note } from "@/models/Note";
import styles from "./page.module.css";
import Link from "next/link";
import AddNote from "@/components/account/AddNote";
import UpdateNote from "@/components/account/UpdateNote";
import DeleteNote from "@/components/account/DeleteNote";
import SearchButton from "@/components/account/SearchButton";

async function fetchNotes(): Promise<Note[]> {
    try {

        const queryParams = new URLSearchParams(window.location.search);
        const noteId = queryParams.get('id');
        const name = queryParams.get('name');

        const url = `http://127.0.0.1:8000/notes`;
        if (noteId) {
            const url = `http://127.0.0.1:8000/notes?id=${noteId}`;
        }
        if (name) {
            const url = `http://127.0.0.1:8000/notes?name=${name}`;
        }
        
        const response = await fetch(url, {
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
                        <Link className={styles.loginButton} href={'/dashboard'}>
                            <button><img className={styles.logo} src="/Logo_JDB_2.png" alt="Logo" /></button>
                        </Link>
                        
                    </div>
                    <div className="title">
                        <strong>Hallo, Mr. Goedelen</strong>
                    </div>
                </div>
            </div>

            <div className={styles.crudView}>
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-1 text-center bg-opacity-75">
                    <img className={styles.logo} src="/icon_zorgverlener.png" height="100" width="100" alt="Logo" />
                    <h2 className="font-semibold mb-4 text-gray-600">tel: +3149731949</h2>
                    <h2 className="font-semibold mb-4 text-gray-600">mail: fysiobijgoedelen@gmail.com</h2>
                    <h2 className="font-semibold mb-4 text-gray-600">specialisatie: Munuele Therapie - Fysio</h2>
                </div>
                <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 text-center bg-opacity-75">
                    <strong className="font-semibold mb-4 text-gray-600">Kies een notitie</strong>
                    <SearchButton />
                    <ul>
                        {Array.isArray(notes) && notes.length > 0 ? (
                            notes.map((note) => (
                                <li key={note.id}>
                                    <p>(ID: {note.id}) </p>{note.date} {note.patient}
                                    <br />
                                    {note.data}
                                    <br />
                                </li>
                            ))
                        ) : (
                            <li>Geen notities gevonden</li>
                        )}
                    </ul>
                </div>
                <AddNote />
                <UpdateNote />
                <DeleteNote />
            </div>
            
        </div>
    );
};

export default NotesPage;
