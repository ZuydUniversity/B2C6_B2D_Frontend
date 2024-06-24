import styles from "./page.module.css";

const LoginPage = async () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1>inloggen</h1>
        </div>
        <form className={styles.loginForm} action="">
          <input style={{ backgroundImage: "url(/icon_personeelsnummer.png)" }} className="" type="text" placeholder="Je personeelsnummer"/>
          <input style={{ backgroundImage: "url(/icon_login.png)" }} className="" type="text" placeholder="Je login of e-mailadres" />
          <input style={{ backgroundImage: "url(/icon_password.png)" }} className="" type="text" placeholder="Wachtwoord"/>
          <a href="">Wachtwoord vergeven?</a>
          <button>Login</button>
        </form>
        <p className={styles.sponsorTextHeader}>Mede mogelijk gemaakt door</p>
        <div className={styles.loginFooter}>
            <img src="/Logo_UMC_2.png" alt="No Image" />
            <img src="/Logo_JDB_2.png" alt="No Image" />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src="/loginpage_photo.png" alt="No image" />
      </div>
    </div>
  );
};

export default LoginPage;
