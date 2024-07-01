import Link from "next/link";
import styles from "./DashBoardButton.module.css";

interface Props {
  imageURL: string;
  url: string;
  buttonText: string;
}

const DashBoardButton = async (props: Props) => {
  return (
    <Link href={props.url}>
      <div className={styles.butt}>
        <img className={styles.img} src={props.imageURL} alt="No Image" />
        <text className={styles.text}>{props.buttonText}</text>
      </div>
    </Link>
  );
};

export default DashBoardButton;
