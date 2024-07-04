import DashBoardButton from "@/components/DashBoardButton";
import styles from "./page.module.css";

const DashboardPage = async () => {
  return (
    <>
      <div className={styles.headerDashboard}>
        <h1 className={styles.textHeader}>Dashboard (Hallo IAS)</h1>
      </div>
      <img className={styles.logo} src="/Logo_JDB_2.png" alt="Logo" />

      <div className={styles.dashboardMenu}>
        <DashBoardButton imageURL="/icon_calender.png" url="/kalender" buttonText="Kalender"/>
        <DashBoardButton imageURL="/icon_document.png" url="/resultaten" buttonText="Resultaten"/>
        <DashBoardButton imageURL="/icon_patienten.png" url="/patiëntenoverzicht" buttonText="Patiëntenoverzicht"/>
        <DashBoardButton imageURL="/icon_artsen.png" url="/zorgverleners" buttonText="Zorgverlenersoverzicht"/>
        <DashBoardButton imageURL="/icon_plus.png" url="/afspraak" buttonText="Afspraak toevoegen"/>
        <DashBoardButton imageURL="/icon_settings.png" url="/instellingen" buttonText="Instellingen"/>
      </div>
    </>
  );
};

export default DashboardPage;
