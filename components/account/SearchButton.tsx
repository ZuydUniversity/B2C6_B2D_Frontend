import Link from "next/link";
import styles from "./SearchButton.module.css";
import { getSearch } from "@/serverActions/accountactions";
interface Props {
    url: string;
    buttonText: string;
}

const SearchButton = async (props: Props) => {
    return (
        <form className={styles.createNote} action={getSearch}>
      <h1>Notitie Toevoegen</h1>
      <p>Patient naam:</p>
      <input name="patient" type="text" />
      <p>Notitie:</p>
      <input name="data" type="text" />
      <button type="submit">
        <Link href={props.url}>
            <div className={styles.butt}>
                <text className={styles.text}>{props.buttonText}</text>
            </div>
        </Link>
            </button>
      </form>
    );
};

export default SearchButton;