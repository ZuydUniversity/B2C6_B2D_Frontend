import Link from "next/link";
import styles from "./LoginButton.module.css";

const LoginButton = () => {
  return (
    <Link className={styles.loginButton} href={'/account'}>
      <button>Login</button>
    </Link>
  );
};

export default LoginButton;
