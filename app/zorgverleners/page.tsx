import styles from "./page.module.css";
import AddZorgverlenerFrom from "@/components/AddZorgverlenerFrom";
import ListZorgverleners from "@/components/ListZorgverleners";
import UpdateZorgverlenerFrom from "@/components/UpdateZorgverlenerFrom";

const ZorgverlenersPage = async () => {
  return (
    
      <div className={styles.crudView}>
        <ListZorgverleners/>
        <AddZorgverlenerFrom />
        <UpdateZorgverlenerFrom/>
      </div>
  );
};

export default ZorgverlenersPage;
