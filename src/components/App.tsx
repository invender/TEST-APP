import { Instance } from "mobx-state-tree";
import TripsStore from "../models/trips";
import styles from "./App.module.css";
import Filter from "./Filter";
import Sort from "./Sort";
import Trips from "./Trips";
interface IApp {
  store: Instance<typeof TripsStore>;
}

const App: React.FC<IApp> = ({ store }) => {
  return (
    <div className={styles.main}>
      <div className={styles.filter}>
        <Filter store={store} />
      </div>
      <div className={styles.sort}>
        <Sort store={store} />
      </div>
      <Trips store={store} />
    </div>



  );
};

export default App;
